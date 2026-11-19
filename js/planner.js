// Bearing planner: distance, bearing and elevation from a site to a tower.
(function () {
  var form = document.getElementById("planner-form"); if (!form) return;
  var BP = window.BP, g = function (id) { return document.getElementById(id); }, rad = function (d) { return d * Math.PI / 180; };
  var needle = g("pl-needle"), submitted = false, last = "";
  var P = [["pl_slat", "Site latitude", -90, 90], ["pl_slon", "Site longitude", -180, 180], ["pl_tlat", "Tower latitude", -90, 90], ["pl_tlon", "Tower longitude", -180, 180]];
  var compass = function (b) { return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(b / 45) % 8]; };

  function run(show) {
    var v = {}, bad = false;
    P.forEach(function (p) { var x = g(p[0]).value.trim() === "" && !show ? undefined : BP.num(g(p[0]), { label: p[1], min: p[2], max: p[3] }); if (x === null) bad = true; v[p[0]] = x; });
    var dh = g("pl_dh").value.trim() === "" && !show ? undefined : BP.num(g("pl_dh"), { label: "Height difference", min: -500, max: 1000 });
    if (dh === null) bad = true;
    var out = g("pl-out"), note = g("pl-note"), hint = g("pl-hint"); var setOut = function (on) { out.hidden = !on; hint.hidden = on; }; note.textContent = ""; note.className = "tiny";
    if (bad || [v.pl_slat, v.pl_slon, v.pl_tlat, v.pl_tlon, dh].indexOf(undefined) >= 0) { setOut(false); return; }
    var f1 = rad(v.pl_slat), f2 = rad(v.pl_tlat), dl = rad(v.pl_tlon - v.pl_slon), R = 6371.0088;
    var a = Math.sin((f2 - f1) / 2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) ** 2, km = 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
    if (km < 0.01) { BP.fail(g("pl_tlat"), "Site and tower are the same point. Check the coordinates."); setOut(false); return; }
    BP.ok(g("pl_tlat"));
    var br = (Math.atan2(Math.sin(dl) * Math.cos(f2), Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl)) * 180 / Math.PI + 360) % 360;
    var dm = km * 1000, drop = dm * dm / (2 * 6371000 * 4 / 3), el = Math.atan2(dh - drop, dm) * 180 / Math.PI;
    g("pl-km").textContent = km.toFixed(2) + " km"; g("pl-br").textContent = ("00" + Math.round(br)).slice(-3) + " deg " + compass(br); g("pl-el").textContent = (el >= 0 ? "+" : "") + el.toFixed(2) + " deg";
    needle.setAttribute("transform", "rotate(" + br.toFixed(1) + " 60 60)"); setOut(true);
    if (km > 80) { note.textContent = "Over 80 km is unlikely for an LTE CPE link. Check the coordinates."; note.className = "tiny warnnote"; }
    else if (km > 30) { note.textContent = "Over 30 km: expect weak signal and check the terrain profile."; note.className = "tiny warnnote"; }
    last = "Bearing " + g("pl-br").textContent + ", elevation " + g("pl-el").textContent + ", distance " + g("pl-km").textContent;
  }
  form.noValidate = true;
  form.addEventListener("submit", function (e) { e.preventDefault(); submitted = true; run(true); if (g("pl-out").hidden) BP.toast("Please fix the highlighted fields.", "error"); });
  form.addEventListener("input", function () { if (submitted) run(true); });

  g("pl-example").addEventListener("click", function () {
    g("pl_slat").value = "0.4244"; g("pl_slon").value = "33.2041"; g("pl_tlat").value = "0.4510"; g("pl_tlon").value = "33.2300"; g("pl_dh").value = "25";
    submitted = true; run(true); BP.toast("Example filled in. These are sample coordinates near Jinja.", "info");
  });
  g("pl-loc").addEventListener("click", function () {
    if (!navigator.geolocation) { BP.toast("Location is not available in this browser. Type the coordinates instead.", "error"); return; }
    var b = g("pl-loc"); b.disabled = true; b.textContent = "Locating";
    navigator.geolocation.getCurrentPosition(function (p) {
      b.disabled = false; b.textContent = "Use my location";
      g("pl_slat").value = p.coords.latitude.toFixed(5); g("pl_slon").value = p.coords.longitude.toFixed(5); BP.ok(g("pl_slat")); BP.ok(g("pl_slon")); if (submitted) run(true); BP.toast("Site position set from your device.", "ok");
    }, function (er) {
      b.disabled = false; b.textContent = "Use my location";
      BP.toast(er.code === 1 ? "Location permission was denied. Type the coordinates instead." : er.code === 3 ? "Location timed out. Try again outdoors." : "Could not get your location.", "error");
    }, { timeout: 10000, maximumAge: 60000 });
  });
  g("pl-copy").addEventListener("click", function () {
    if (!last) { BP.toast("Calculate first.", "info"); return; }
    if (!navigator.clipboard) { BP.toast("Copy is not available here. Select the numbers and copy by hand.", "error"); return; }
    navigator.clipboard.writeText(last).then(function () { BP.toast("Result copied.", "ok"); }, function () { BP.toast("Could not copy. Select the numbers and copy by hand.", "error"); });
  });
})();
