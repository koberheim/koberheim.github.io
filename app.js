// Aquarium Stocking Calculator
// Method: surface-area rule (inches of fish per sq in of water surface,
// adjusted for filtration strength and planting) with a per-species bioload
// weight layered on top. See the "How this works" section on the page for
// the full explanation and caveats — this is a planning estimate, not a
// guarantee, and it is not a full species-compatibility matrix.

const SPECIES = [
  { id: "neon-tetra", name: "Neon Tetra", length: 1.5, bioload: 0.5, temperament: "peaceful", school: 6, tags: [] },
  { id: "cardinal-tetra", name: "Cardinal Tetra", length: 2, bioload: 0.5, temperament: "peaceful", school: 6, tags: [] },
  { id: "ember-tetra", name: "Ember Tetra", length: 0.8, bioload: 0.3, temperament: "peaceful", school: 6, tags: [] },
  { id: "black-skirt-tetra", name: "Black Skirt Tetra", length: 2.5, bioload: 0.7, temperament: "semi-aggressive", school: 5, tags: ["fin-nipper"] },
  { id: "zebra-danio", name: "Zebra Danio", length: 2, bioload: 0.6, temperament: "peaceful", school: 6, tags: ["fast-swimmer"] },
  { id: "harlequin-rasbora", name: "Harlequin Rasbora", length: 2, bioload: 0.5, temperament: "peaceful", school: 6, tags: [] },
  { id: "white-cloud-minnow", name: "White Cloud Mountain Minnow", length: 1.5, bioload: 0.4, temperament: "peaceful", school: 6, tags: ["coldwater-ok"] },
  { id: "guppy", name: "Guppy", length: 2, bioload: 0.6, temperament: "peaceful", school: null, tags: ["livebearer", "breeds fast"] },
  { id: "platy", name: "Platy", length: 2.5, bioload: 0.7, temperament: "peaceful", school: null, tags: ["livebearer", "breeds fast"] },
  { id: "molly", name: "Molly", length: 4, bioload: 1.0, temperament: "peaceful", school: null, tags: ["livebearer", "breeds fast"] },
  { id: "swordtail", name: "Swordtail", length: 5, bioload: 1.0, temperament: "peaceful", school: null, tags: ["livebearer"] },
  { id: "betta", name: "Betta (male)", length: 2.5, bioload: 0.8, temperament: "aggressive", school: null, tags: ["fin-target", "one per tank"] },
  { id: "corydoras", name: "Corydoras Catfish", length: 2.5, bioload: 0.6, temperament: "peaceful", school: 6, tags: ["bottom-dweller"] },
  { id: "bristlenose-pleco", name: "Bristlenose Pleco", length: 5, bioload: 1.5, temperament: "peaceful", school: null, tags: ["bottom-dweller", "heavy waste"] },
  { id: "otocinclus", name: "Otocinclus", length: 2, bioload: 0.4, temperament: "peaceful", school: 4, tags: ["bottom-dweller"] },
  { id: "kuhli-loach", name: "Kuhli Loach", length: 4, bioload: 0.5, temperament: "peaceful", school: 5, tags: ["bottom-dweller"] },
  { id: "cherry-barb", name: "Cherry Barb", length: 2, bioload: 0.5, temperament: "peaceful", school: 6, tags: [] },
  { id: "tiger-barb", name: "Tiger Barb", length: 3, bioload: 0.7, temperament: "semi-aggressive", school: 6, tags: ["fin-nipper"] },
  { id: "honey-gourami", name: "Honey Gourami", length: 2, bioload: 0.6, temperament: "peaceful", school: null, tags: [] },
  { id: "dwarf-gourami", name: "Dwarf Gourami", length: 3.5, bioload: 0.8, temperament: "semi-aggressive", school: null, tags: [] },
  { id: "angelfish", name: "Angelfish", length: 6, bioload: 2.0, temperament: "semi-aggressive", school: null, tags: ["predator as adult", "tall tank"] },
  { id: "german-blue-ram", name: "German Blue Ram", length: 2.5, bioload: 0.7, temperament: "peaceful", school: null, tags: ["water-sensitive"] },
  { id: "cherry-shrimp", name: "Cherry Shrimp", length: 1, bioload: 0.2, temperament: "peaceful", school: null, tags: ["invertebrate"] },
  { id: "nerite-snail", name: "Nerite Snail", length: 1, bioload: 0.2, temperament: "peaceful", school: null, tags: ["invertebrate"] },
  { id: "mystery-snail", name: "Mystery Snail", length: 2, bioload: 0.4, temperament: "peaceful", school: null, tags: ["invertebrate"] },
  { id: "fancy-goldfish", name: "Fancy Goldfish", length: 7, bioload: 3.0, temperament: "peaceful", school: null, tags: ["coldwater", "heavy waste", "not for tropical community"] },
  { id: "oscar", name: "Oscar", length: 13, bioload: 5.0, temperament: "aggressive", school: null, tags: ["predator", "large adult"] },
];

