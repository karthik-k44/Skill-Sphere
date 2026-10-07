// Applies the saved theme before React mounts so dark-mode users don't see a white flash.
// A separate file (not inline) so the production Content-Security-Policy can stay strict.
(function () {
  try {
    var saved = JSON.parse(localStorage.getItem("theme") || '"system"');
    var dark = saved === "dark" || (saved === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (error) {
    // Storage blocked: fall back to the light theme.
  }
})();
