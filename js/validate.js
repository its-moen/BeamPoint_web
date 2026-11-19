// Shared helpers: toasts, field errors, CSV export, global error handling.
(function () {
  var BP = window.BP = {};
  var box = document.createElement("div"); box.id = "toasts"; box.setAttribute("aria-live", "polite"); document.body.appendChild(box);

  BP.toast = function (msg, type) {
    var t = document.createElement("div"); t.className = "toast " + (type || "info"); t.textContent = msg; box.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("in"); });
    setTimeout(function () { t.classList.remove("in"); setTimeout(function () { t.remove(); }, 400); }, type === "error" ? 6000 : 3500);
  };

  var errFor = function (el) {
    var id = "err-" + (el.id || el.name || Math.random().toString(36).slice(2));
    var e = document.getElementById(id);
    if (!e) { e = document.createElement("small"); e.id = id; e.className = "err"; e.setAttribute("role", "alert"); el.insertAdjacentElement("afterend", e); }
    return e;
  };
  BP.fail = function (el, msg) { var e = errFor(el); e.textContent = msg; el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", e.id); return null; };
  BP.ok = function (el) { var e = errFor(el); e.textContent = ""; el.removeAttribute("aria-invalid"); return true; };

  BP.num = function (el, o) {
    var raw = String(el.value).trim(), label = o.label || "This value";
    if (raw === "") return BP.fail(el, label + " is required.");
    var v = Number(raw); if (!isFinite(v)) return BP.fail(el, label + " must be a number.");
    if (o.int && Math.floor(v) !== v) return BP.fail(el, label + " must be a whole number.");
    if (o.min != null && v < o.min) return BP.fail(el, label + " must be at least " + o.min + ".");
    if (o.max != null && v > o.max) return BP.fail(el, label + " must be at most " + o.max + ".");
    BP.ok(el); return v;
  };
  BP.text = function (el, o) {
    var v = String(el.value).trim().replace(/\s+/g, " "), label = o.label || "This field";
    if (v.length < (o.min || 1)) return BP.fail(el, v.length ? label + " is too short." : label + " is required.");
    if (v.length > (o.max || 80)) return BP.fail(el, label + " is too long.");
    BP.ok(el); return v;
  };
  BP.phone = function (el) {
    var v = String(el.value).replace(/[\s\-()]/g, "");
    if (!v) return BP.fail(el, "WhatsApp number is required.");
    if (!/^(\+?256|0)\d{9}$/.test(v)) return BP.fail(el, "Use a Ugandan number like 0772 123 456 or +256 772 123 456.");
    BP.ok(el); return "+256" + v.replace(/^(\+?256|0)/, "");
  };

  // CSV export. Cells that start with = + - @ are prefixed so spreadsheets never run them as formulas.
  BP.csv = function (name, header, rows) {
    try {
      var q = function (c) { var s = String(c == null ? "" : c); if (/^[=+\-@]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
      var text = [header].concat(rows).map(function (r) { return r.map(q).join(","); }).join("\r\n");
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000); BP.toast("Saved " + name, "ok");
    } catch (e) { BP.toast("Could not create the file in this browser.", "error"); }
  };

  // global safety nets
  var last = 0, once = function (msg) { var n = Date.now(); if (n - last > 4000) { last = n; BP.toast(msg, "error"); } };
  window.addEventListener("error", function (e) { if (e.message) once("Something went wrong. Reload the page if it keeps happening."); });
  window.addEventListener("unhandledrejection", function () { once("Something went wrong. Reload the page if it keeps happening."); });
  window.addEventListener("offline", function () { BP.toast("You are offline. The demo, calculators and trackers still work.", "info"); });
  window.addEventListener("online", function () { BP.toast("Back online.", "ok"); });
})();