const state = {}; // id -> count
SPECIES.forEach((s) => (state[s.id] = 0));

const el = (id) => document.getElementById(id);

// ---------- tank inputs ----------
const preset = el("tank-preset");
const lengthInput = el("tank-length");
const widthInput = el("tank-width");
const gallonsInput = el("tank-gallons");
const filtrationSelect = el("filtration");
const plantedCheckbox = el("planted");

function applyPreset() {
  if (preset.value === "custom") {
    lengthInput.disabled = false;
    widthInput.disabled = false;
    return;
  }
  const [gal, len, wid] = preset.value.split(",").map(Number);
  lengthInput.value = len;
  widthInput.value = wid;
  gallonsInput.value = gal;
  lengthInput.disabled = true;
  widthInput.disabled = true;
}

function syncGallonsEstimate() {
  const l = parseFloat(lengthInput.value) || 0;
  const w = parseFloat(widthInput.value) || 0;
  // Assumes a ~14" average water height, a rough mid-range for common tanks —
  // shown only as a friendly estimate, not used in the stocking math itself.
  const estGal = (l * w * 14) / 231;
  gallonsInput.value = estGal ? Math.round(estGal * 10) / 10 : "";
}

preset.addEventListener("change", () => {
  applyPreset();
  render();
});
[lengthInput, widthInput].forEach((input) =>
  input.addEventListener("input", () => {
    if (preset.value === "custom") syncGallonsEstimate();
    render();
  })
);
filtrationSelect.addEventListener("change", render);
plantedCheckbox.addEventListener("change", render);

// ---------- species grid ----------
const grid = el("species-grid");
const search = el("species-search");

function tagLabel(t) {
  return t;
}

function renderGrid(filter = "") {
  const q = filter.trim().toLowerCase();
  grid.innerHTML = "";
  SPECIES.filter((s) => s.name.toLowerCase().includes(q)).forEach((s) => {
    const card = document.createElement("div");
    card.className = "species-card" + (state[s.id] > 0 ? " active" : "");
    card.innerHTML = `
      <div class="row1">
        <span class="name">${s.name}</span>
        <span class="meta">~${s.length}&Prime;</span>
      </div>
      <div class="tags">
        ${s.school ? `<span class="tag">school of ${s.school}+</span>` : ""}
        ${s.temperament !== "peaceful" ? `<span class="tag alert">${s.temperament}</span>` : ""}
        ${s.tags.map((t) => `<span class="tag">${tagLabel(t)}</span>`).join("")}
      </div>
      <div class="stepper">
        <button type="button" data-action="dec" aria-label="Remove one ${s.name}">&minus;</button>
        <span class="count">${state[s.id]}</span>
        <button type="button" data-action="inc" aria-label="Add one ${s.name}">&plus;</button>
      </div>
    `;
    const [dec, inc] = card.querySelectorAll("button");
    dec.addEventListener("click", () => {
      state[s.id] = Math.max(0, state[s.id] - 1);
      renderGrid(search.value);
      render();
    });
    inc.addEventListener("click", () => {
      state[s.id] += 1;
      renderGrid(search.value);
      render();
    });
    grid.appendChild(card);
  });
}

