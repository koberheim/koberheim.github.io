// Aquarium Stocking Calculator
// ---------------------------------------------------------------------------
// Method: the surface-area rule (inches of fish per sq. in. of water surface,
// adjusted for filtration strength and planting) with a per-species bioload
// weight layered on top, PLUS hard checks on minimum tank volume, minimum tank
// length, temperature overlap, and a set of well-documented compatibility
// conflicts.
//
// This is a planning estimate, not a guarantee, and it is not a complete
// species-compatibility matrix. SPECIES and CATEGORIES live in
// species-data.js (loaded before this file) so the stocking calculator and
// the acclimation timer share one dataset instead of two that can drift.
// ---------------------------------------------------------------------------

const byId = Object.fromEntries(SPECIES.map((s) => [s.id, s]));
const state = {}; // id -> count
SPECIES.forEach((s) => (state[s.id] = 0));
let activeCat = "all";

const el = (id) => document.getElementById(id);

// ---------- tank inputs ----------
const preset = el("tank-preset");
const lengthInput = el("tank-length");
const widthInput = el("tank-width");
const gallonsInput = el("tank-gallons");
const filtrationSelect = el("filtration");
const plantedCheckbox = el("planted");

// Tracks whether the volume shown was set deliberately (by a preset or by the
// user) rather than auto-estimated. Without this, the estimate used to clobber
// accurate preset volumes — a 55 gal preset displayed as 37.8 gal.
let volumeIsExplicit = false;

function applyPreset() {
  const custom = preset.value === "custom";
  lengthInput.disabled = !custom;
  widthInput.disabled = !custom;
  gallonsInput.disabled = !custom;

  if (custom) {
    volumeIsExplicit = false;
    estimateVolume();
    return;
  }
  const [gal, len, wid] = preset.value.split(",").map(Number);
  lengthInput.value = len;
  widthInput.value = wid;
  gallonsInput.value = gal;
  volumeIsExplicit = true; // preset volumes are authoritative
}

// Only used when the user hasn't given us a real volume. Assumes a ~14" water
// height, which is a rough mid-range; that's why the field stays editable.
function estimateVolume() {
  if (volumeIsExplicit) return;
  const l = parseFloat(lengthInput.value) || 0;
  const w = parseFloat(widthInput.value) || 0;
  const est = (l * w * 14) / 231;
  gallonsInput.value = est ? Math.round(est * 10) / 10 : "";
}

preset.addEventListener("change", () => {
  applyPreset();
  render();
});
[lengthInput, widthInput].forEach((input) =>
  input.addEventListener("input", () => {
    estimateVolume();
    render();
  })
);
gallonsInput.addEventListener("input", () => {
  volumeIsExplicit = true;
  render();
});
filtrationSelect.addEventListener("change", render);
plantedCheckbox.addEventListener("change", render);

// ---------- species grid ----------
const grid = el("species-grid");
const search = el("species-search");

const TAG_LABELS = {
  "fin-nipper": "fin-nipper",
  "long-fin": "long fins",
  "one-per-tank": "one male per tank",
  "eats-shrimp": "may eat shrimp",
  "eats-snails": "eats snails",
  "eats-plants": "eats plants",
  "outgrows-most-tanks": "gets very large",
  "heavy-waste": "heavy waste",
  "bottom-dweller": "bottom-dweller",
  "algae-eater": "algae eater",
  "very-active": "needs swimming room",
  "water-sensitive": "water-sensitive",
  "needs-mature-tank": "needs a mature tank",
  "aggressive-adult": "aggressive as an adult",
  "predator-adult": "predatory as an adult",
  "needs-height": "needs a tall tank",
  "breeds-fast": "breeds readily",
  "subtropical": "cooler water",
  "warm-water": "needs warm water",
  "advanced": "advanced care",
  "jumper": "jumper — needs a lid",
  "surface-breather": "breathes at the surface",
  "needs-sinking-food": "needs sinking food",
  "nano": "nano",
};

