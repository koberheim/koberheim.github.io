// Day / night switch.
// Default is the light "aged plate" theme; the dark blackwater theme is
// opt-in and remembered per browser. The initial attribute is set by a tiny
// inline snippet in <head> so the page never flashes the wrong theme.
(function () {
  var KEY = "tankwise-theme";
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function label(btn, mode) {
    // The button advertises the mode it will switch you to.
    var next = mode === "dark" ? "Day" : "Night";
    btn.textContent = mode === "dark" ? "☀ " + next : "☾ " + next;
    btn.setAttribute("aria-label", "Switch to " + next.toLowerCase() + " theme");
    btn.setAttribute("aria-pressed", String(mode === "dark"));
  }

  function ready() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    label(btn, current());
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* private mode */ }
      label(btn, next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