search.addEventListener("input", () => renderGrid(search.value));

// ---------- calculation ----------
function calc() {
  const length = parseFloat(lengthInput.value) || 0;
  const width = parseFloat(widthInput.value) || 0;
  const surfaceArea = length * width;
  const divisor = parseFloat(filtrationSelect.value);
  let budget = divisor ? surfaceArea / divisor : 0;
  if (plantedCheckbox.checked) budget *= 1.15;

  let load = 0;
  const selected = [];
  SPECIES.forEach((s) => {
    const count = state[s.id];
    if (count > 0) {
      load += count * s.length * s.bioload;
      selected.push({ ...s, count });
    }
  });

  const percent = budget > 0 ? (load / budget) * 100 : 0;
  return { budget, load, percent, selected };
}

function buildWarnings(selected) {
  const warnings = [];
  const has = (pred) => selected.find(pred);

  const goldfishLike = has((s) => s.tags.includes("not for tropical community"));
  const tropicalOthers = selected.filter((s) => !s.tags.includes("not for tropical community") && !s.tags.includes("coldwater-ok"));
  if (goldfishLike && tropicalOthers.length) {
    warnings.push(`${goldfishLike.name} is usually kept in its own unheated, species-only tank — not mixed with warm-water community fish.`);
  }

  const betta = has((s) => s.id === "betta");
  const nipper = has((s) => s.tags.includes("fin-nipper"));
  if (betta && nipper) {
    warnings.push(`Bettas and fin-nipping fish like ${nipper.name} are a common conflict — the nippers may target the betta's long fins.`);
  }

  const predator = has((s) => s.tags.includes("predator") || s.tags.includes("predator as adult"));
  const tiny = has((s) => s.length <= 1.5 && s !== predator);
  if (predator && tiny) {
    warnings.push(`${predator.name} will grow large and may eventually eat much smaller fish like ${tiny.name}.`);
  }

  selected.forEach((s) => {
    if (s.school && s.count > 0 && s.count < s.school) {
      warnings.push(`${s.name} is a schooling fish — ${s.count} is likely to leave them stressed. Consider at least ${s.school}.`);
    }
  });

  return warnings;
}

function render() {
  syncGallonsEstimate();
  const { percent, selected } = calc();
  const fill = el("gauge-fill");
  const pctLabel = el("gauge-pct");
  const statusLine = el("status-line");
  const warningsBox = el("warnings");

  const clamped = Math.min(percent, 130);
  fill.style.width = Math.min(percent, 100) + "%";
  pctLabel.textContent = Math.round(percent) + "%";

  statusLine.classList.remove("good", "warn", "bad");
  if (selected.length === 0) {
    statusLine.textContent = "Add some fish below to see your estimate.";
    fill.style.background = "var(--border)";
  } else if (percent < 80) {
    statusLine.textContent = "Comfortably within your stocking budget.";
    statusLine.classList.add("good");
    fill.style.background = "var(--good)";
  } else if (percent <= 100) {
    statusLine.textContent = "Near capacity — fine, but leave room for growth and future additions.";
    statusLine.classList.add("warn");
    fill.style.background = "var(--warn)";
  } else {
    statusLine.textContent = `Over budget by about ${Math.round(percent - 100)}% — consider a bigger tank, stronger filtration, or fewer/smaller fish.`;
    statusLine.classList.add("bad");
    fill.style.background = "var(--bad)";
  }
  void clamped;

  const warnings = buildWarnings(selected);
  warningsBox.innerHTML = warnings.map((w) => `<div class="warning-item">${w}</div>`).join("");
}

// ---------- init ----------
applyPreset();
syncGallonsEstimate();
renderGrid();
render();