// Tags worth surfacing on the card face; the rest stay in the rules engine.
const CARD_TAGS = [
  "outgrows-most-tanks", "aggressive", "aggressive-adult", "semi-aggressive",
  "fin-nipper", "predator", "predator-adult", "one-per-tank", "eats-shrimp",
  "heavy-waste", "algae-eater", "bottom-dweller", "eats-plants", "jumper",
  "needs-height", "water-sensitive", "advanced", "breeds-fast", "nano",
];

function label(tag) {
  return TAG_LABELS[tag] || tag;
}

function matches(s, q) {
  if (!q) return true;
  const haystack = [s.name, s.cat, ...s.tags].join(" ").toLowerCase();
  return haystack.includes(q);
}

function renderGrid() {
  const q = search.value.trim().toLowerCase();
  grid.innerHTML = "";
  const visible = SPECIES.filter(
    (s) => (activeCat === "all" || s.cat === activeCat) && matches(s, q)
  );

  if (!visible.length) {
    grid.innerHTML = `<p class="empty-note">No species match that search. Try a different term, or “All”.</p>`;
    return;
  }

  visible.forEach((s) => {
    const card = document.createElement("div");
    card.className = "species-card" + (state[s.id] > 0 ? " active" : "");
    const shown = s.tags.filter((t) => CARD_TAGS.includes(t)).slice(0, 3);
    card.innerHTML = `
      <div class="row1">
        <span class="name">${s.name}</span>
        <span class="meta">${s.length}&Prime;</span>
      </div>
      <div class="sci">${s.sci}</div>
      <dl class="specs">
        <div><dt>Min</dt><dd>${s.minTank} gal</dd></div>
        <div><dt>Temp</dt><dd>${s.temp[0]}&ndash;${s.temp[1]}&deg;F</dd></div>
        ${s.school ? `<div><dt>Group</dt><dd>${s.school}+</dd></div>` : ""}
      </dl>
      <div class="tags">
        ${shown.map((t) => `<span class="tag${isAlertTag(t) ? " alert" : ""}">${label(t)}</span>`).join("")}
      </div>
      <div class="stepper">
        <button type="button" data-action="dec" aria-label="Remove one ${s.name}">&minus;</button>
        <span class="count">${state[s.id]}</span>
        <button type="button" data-action="inc" aria-label="Add one ${s.name}">&plus;</button>
      </div>
    `;
    const [dec, inc] = card.querySelectorAll("button");
    dec.addEventListener("click", () => bump(s.id, -1));
    inc.addEventListener("click", () => bump(s.id, +1));
    grid.appendChild(card);
  });
}

function isAlertTag(t) {
  return [
    "outgrows-most-tanks", "aggressive", "aggressive-adult", "semi-aggressive",
    "fin-nipper", "predator", "predator-adult", "advanced",
  ].includes(t);
}

function bump(id, delta) {
  state[id] = Math.max(0, state[id] + delta);
  renderGrid();
  render();
}

search.addEventListener("input", renderGrid);

// ---------- category chips ----------
function renderChips() {
  const wrap = el("category-chips");
  wrap.innerHTML = "";
  CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (activeCat === c.key ? " on" : "");
    b.textContent = c.label;
    b.setAttribute("aria-pressed", String(activeCat === c.key));
    b.addEventListener("click", () => {
      activeCat = c.key;
      renderChips();
      renderGrid();
    });
    wrap.appendChild(b);
  });
}

// ---------- calculation ----------
function tank() {
  return {
    length: parseFloat(lengthInput.value) || 0,
    width: parseFloat(widthInput.value) || 0,
    gallons: parseFloat(gallonsInput.value) || 0,
    divisor: parseFloat(filtrationSelect.value),
    planted: plantedCheckbox.checked,
  };
}

