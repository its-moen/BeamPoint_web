// Mode selection: light (default), dark, auto. Remembered in this browser.
(function () {
  var root = document.documentElement, mq = window.matchMedia("(prefers-color-scheme: dark)");
  var resolve = function (m) { return m === "auto" ? (mq.matches ? "dark" : "light") : m; };
  var stored = function () { try { return localStorage.getItem("bp-mode") || "light"; } catch (e) { return "light"; } };
  function apply(m, anim) {
    if (anim) { root.classList.add("theme-anim"); setTimeout(function () { root.classList.remove("theme-anim"); }, 500); }
    root.dataset.mode = m; root.dataset.theme = resolve(m);
    document.querySelectorAll(".mode button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-m") === m); });
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = root.dataset.theme === "dark" ? "#071125" : "#f5f8ff";
  }
  document.querySelectorAll(".mode button").forEach(function (b) {
    b.addEventListener("click", function () { var m = b.getAttribute("data-m"); try { localStorage.setItem("bp-mode", m); } catch (e) {} apply(m, true); });
  });
  var onChange = function () { if (root.dataset.mode === "auto") apply("auto", true); };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  apply(stored(), false);
})();
