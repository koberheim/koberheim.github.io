// Drip Acclimation Timer
// ---------------------------------------------------------------------------
// A working countdown, not just a calculator: species-aware duration
// suggestion (reusing the stocking calculator's species-data.js), a
// tap-to-measure drip rate tool, and a timestamp-based timer that stays
// accurate even if the tab is backgrounded and re-focused later.
// ---------------------------------------------------------------------------

const el = (id) => document.getElementById(id);

// ---------- species selector + recommendation ----------
const speciesSelect = el("at-species");
const recBox = el("at-recommendation");
const minutesInput = el("at-minutes");
const rateInput = el("at-rate");

function populateSpecies() {
  if (typeof SPECIES === "undefined" || typeof CATEGORIES === "undefined") return;
  const byCat = {};
  SPECIES.forEach((s) => {
    (byCat[s.cat] = byCat[s.cat] || []).push(s);
  });
  CATEGORIES.filter((c) => c.key !== "all").forEach((c) => {
    const list = byCat[c.key];
    if (!list) return;
    const group = document.createElement("optgroup");
    group.label = c.label;
    list
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = s.name;
        group.appendChild(opt);
      });
    speciesSelect.appendChild(group);
  });
}

function recommend(species) {
  if (!species) {
    return { minutes: 40, rate: 3, note: "General guideline for typical community fish." };
  }
  const t = species.tags;
  if (t.includes("shrimp")) {
    return {
      minutes: 75,
      rate: 1.5,
      note: `Shrimp are very sensitive to sudden hardness/pH swings — go slow and long with ${species.name}.`,
    };
  }
  if (t.includes("advanced") || t.includes("water-sensitive")) {
    return {
      minutes: 75,
      rate: 2.5,
      note: `${species.name} is flagged water-sensitive in the stocking register — take this slower than a typical community fish.`,
    };
  }
  if (species.cat === "invert") {
    return { minutes: 50, rate: 2, note: `${species.name} tolerates a slow, unhurried drip well.` };
  }
  return { minutes: 40, rate: 3, note: `Standard guideline — ${species.name} has no special sensitivity flags in the register.` };
}

function applyRecommendation() {
  const species = typeof SPECIES !== "undefined" ? SPECIES.find((sp) => sp.id === speciesSelect.value) : null;
  const rec = recommend(species);
  minutesInput.value = rec.minutes;
  rateInput.value = rec.rate;
  recBox.innerHTML = `<p>${rec.note} Suggested: <strong>${rec.minutes} min</strong> at <strong>${rec.rate} drops/sec</strong>.</p>`;
  resetTimerState();
  syncDisplay();
}

speciesSelect.addEventListener("change", applyRecommendation);

// ---------- tap-to-measure drip rate ----------
const tapBtn = el("at-tap-btn");
const tapReadout = el("at-tap-readout");
let tapTimes = [];
let tapResetHandle = null;

tapBtn.addEventListener("click", () => {
  const now = performance.now();
  tapTimes.push(now);
  // A pause of more than 3s between taps means a fresh measurement.
  if (tapTimes.length > 1 && now - tapTimes[tapTimes.length - 2] > 3000) {
    tapTimes = [now];
  }
  if (tapTimes.length < 2) {
    tapReadout.textContent = `Tap ${tapTimes.length} recorded — keep tapping with each drip…`;
    return;
  }
  const span = (tapTimes[tapTimes.length - 1] - tapTimes[0]) / 1000;
  const intervals = tapTimes.length - 1;
  const rate = intervals / span;
  tapReadout.innerHTML = `${tapTimes.length} taps · <strong>${rate.toFixed(1)} drops/sec</strong>${
    tapTimes.length < 5 ? " (keep tapping for a steadier reading)" : ""
  }`;
  rateInput.value = Math.round(rate * 10) / 10;

  clearTimeout(tapResetHandle);
  tapResetHandle = setTimeout(() => {
    tapTimes = [];
    tapReadout.textContent = "Tap to start measuring…";
  }, 4000);
});

// ---------- timer ----------
// Timestamp-based (not a naive per-second decrement) so the countdown stays
// correct even if the tab is throttled in the background and only resumes
// ticking visibly once it's focused again.
let totalMs = 0;
let endAt = null; // Date.now() timestamp the timer finishes at, while running
let remainingMs = 0; // frozen remaining time while paused/idle
let tickHandle = null;
let audioCtx = null;

const ring = el("at-ring");
const RING_CIRC = 2 * Math.PI * 52;
ring.style.strokeDasharray = `${RING_CIRC}`;

function fmt(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function syncDisplay() {
  const remaining = endAt ? endAt - Date.now() : remainingMs;
  el("at-time").textContent = fmt(remaining);
  const elapsedFrac = totalMs ? 1 - Math.max(0, remaining) / totalMs : 0;
  ring.style.strokeDashoffset = `${RING_CIRC * (1 - elapsedFrac)}`;
}

function resetTimerState() {
  clearInterval(tickHandle);
  tickHandle = null;
  endAt = null;
  totalMs = (parseFloat(minutesInput.value) || 0) * 60000;
  remainingMs = totalMs;
  el("at-start").disabled = false;
  el("at-start").textContent = "Start";
  el("at-pause").disabled = true;
  el("at-pause").textContent = "Pause";
  el("at-status").textContent = "Set your duration and press start.";
  el("at-status").classList.remove("good", "bad");
  syncDisplay();
}

function playChime() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      const start = audioCtx.currentTime + i * 0.22;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.4);
    });
  } catch (e) {
    /* Web Audio unavailable — the visual/status update still happens */
  }
}

function tick() {
  const remaining = endAt - Date.now();
  syncDisplay();
  if (remaining <= 0) {
    clearInterval(tickHandle);
    tickHandle = null;
    endAt = null;
    remainingMs = 0;
    el("at-time").textContent = "0:00";
    ring.style.strokeDashoffset = "0";
    el("at-status").textContent = "Done — time to check your fish and, if they look settled, net them into the tank.";
    el("at-status").classList.add("good");
    el("at-start").disabled = false;
    el("at-start").textContent = "Start another";
    el("at-pause").disabled = true;
    playChime();
  }
}

el("at-start").addEventListener("click", () => {
  if (!totalMs) totalMs = (parseFloat(minutesInput.value) || 0) * 60000;
  if (totalMs <= 0) return;
  endAt = Date.now() + remainingMs;
  tickHandle = setInterval(tick, 250);
  el("at-start").disabled = true;
  el("at-pause").disabled = false;
  el("at-status").textContent = "Running — keep this tab open.";
  el("at-status").classList.remove("good", "bad");
});

el("at-pause").addEventListener("click", () => {
  if (!endAt) return;
  remainingMs = endAt - Date.now();
  endAt = null;
  clearInterval(tickHandle);
  tickHandle = null;
  el("at-start").disabled = false;
  el("at-start").textContent = "Resume";
  el("at-pause").disabled = true;
  el("at-status").textContent = "Paused.";
});

el("at-reset").addEventListener("click", resetTimerState);

minutesInput.addEventListener("input", () => {
  if (!tickHandle) resetTimerState();
});

// ---------- init ----------
populateSpecies();
resetTimerState();