function calc() {
  const t = tank();
  let budget = t.divisor ? (t.length * t.width) / t.divisor : 0;
  if (t.planted) budget *= 1.15;

  let load = 0;
  const selected = [];
  SPECIES.forEach((s) => {
    const count = state[s.id];
    if (count > 0) {
      load += count * s.length * s.bioload;
      selected.push({ ...s, count });
    }
  });

  return { budget, load, percent: budget > 0 ? (load / budget) * 100 : 0, selected, tank: t };
}

// ---------- warning rules ----------
// Each rule receives { selected, tank } and returns zero or more warnings.
// Severity: "danger" (likely harm) or "caution" (depends on setup/individuals).
const RULES = [
  // Tank too small for a species' adult size.
  function minimumTank({ selected, tank }) {
    if (!tank.gallons) return [];
    return selected
      .filter((s) => tank.gallons < s.minTank)
      .map((s) => ({
        severity: "danger",
        text: `${s.name} needs about ${s.minTank} gallons minimum${
          s.tags.includes("outgrows-most-tanks")
            ? ` — they're sold small but reach roughly ${s.length}″ as adults`
            : ""
        }. Your tank is around ${Math.round(tank.gallons)} gal.`,
      }));
  },

  // Tank too short for swimming room, even if volume is fine.
  function minimumLength({ selected, tank }) {
    if (!tank.length) return [];
    return selected
      .filter((s) => tank.length < s.minLen)
      .map((s) => ({
        severity: "caution",
        text: `${s.name} wants at least ${s.minLen}″ of tank length to swim; yours is ${tank.length}″.`,
      }));
  },

  // Multiple male bettas — a classic, frequently fatal mistake.
  function multipleBettas({ selected }) {
    const b = selected.find((s) => s.tags.includes("one-per-tank"));
    if (b && b.count > 1) {
      return [{
        severity: "danger",
        text: `${b.count} male bettas will fight, usually until one dies. Keep only one male per tank.`,
      }];
    }
    return [];
  },

  // Temperature ranges that don't overlap.
  function temperature({ selected }) {
    if (selected.length < 2) return [];
    const lo = Math.max(...selected.map((s) => s.temp[0]));
    const hi = Math.min(...selected.map((s) => s.temp[1]));
    if (lo > hi) {
      const coldest = selected.reduce((a, b) => (a.temp[1] < b.temp[1] ? a : b));
      const warmest = selected.reduce((a, b) => (a.temp[0] > b.temp[0] ? a : b));
      return [{
        severity: "danger",
        text: `No shared temperature works here — ${coldest.name} (${coldest.temp[0]}–${coldest.temp[1]}°F) and ${warmest.name} (${warmest.temp[0]}–${warmest.temp[1]}°F) don't overlap.`,
      }];
    }
    if (hi - lo < 3) {
      return [{
        severity: "caution",
        text: `Your species only overlap between ${lo}–${hi}°F — a narrow window that leaves little margin for error.`,
      }];
    }
    return [];
  },

  // Fin-nippers with long-finned tankmates.
  function finNipping({ selected }) {
    const nipper = selected.find((s) => s.tags.includes("fin-nipper"));
    const target = selected.find((s) => s.tags.includes("long-fin"));
    if (nipper && target && nipper.id !== target.id) {
      return [{
        severity: "danger",
        text: `${nipper.name} is a known fin-nipper and ${target.name} has long, trailing fins — a very common cause of shredded fins and infection.`,
      }];
    }
    return [];
  },

  // Predators with fish small enough to swallow (~1/3 of predator length).
  function predation({ selected }) {
    const out = [];
    selected
      .filter((s) => s.tags.includes("predator") || s.tags.includes("predator-adult"))
      .forEach((p) => {
        const prey = selected.find((s) => s.id !== p.id && s.length <= p.length / 3);
        if (prey) {
          out.push({
            severity: "danger",
            text: `${p.name} reaches ~${p.length}″ and will eventually eat tankmates as small as ${prey.name} (~${prey.length}″).`,
          });
        }
      });
    return out;
  },

  // Shrimp kept with fish that commonly eat them.
  function shrimpSafety({ selected }) {
    const shrimp = selected.find((s) => s.tags.includes("shrimp"));
    const hunter = selected.find((s) => s.tags.includes("eats-shrimp"));
    if (shrimp && hunter) {
      return [{
        severity: "caution",
        text: `${hunter.name} will often hunt ${shrimp.name}, especially babies. Adults may survive in a heavily planted tank, but don't count on a colony.`,
      }];
    }
    return [];
  },

  // Snail-eaters with snails.
  function snailSafety({ selected }) {
    const snail = selected.find((s) => s.tags.includes("snail") && !s.tags.includes("eats-snails"));
    const hunter = selected.find((s) => s.tags.includes("eats-snails"));
    if (snail && hunter) {
      return [{
        severity: "caution",
        text: `${hunter.name} eats snails — ${snail.name} is unlikely to last.`,
      }];
    }
    return [];
  },

  // Two territorial species competing for the same real estate.
  function territorial({ selected }) {
    const terr = selected.filter((s) => s.tags.includes("territorial"));
    if (terr.length >= 2) {
      return [{
        severity: "danger",
        text: `${terr[0].name} and ${terr[1].name} are both territorial and will likely fight over the same space.`,
      }];
    }
    const solo = terr[0];
    if (solo && solo.count > 1 && solo.tags.includes("aggressive")) {
      return [{
        severity: "caution",
        text: `Multiple ${solo.name} need a lot of space and broken sight-lines, or they'll fight.`,
      }];
    }
    return [];
  },

  // An aggressive fish mixed into an otherwise peaceful community.
  function aggressionMix({ selected }) {
    const aggressive = selected.find(
      (s) => s.tags.includes("aggressive") || s.tags.includes("aggressive-adult")
    );
    if (!aggressive) return [];
    const peaceful = selected.filter(
      (s) =>
        s.id !== aggressive.id &&
        !s.tags.includes("aggressive") &&
        !s.tags.includes("semi-aggressive") &&
        !s.tags.includes("aggressive-adult") &&
        !s.tags.includes("invertebrate")
    );
    if (peaceful.length) {
      return [{
        severity: "caution",
        text: `${aggressive.name}${
          aggressive.tags.includes("aggressive-adult") ? " becomes aggressive with age and" : ""
        } may bully peaceful tankmates like ${peaceful[0].name}.`,
      }];
    }
    return [];
  },

  // Shoaling species kept in too-small groups.
  function shoalSize({ selected }) {
    return selected
      .filter((s) => s.school && s.count < s.school)
      .map((s) => ({
        severity: "caution",
        text: `${s.name} is a shoaling species — ${s.count} will likely be stressed and hide. Aim for at least ${s.school}.`,
      }));
  },

  // Plant-eaters in a planted tank.
  function plantEaters({ selected, tank }) {
    if (!tank.planted) return [];
    const muncher = selected.find((s) => s.tags.includes("eats-plants"));
    return muncher
      ? [{
          severity: "caution",
          text: `${muncher.name} eats live plants — expect a heavily planted tank to take damage.`,
        }]
      : [];
  },

  // Otocinclus specifically starve in brand-new tanks.
  function matureTank({ selected }) {
    const s = selected.find((t) => t.tags.includes("needs-mature-tank"));
    return s
      ? [{
          severity: "caution",
          text: `${s.name} feeds on established biofilm and algae — they often starve in a tank less than a few months old.`,
        }]
      : [];
  },

  // Jumpers need a lid.
  function jumpers({ selected }) {
    const j = selected.filter((s) => s.tags.includes("jumper"));
    return j.length
      ? [{
          severity: "caution",
          text: `${j.map((s) => s.name).join(", ")} ${j.length > 1 ? "are" : "is"} prone to jumping — use a lid or tight-fitting cover.`,
        }]
      : [];
  },
];

