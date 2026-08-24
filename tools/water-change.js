// Water Change / Nitrate Dilution Calculator
// ---------------------------------------------------------------------------
// Pure dilution math: newConc = current*(1-f) + tap*f, solved for the change
// fraction f needed to hit a target. With 0 ppm tap water this collapses to
// the simple "current -> target" ratio most guides show; it stays correct
// when tap/source water itself carries nitrate.
// ---------------------------------------------------------------------------

const el = (id) => document.getElementById(id);

const gallonsInput = el("wc-gallons");
const currentInput = el("wc-current");
const targetInput = el("wc-target");
const tapInput = el("wc-tap");
const stepSelect = el("wc-step");

// Reuse the tank volume saved by the stocking calculator, if any — read-only,
// never written from here.
(function loadSavedTank() {
  try {
    const raw = localStorage.getItem("tankwise-tank");
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && saved.gallons) {
      gallonsInput.value = Math.round(saved.gallons * 10) / 10;
      const hint = el("wc-tank-hint");
      hint.textContent = `Loaded ${gallonsInput.value} gal from your stocking calculator plan.`;
      hint.style.display = "block";
    }
  } catch (e) {
    /* private browsing or storage disabled */
  }
})();

function computeChange(current, target, tap) {
  if (current <= target) return { status: "already-there" };
  if (tap >= target) return { status: "unreachable", floor: tap };
  const fraction = Math.min((current - target) / (current - tap), 1);
  return { status: "ok", fraction };
}

function buildSchedule(current, target, tap, step) {
  const rows = [];
  let c = current;
  let n = 0;
  while (c > target + 0.05 && n < 16) {
    n++;
    c = c * (1 - step) + tap * step;
    rows.push({ n, value: c });
  }
  return rows;
}

function render() {
  const gallons = parseFloat(gallonsInput.value) || 0;
  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);
  const tap = parseFloat(tapInput.value) || 0;
  const step = parseFloat(stepSelect.value);

  const fill = el("wc-fill");
  const pctLabel = el("wc-pct");
  const status = el("wc-status");
  const warnings = el("wc-warnings");
  status.classList.remove("good", "warn", "bad");
  fill.classList.remove("is-good", "is-warn", "is-bad");
  warnings.innerHTML = "";

  if (isNaN(current) || isNaN(target) || current < 0 || target < 0) {
    status.textContent = "Enter your current and target nitrate to see the result.";
    pctLabel.textContent = "—";
    fill.style.width = "0%";
    el("wc-schedule").querySelector("tbody").innerHTML = "";
    return;
  }

  const result = computeChange(current, target, tap);

  if (result.status === "already-there") {
    pctLabel.textContent = "0%";
    fill.style.width = "0%";
    status.textContent = "You're already at or under your target — no change needed for nitrate alone (routine maintenance still applies).";
    status.classList.add("good");
    fill.classList.add("is-good");
  } else if (result.status === "unreachable") {
    pctLabel.textContent = "—";
    fill.style.width = "100%";
    fill.classList.add("is-bad");
    status.textContent = `Not reachable by water changes alone — your tap/source water (${tap} ppm) is already at or above your target.`;
    status.classList.add("bad");
    warnings.innerHTML = `<div class="warning-item danger">Diluting with ${tap} ppm source water can bring your tank toward ${tap} ppm, but never below it, no matter how much you change. See the FAQ below for options.</div>`;
  } else {
    const pct = result.fraction * 100;
    pctLabel.textContent = Math.round(pct) + "%";
    fill.style.width = Math.min(pct, 100) + "%";
    const changeGallons = gallons ? Math.round(gallons * result.fraction * 10) / 10 : null;
    status.textContent = changeGallons
      ? `Change about ${Math.round(pct)}% — roughly ${changeGallons} gallons in a ${gallons} gal tank.`
      : `Change about ${Math.round(pct)}% of your tank's water.`;
    status.classList.add(pct > 60 ? "warn" : "good");
    fill.classList.add(pct > 60 ? "is-warn" : "is-good");

    if (pct > 50) {
      warnings.innerHTML = `<div class="warning-item caution">That's a large single change (${Math.round(pct)}%). Match the new water's temperature closely, or spread it across two smaller changes over a few days if you're not dealing with an emergency.</div>`;
    }
  }

  // Schedule table always renders against the entered current/target/tap,
  // even in the unreachable case — it's useful there too, showing how the
  // level approaches (but never reaches) the tap-water floor.
  const rows = buildSchedule(current, target, tap, step);
  const tbody = el("wc-schedule").querySelector("tbody");
  tbody.innerHTML = rows
    .map((r) => {
      const hit = r.value <= target + 0.05;
      return `<tr${hit ? ' class="hit"' : ""}><td>${r.n}</td><td>${r.value.toFixed(1)} ppm${hit ? " ✓" : ""}</td></tr>`;
    })
    .join("") || `<tr><td colspan="2">No further reduction reaches your target within 16 changes at this size — try a larger step.</td></tr>`;
}

[gallonsInput, currentInput, targetInput, tapInput, stepSelect].forEach((input) =>
  input.addEventListener("input", render)
);

render();
