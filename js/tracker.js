// Pilot tracker: measures the project's own targets from real field jobs.
(function () {
  var form = document.getElementById("trk-form"); if (!form) return;
  var BP = window.BP, S = window.BPStore, KEY = "bp-pilot", g = function (id) { return document.getElementById(id); };
  var rows = S.get(KEY), MAX = 500;
  var avg = function (a) { return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : 0; };

  function render() {
    var tb = g("trk-body"); tb.innerHTML = "";
    rows.slice().reverse().slice(0, 12).forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td></td><td>" + r.manual + "</td><td>" + r.bp + "</td><td>" + (r.ok ? "Yes" : "No") + '</td><td><button type="button" class="linkbtn" data-id="' + r.id + '" aria-label="Delete this row">Delete</button></td>';
      tr.firstChild.textContent = r.provider; tb.appendChild(tr);
    });
    g("trk-empty").hidden = rows.length > 0;
    var n = rows.length, am = avg(rows.map(function (r) { return r.manual; })), ab = avg(rows.map(function (r) { return r.bp; })), saved = am ? (1 - ab / am) * 100 : 0, rate = n ? rows.filter(function (r) { return r.ok; }).length / n * 100 : 0;
    g("t_n").textContent = n; g("t_m").textContent = n ? am.toFixed(0) + " min" : "-"; g("t_b").textContent = n ? ab.toFixed(0) + " min" : "-"; g("t_s").textContent = n ? saved.toFixed(0) + "%" : "-"; g("t_r").textContent = n ? rate.toFixed(0) + "%" : "-";
    var set = function (id, ok) { var e = g(id); e.textContent = n ? (ok ? "Met" : "Not yet") : "No data"; e.className = "pill " + (n ? (ok ? "ok" : "no") : ""); };
    set("g1", ab < 20); set("g2", saved >= 30); set("g3", rate >= 85);
    g("t_note").textContent = n < 10 ? "Log at least 10 jobs for a fair read. You have " + n + "." : "Enough jobs for an early read. Confirm with the full pilot.";
  }
  form.noValidate = true;
  form.addEventListener("submit", function (e) {
    e.preventDefault(); var el = form.elements;
    var p = BP.text(el.provider, { label: "Provider", min: 2, max: 40 }), m = BP.num(el.manual, { label: "Manual minutes", min: 1, max: 600, int: true }), b = BP.num(el.bp, { label: "BeamPoint minutes", min: 1, max: 600, int: true });
    if ([p, m, b].indexOf(null) >= 0) { BP.toast("Please fix the highlighted fields.", "error"); return; }
    if (rows.length >= MAX) { BP.toast("Tracker is full (" + MAX + " rows). Export and clear it first.", "error"); return; }
    if (b > m) BP.toast("BeamPoint took longer than manual on this job. Saved anyway, but double check the numbers.", "info");
    rows.push({ id: Date.now() + "" + rows.length, provider: p, manual: m, bp: b, ok: el.ok.value === "yes" });
    if (!S.set(KEY, rows)) { rows.pop(); return; }
    el.manual.value = ""; el.bp.value = ""; render(); BP.toast("Job added.", "ok");
  });
  form.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid")) BP.ok(e.target); });
  g("trk-body").addEventListener("click", function (e) { var id = e.target.getAttribute("data-id"); if (!id) return; rows = rows.filter(function (r) { return r.id !== id; }); S.set(KEY, rows); render(); });
  g("trk-export").addEventListener("click", function () {
    if (!rows.length) { BP.toast("Nothing to export yet.", "info"); return; }
    BP.csv("beampoint-pilot.csv", ["Provider", "Manual minutes", "BeamPoint minutes", "Correct tower first time"], rows.map(function (r) { return [r.provider, r.manual, r.bp, r.ok ? "yes" : "no"]; }));
  });
  g("trk-sample").addEventListener("click", function () {
    var ex = [[78, 18, 1], [65, 21, 1], [90, 24, 0], [72, 16, 1], [58, 19, 1]];
    if (rows.length + ex.length > MAX) { BP.toast("Not enough room for the examples.", "error"); return; }
    ex.forEach(function (x, i) { rows.push({ id: Date.now() + "s" + i, provider: "Example", manual: x[0], bp: x[1], ok: !!x[2] }); });
    S.set(KEY, rows); render(); BP.toast("Added 5 example rows. Delete them before logging real jobs.", "info");
  });
  g("trk-clear").addEventListener("click", function () {
    if (!rows.length) { BP.toast("Nothing to clear.", "info"); return; }
    if (!confirm("Delete all " + rows.length + " tracker rows?")) return; rows = []; S.set(KEY, rows); render();
  });
  render();
})();