function buildWarnings(ctx) {
  const seen = new Set();
  const out = [];
  RULES.forEach((rule) => {
    rule(ctx).forEach((w) => {
      if (!seen.has(w.text)) {
        seen.add(w.text);
        out.push(w);
      }
    });
  });
  // Dangers first, then cautions.
  return out.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "danger" ? -1 : 1));
}

// ---------- summary ----------
function renderSummary(selected, load, budget) {
  const box = el("summary");
  const totalFish = selected.reduce((n, s) => n + s.count, 0);
  if (!selected.length) {
    box.innerHTML = `<p class="empty-note">Nothing selected yet.</p>`;
    return;
  }
  box.innerHTML = `
    <ul class="summary-list">
      ${selected
        .map(
          (s) => `<li><span class="qty">${s.count}&times;</span> ${s.name}
            <button type="button" class="rm" data-id="${s.id}" aria-label="Remove all ${s.name}">&times;</button></li>`
        )
        .join("")}
    </ul>
    <p class="summary-total">${totalFish} animal${totalFish === 1 ? "" : "s"} ·
      ${Math.round(load * 10) / 10} of ${Math.round(budget * 10) / 10} adjusted inches used</p>
  `;
  box.querySelectorAll(".rm").forEach((b) =>
    b.addEventListener("click", () => {
      state[b.dataset.id] = 0;
      renderGrid();
      render();
    })
  );
}

