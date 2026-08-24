// Shared species reference data for Tankwise.
// Used by the stocking calculator (app.js) and the acclimation timer, so the
// two tools can't drift out of sync with each other.
//
// This is reference data, not a guarantee: figures are typical adult values
// from standard care-sheet ranges; individual fish, strains and setups vary.
//
// Fields per species:
//   sci      binomial scientific name
//   length   adult body length, inches (excludes long trailing fins)
//   bioload  relative waste multiplier; 1.0 = an "average" inch of fish
//   minTank  minimum sensible tank volume, US gallons
//   minLen   minimum sensible tank length, inches (swimming room)
//   temp     [min, max] comfortable range, °F
//   school   minimum group size, or null if not a shoaling species
//   cat      category key, for the filter chips
//   tags     behavioural / care flags, also used by the rules engine
// ---------------------------------------------------------------------------

const SPECIES = [
  // ---- Small schooling / nano fish ----
  { id: "chili-rasbora", sci: "Boraras brigittae", name: "Chili Rasbora", length: 0.7, bioload: 0.25, minTank: 5, minLen: 16, temp: [75, 82], school: 8, cat: "small", tags: ["nano"] },
  { id: "ember-tetra", sci: "Hyphessobrycon amandae", name: "Ember Tetra", length: 0.8, bioload: 0.3, minTank: 5, minLen: 16, temp: [73, 84], school: 6, cat: "small", tags: ["nano"] },
  { id: "celestial-pearl-danio", sci: "Danio margaritatus", name: "Celestial Pearl Danio", length: 1, bioload: 0.3, minTank: 10, minLen: 20, temp: [68, 78], school: 6, cat: "small", tags: ["nano"] },
  { id: "neon-tetra", sci: "Paracheirodon innesi", name: "Neon Tetra", length: 1.5, bioload: 0.5, minTank: 10, minLen: 20, temp: [70, 81], school: 6, cat: "small", tags: [] },
  { id: "glowlight-tetra", sci: "Hemigrammus erythrozonus", name: "Glowlight Tetra", length: 1.5, bioload: 0.45, minTank: 10, minLen: 20, temp: [72, 80], school: 6, cat: "small", tags: [] },
  { id: "black-neon-tetra", sci: "Hyphessobrycon herbertaxelrodi", name: "Black Neon Tetra", length: 1.5, bioload: 0.5, minTank: 15, minLen: 20, temp: [73, 81], school: 6, cat: "small", tags: [] },
  { id: "white-cloud-minnow", sci: "Tanichthys albonubes", name: "White Cloud Mountain Minnow", length: 1.5, bioload: 0.4, minTank: 10, minLen: 20, temp: [60, 72], school: 6, cat: "small", tags: ["subtropical"] },
  { id: "cardinal-tetra", sci: "Paracheirodon axelrodi", name: "Cardinal Tetra", length: 2, bioload: 0.5, minTank: 20, minLen: 24, temp: [73, 81], school: 6, cat: "small", tags: [] },
  { id: "harlequin-rasbora", sci: "Trigonostigma heteromorpha", name: "Harlequin Rasbora", length: 2, bioload: 0.5, minTank: 10, minLen: 20, temp: [72, 81], school: 6, cat: "small", tags: [] },
  { id: "rummynose-tetra", sci: "Hemigrammus rhodostomus", name: "Rummynose Tetra", length: 2, bioload: 0.5, minTank: 20, minLen: 24, temp: [75, 82], school: 6, cat: "small", tags: ["water-sensitive"] },
  { id: "serpae-tetra", sci: "Hyphessobrycon eques", name: "Serpae Tetra", length: 1.75, bioload: 0.6, minTank: 20, minLen: 24, temp: [72, 79], school: 6, cat: "small", tags: ["fin-nipper"] },
  { id: "bloodfin-tetra", sci: "Aphyocharax anisitsi", name: "Bloodfin Tetra", length: 2, bioload: 0.55, minTank: 20, minLen: 24, temp: [64, 82], school: 6, cat: "small", tags: [] },
  { id: "black-skirt-tetra", sci: "Gymnocorymbus ternetzi", name: "Black Skirt Tetra", length: 2.5, bioload: 0.7, minTank: 20, minLen: 24, temp: [70, 80], school: 6, cat: "small", tags: ["fin-nipper"] },
  { id: "zebra-danio", sci: "Danio rerio", name: "Zebra Danio", length: 2, bioload: 0.6, minTank: 10, minLen: 24, temp: [64, 77], school: 6, cat: "small", tags: ["very-active", "jumper"] },
  { id: "cherry-barb", sci: "Puntius titteya", name: "Cherry Barb", length: 2, bioload: 0.5, minTank: 15, minLen: 20, temp: [73, 81], school: 6, cat: "small", tags: [] },
  { id: "gold-barb", sci: "Barbodes semifasciolatus", name: "Gold Barb", length: 3, bioload: 0.7, minTank: 20, minLen: 24, temp: [64, 75], school: 6, cat: "small", tags: [] },
  { id: "odessa-barb", sci: "Pethia padamya", name: "Odessa Barb", length: 3, bioload: 0.7, minTank: 30, minLen: 30, temp: [70, 79], school: 6, cat: "small", tags: [] },
  { id: "tiger-barb", sci: "Puntigrus tetrazona", name: "Tiger Barb", length: 3, bioload: 0.7, minTank: 20, minLen: 30, temp: [72, 79], school: 6, cat: "small", tags: ["fin-nipper", "very-active"] },
  { id: "rosy-barb", sci: "Pethia conchonius", name: "Rosy Barb", length: 4, bioload: 0.9, minTank: 30, minLen: 30, temp: [64, 77], school: 6, cat: "small", tags: ["very-active"] },
  { id: "congo-tetra", sci: "Phenacogrammus interruptus", name: "Congo Tetra", length: 3, bioload: 0.9, minTank: 40, minLen: 36, temp: [73, 82], school: 6, cat: "small", tags: [] },
  { id: "hatchetfish", sci: "Carnegiella strigata", name: "Marbled Hatchetfish", length: 1.5, bioload: 0.5, minTank: 15, minLen: 24, temp: [73, 81], school: 6, cat: "small", tags: ["jumper"] },
  { id: "neon-rainbowfish", sci: "Melanotaenia praecox", name: "Neon Dwarf Rainbowfish", length: 2.5, bioload: 0.6, minTank: 20, minLen: 24, temp: [74, 82], school: 6, cat: "small", tags: [] },
  { id: "boesemani-rainbowfish", sci: "Melanotaenia boesemani", name: "Boesemani Rainbowfish", length: 4, bioload: 1.1, minTank: 30, minLen: 36, temp: [75, 86], school: 6, cat: "small", tags: ["very-active"] },

  // ---- Livebearers ----
  { id: "endlers", sci: "Poecilia wingei", name: "Endler's Livebearer", length: 1.2, bioload: 0.4, minTank: 5, minLen: 16, temp: [72, 82], school: null, cat: "livebearer", tags: ["nano", "breeds-fast"] },
  { id: "guppy", sci: "Poecilia reticulata", name: "Guppy", length: 2, bioload: 0.6, minTank: 10, minLen: 20, temp: [72, 82], school: null, cat: "livebearer", tags: ["long-fin", "breeds-fast"] },
  { id: "platy", sci: "Xiphophorus maculatus", name: "Platy", length: 2.5, bioload: 0.7, minTank: 10, minLen: 20, temp: [70, 80], school: null, cat: "livebearer", tags: ["breeds-fast"] },
  { id: "molly", sci: "Poecilia sphenops", name: "Molly", length: 4, bioload: 1.0, minTank: 20, minLen: 24, temp: [72, 82], school: null, cat: "livebearer", tags: ["breeds-fast"] },
  { id: "swordtail", sci: "Xiphophorus hellerii", name: "Swordtail", length: 5, bioload: 1.0, minTank: 20, minLen: 30, temp: [72, 79], school: null, cat: "livebearer", tags: ["breeds-fast", "jumper"] },

  // ---- Bettas & gouramis (anabantoids) ----
  { id: "betta", sci: "Betta splendens", name: "Betta (male)", length: 2.5, bioload: 0.8, minTank: 5, minLen: 12, temp: [76, 82], school: null, cat: "gourami", tags: ["long-fin", "one-per-tank", "eats-shrimp", "surface-breather"] },
  { id: "sparkling-gourami", sci: "Trichopsis pumila", name: "Sparkling Gourami", length: 1.5, bioload: 0.4, minTank: 5, minLen: 16, temp: [76, 82], school: null, cat: "gourami", tags: ["nano", "surface-breather"] },
  { id: "honey-gourami", sci: "Trichogaster chuna", name: "Honey Gourami", length: 2, bioload: 0.6, minTank: 10, minLen: 20, temp: [72, 82], school: null, cat: "gourami", tags: ["surface-breather"] },
  { id: "dwarf-gourami", sci: "Trichogaster lalius", name: "Dwarf Gourami", length: 3.5, bioload: 0.8, minTank: 15, minLen: 24, temp: [72, 82], school: null, cat: "gourami", tags: ["semi-aggressive", "eats-shrimp", "surface-breather"] },
  { id: "pearl-gourami", sci: "Trichopodus leerii", name: "Pearl Gourami", length: 4, bioload: 1.0, minTank: 30, minLen: 30, temp: [75, 82], school: null, cat: "gourami", tags: ["eats-shrimp", "surface-breather"] },
  { id: "blue-gourami", sci: "Trichopodus trichopterus", name: "Three Spot / Blue Gourami", length: 5, bioload: 1.2, minTank: 30, minLen: 36, temp: [73, 82], school: null, cat: "gourami", tags: ["semi-aggressive", "eats-shrimp", "surface-breather"] },
  { id: "paradise-fish", sci: "Macropodus opercularis", name: "Paradise Fish", length: 3, bioload: 0.9, minTank: 20, minLen: 24, temp: [61, 79], school: null, cat: "gourami", tags: ["aggressive", "eats-shrimp", "subtropical", "surface-breather"] },

  // ---- Cichlids ----
  { id: "german-blue-ram", sci: "Mikrogeophagus ramirezi", name: "German Blue Ram", length: 2.5, bioload: 0.7, minTank: 20, minLen: 24, temp: [78, 85], school: null, cat: "cichlid", tags: ["water-sensitive", "warm-water"] },
  { id: "bolivian-ram", sci: "Mikrogeophagus altispinosus", name: "Bolivian Ram", length: 3, bioload: 0.8, minTank: 30, minLen: 30, temp: [72, 79], school: null, cat: "cichlid", tags: [] },
  { id: "apistogramma", sci: "Apistogramma cacatuoides", name: "Apistogramma (Cockatoo)", length: 3, bioload: 0.8, minTank: 20, minLen: 24, temp: [75, 84], school: null, cat: "cichlid", tags: ["territorial", "eats-shrimp"] },
  { id: "kribensis", sci: "Pelvicachromis pulcher", name: "Kribensis", length: 3.5, bioload: 0.9, minTank: 20, minLen: 30, temp: [75, 81], school: null, cat: "cichlid", tags: ["territorial", "eats-shrimp"] },
  { id: "angelfish", sci: "Pterophyllum scalare", name: "Angelfish", length: 6, bioload: 2.0, minTank: 29, minLen: 30, temp: [76, 84], school: null, cat: "cichlid", tags: ["semi-aggressive", "predator-adult", "eats-shrimp", "needs-height", "long-fin"] },
  { id: "discus", sci: "Symphysodon aequifasciatus", name: "Discus", length: 6, bioload: 2.2, minTank: 55, minLen: 36, temp: [82, 88], school: 5, cat: "cichlid", tags: ["advanced", "water-sensitive", "warm-water", "needs-height"] },
  { id: "convict-cichlid", sci: "Amatitlania nigrofasciata", name: "Convict Cichlid", length: 5, bioload: 1.6, minTank: 30, minLen: 30, temp: [72, 82], school: null, cat: "cichlid", tags: ["aggressive", "territorial", "eats-shrimp", "breeds-fast"] },
  { id: "jack-dempsey", sci: "Rocio octofasciata", name: "Jack Dempsey", length: 8, bioload: 2.8, minTank: 55, minLen: 48, temp: [72, 82], school: null, cat: "cichlid", tags: ["aggressive", "territorial", "predator", "eats-shrimp"] },
  { id: "oscar", sci: "Astronotus ocellatus", name: "Oscar", length: 13, bioload: 5.0, minTank: 75, minLen: 48, temp: [74, 81], school: null, cat: "cichlid", tags: ["aggressive", "predator", "eats-shrimp", "outgrows-most-tanks", "heavy-waste"] },

  // ---- Bottom dwellers & algae eaters ----
  { id: "pygmy-cory", sci: "Corydoras pygmaeus", name: "Pygmy Corydoras", length: 1, bioload: 0.3, minTank: 10, minLen: 20, temp: [72, 79], school: 8, cat: "bottom", tags: ["nano", "bottom-dweller"] },
  { id: "panda-cory", sci: "Corydoras panda", name: "Panda Corydoras", length: 2, bioload: 0.5, minTank: 15, minLen: 20, temp: [68, 77], school: 6, cat: "bottom", tags: ["bottom-dweller"] },
  { id: "corydoras", sci: "Corydoras aeneus", name: "Corydoras (Bronze/Albino)", length: 2.5, bioload: 0.6, minTank: 20, minLen: 24, temp: [72, 79], school: 6, cat: "bottom", tags: ["bottom-dweller"] },
  { id: "otocinclus", sci: "Otocinclus vittatus", name: "Otocinclus", length: 2, bioload: 0.4, minTank: 10, minLen: 20, temp: [72, 79], school: 6, cat: "bottom", tags: ["bottom-dweller", "algae-eater", "needs-mature-tank"] },
  { id: "bristlenose-pleco", sci: "Ancistrus cirrhosus", name: "Bristlenose Pleco", length: 5, bioload: 1.5, minTank: 30, minLen: 30, temp: [73, 81], school: null, cat: "bottom", tags: ["bottom-dweller", "algae-eater", "heavy-waste"] },
  { id: "common-pleco", sci: "Pterygoplichthys pardalis", name: "Common Pleco", length: 18, bioload: 6.0, minTank: 150, minLen: 72, temp: [72, 82], school: null, cat: "bottom", tags: ["bottom-dweller", "outgrows-most-tanks", "heavy-waste"] },
  { id: "kuhli-loach", sci: "Pangio kuhlii", name: "Kuhli Loach", length: 4, bioload: 0.5, minTank: 20, minLen: 24, temp: [75, 86], school: 6, cat: "bottom", tags: ["bottom-dweller"] },
  { id: "zebra-loach", sci: "Botia striata", name: "Zebra Loach", length: 3.5, bioload: 0.8, minTank: 30, minLen: 30, temp: [73, 79], school: 5, cat: "bottom", tags: ["bottom-dweller"] },
  { id: "yoyo-loach", sci: "Botia almorhae", name: "Yoyo Loach", length: 5, bioload: 1.2, minTank: 40, minLen: 36, temp: [75, 86], school: 5, cat: "bottom", tags: ["bottom-dweller", "eats-shrimp", "eats-snails"] },
  { id: "clown-loach", sci: "Chromobotia macracanthus", name: "Clown Loach", length: 12, bioload: 3.5, minTank: 125, minLen: 72, temp: [75, 86], school: 5, cat: "bottom", tags: ["bottom-dweller", "outgrows-most-tanks", "eats-snails"] },
  { id: "siamese-algae-eater", sci: "Crossocheilus oblongus", name: "Siamese Algae Eater", length: 6, bioload: 1.4, minTank: 30, minLen: 36, temp: [75, 79], school: null, cat: "bottom", tags: ["bottom-dweller", "algae-eater", "very-active"] },
  { id: "chinese-algae-eater", sci: "Gyrinocheilus aymonieri", name: "Chinese Algae Eater", length: 10, bioload: 2.5, minTank: 55, minLen: 48, temp: [74, 80], school: null, cat: "bottom", tags: ["bottom-dweller", "aggressive-adult", "territorial", "outgrows-most-tanks"] },
  { id: "dojo-loach", sci: "Misgurnus anguillicaudatus", name: "Dojo / Weather Loach", length: 10, bioload: 2.5, minTank: 55, minLen: 48, temp: [50, 77], school: 3, cat: "bottom", tags: ["bottom-dweller", "subtropical", "jumper", "outgrows-most-tanks"] },

  // ---- Larger / centrepiece fish ----
  { id: "red-tail-shark", sci: "Epalzeorhynchos bicolor", name: "Red Tail Shark", length: 6, bioload: 1.5, minTank: 55, minLen: 48, temp: [72, 79], school: null, cat: "large", tags: ["aggressive", "territorial", "bottom-dweller"] },
  { id: "rainbow-shark", sci: "Epalzeorhynchos frenatum", name: "Rainbow Shark", length: 6, bioload: 1.5, minTank: 55, minLen: 48, temp: [72, 81], school: null, cat: "large", tags: ["aggressive", "territorial", "bottom-dweller"] },
  { id: "bala-shark", sci: "Balantiocheilos melanopterus", name: "Bala Shark", length: 12, bioload: 3.5, minTank: 125, minLen: 72, temp: [72, 82], school: 5, cat: "large", tags: ["outgrows-most-tanks", "very-active", "jumper"] },
  { id: "silver-dollar", sci: "Metynnis argenteus", name: "Silver Dollar", length: 6, bioload: 2.0, minTank: 75, minLen: 48, temp: [75, 82], school: 5, cat: "large", tags: ["eats-plants", "very-active"] },

  // ---- Coldwater ----
  { id: "fancy-goldfish", sci: "Carassius auratus", name: "Fancy Goldfish", length: 7, bioload: 3.0, minTank: 20, minLen: 30, temp: [65, 75], school: null, cat: "coldwater", tags: ["coldwater", "heavy-waste", "long-fin", "eats-plants"] },
  { id: "common-goldfish", sci: "Carassius auratus", name: "Common / Comet Goldfish", length: 12, bioload: 4.5, minTank: 75, minLen: 48, temp: [60, 74], school: null, cat: "coldwater", tags: ["coldwater", "heavy-waste", "outgrows-most-tanks", "eats-plants"] },

  // ---- Invertebrates & other ----
  { id: "cherry-shrimp", sci: "Neocaridina davidi", name: "Cherry Shrimp", length: 1, bioload: 0.2, minTank: 5, minLen: 12, temp: [65, 80], school: null, cat: "invert", tags: ["invertebrate", "shrimp", "nano"] },
  { id: "amano-shrimp", sci: "Caridina multidentata", name: "Amano Shrimp", length: 2, bioload: 0.3, minTank: 10, minLen: 16, temp: [70, 80], school: null, cat: "invert", tags: ["invertebrate", "shrimp", "algae-eater"] },
  { id: "ghost-shrimp", sci: "Palaemonetes paludosus", name: "Ghost Shrimp", length: 1.5, bioload: 0.25, minTank: 5, minLen: 12, temp: [65, 80], school: null, cat: "invert", tags: ["invertebrate", "shrimp"] },
  { id: "nerite-snail", sci: "Neritina natalensis", name: "Nerite Snail", length: 1, bioload: 0.2, minTank: 5, minLen: 12, temp: [72, 78], school: null, cat: "invert", tags: ["invertebrate", "snail", "algae-eater"] },
  { id: "mystery-snail", sci: "Pomacea bridgesii", name: "Mystery Snail", length: 2, bioload: 0.4, minTank: 5, minLen: 16, temp: [68, 82], school: null, cat: "invert", tags: ["invertebrate", "snail"] },
  { id: "assassin-snail", sci: "Anentome helena", name: "Assassin Snail", length: 1, bioload: 0.2, minTank: 5, minLen: 12, temp: [72, 80], school: null, cat: "invert", tags: ["invertebrate", "snail", "eats-snails"] },
  { id: "african-dwarf-frog", sci: "Hymenochirus boettgeri", name: "African Dwarf Frog", length: 2.5, bioload: 0.5, minTank: 10, minLen: 20, temp: [72, 78], school: 3, cat: "invert", tags: ["surface-breather", "needs-sinking-food"] },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "small", label: "Small & schooling" },
  { key: "livebearer", label: "Livebearers" },
  { key: "gourami", label: "Bettas & gouramis" },
  { key: "cichlid", label: "Cichlids" },
  { key: "bottom", label: "Bottom & algae" },
  { key: "large", label: "Large fish" },
  { key: "coldwater", label: "Coldwater" },
  { key: "invert", label: "Inverts & other" },
];