// ---------- share link ----------
function stockToHash() {
  const parts = SPECIES.filter((s) => state[s.id] > 0).map((s) => `${s.id}:${state[s.id]}`);
  if (!parts.length) return "";
  const t = tank();
  return `#t=${t.length}x${t.width}x${t.gallons}&f=${t.divisor}${t.planted ? "&p=1" : ""}&s=${parts.join(",")}`;
}

function hashToStock() {
  const h = location.hash.slice(1);
  if (!h) return false;
  const params = new URLSearchParams(h);
  const t = params.get("t");
  if (t) {
    const [l, w, g] = t.split("x").map(Number);
    if (l && w) {
      preset.value = "custom";
      applyPreset();
      lengthInput.value = l;
      widthInput.value = w;
      if (g) {
        gallonsInput.value = g;
        volumeIsExplicit = true;
      }
    }
  }
  const f = params.get("f");
  if (f && [...filtrationSelect.options].some((o) => o.value === f)) filtrationSelect.value = f;
  plantedCheckbox.checked = params.get("p") === "1";

  const s = params.get("s");
  if (s) {
    s.split(",").forEach((pair) => {
      const [id, n] = pair.split(":");
      if (byId[id]) state[id] = Math.max(0, parseInt(n, 10) || 0);
    });
  }
  return true;
}

function setupShare() {
  const btn = el("share-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const hash = stockToHash();
    if (!hash) {
      btn.textContent = "Add some fish first";
      setTimeout(() => (btn.textContent = "Copy share link"), 1800);
      return;
    }
    const url = location.origin + location.pathname + hash;
    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "Link copied";
    } catch {
      // Clipboard can be blocked; put it in the URL bar so it's still copyable.
      location.hash = hash;
      btn.textContent = "Link is in your address bar";
    }
    setTimeout(() => (btn.textContent = "Copy share link"), 2200);
  });
}

// ---------- render ----------
// Shared with the other tools (e.g. the water-change calculator) so a tank
// entered once doesn't have to be re-typed on every page. Read, never
// written, by anything outside this file.
function saveTankProfile(t) {
  if (!t.gallons) return;
  try {
    localStorage.setItem(
      "tankwise-tank",
      JSON.stringify({ gallons: t.gallons, length: t.length, width: t.width, savedAt: Date.now() })
    );
  } catch (e) {
    /* private-browsing or storage disabled — the tools still work standalone */
  }
}

function render() {
  const { budget, load, percent, selected, tank: t } = calc();
  saveTankProfile(t);

  const fill = el("gauge-fill");
  el("gauge-pct").textContent = Math.round(percent) + "%";
  fill.style.width = Math.min(percent, 100) + "%";

  const statusLine = el("status-line");
  // Colour lives in CSS so the palette stays in one place.
  statusLine.classList.remove("good", "warn", "bad");
  fill.classList.remove("is-good", "is-warn", "is-bad");
  if (!selected.length) {
    statusLine.textContent = "Add some fish below to see your estimate.";
  } else if (percent < 80) {
    statusLine.textContent = "Comfortably within your stocking budget.";
    statusLine.classList.add("good");
    fill.classList.add("is-good");
  } else if (percent <= 100) {
    statusLine.textContent = "Near capacity — fine, but leave room for growth and future additions.";
    statusLine.classList.add("warn");
    fill.classList.add("is-warn");
  } else {
    statusLine.textContent = `Over budget by about ${Math.round(percent - 100)}% — consider a bigger tank, stronger filtration, or fewer/smaller fish.`;
    statusLine.classList.add("bad");
    fill.classList.add("is-bad");
  }

  const warnings = buildWarnings({ selected, tank: t });
  el("warnings").innerHTML = warnings
    .map((w) => `<div class="warning-item ${w.severity}">${w.text}</div>`)
    .join("");

  renderSummary(selected, load, budget);
  updateSticky(percent, selected, warnings);
}

// Mirrors the budget gauge into the floating bar, so the number stays visible
// while you're scrolling a long species list.
function updateSticky(percent, selected, warnings) {
  const pct = el("sticky-pct");
  const text = el("sticky-text");
  pct.textContent = Math.round(percent) + "%";
  pct.classList.remove("warn", "bad");

  const dangers = warnings.filter((w) => w.severity === "danger").length;
  if (!selected.length) {
    text.textContent = "No fish added yet";
  } else if (dangers) {
    pct.classList.add("bad");
    text.textContent = `${dangers} serious issue${dangers === 1 ? "" : "s"}`;
  } else if (percent > 100) {
    pct.classList.add("bad");
    text.textContent = "Over budget";
  } else if (percent > 80) {
    pct.classList.add("warn");
    text.textContent = "Near capacity";
  } else if (warnings.length) {
    pct.classList.add("warn");
    text.textContent = `${warnings.length} to consider`;
  } else {
    text.textContent = "Comfortably stocked";
  }
}

function setupSticky() {
  const bar = el("sticky-status");
  // Watch the gauge itself, not the whole panel — the bar should appear the
  // moment the percentage scrolls out of sight.
  const anchor = document.querySelector(".gauge-wrap");
  if (!bar || !anchor || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    ([entry]) => {
      // Show the bar only once the real gauge has scrolled out of view above.
      const past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      bar.classList.toggle("show", past);
      bar.setAttribute("aria-hidden", String(!past));
    },
    { threshold: 0 }
  );
  io.observe(anchor);
}

el("reset-btn").addEventListener("click", () => {
  SPECIES.forEach((s) => (state[s.id] = 0));
  history.replaceState(null, "", location.pathname);
  renderGrid();
  render();
});

// ---------- init ----------
// Surfaces the loaded dataset size in the footer, so it's obvious at a glance
// whether a browser is running a stale cached copy of this file.
const countEl = el("species-count");
if (countEl) countEl.textContent = SPECIES.length;

applyPreset();
hashToStock();

// A shared link opened while the page is already loaded only changes the hash,
// which wouldn't otherwise re-run the loader.
window.addEventListener("hashchange", () => {
  if (!location.hash) return;
  SPECIES.forEach((s) => (state[s.id] = 0));
  hashToStock();
  renderGrid();
  render();
});

renderChips();
renderGrid();
setupShare();
setupSticky();
render();
