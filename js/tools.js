// ROI calculator, break-even, dashboard jobs, CSV export, pilot form.
(function () {
  var $ = function (s) { return document.querySelector(s); }, BP = window.BP;
  var fmt = function (n) { return "UGX " + Math.round(n).toLocaleString("en-US"); };
  var g = function (id) { return document.getElementById(id); };

  var roi = $("#roi");
  if (roi) {
    var calc = function () {
      var spec = [["r_tech", "Technicians", 1, 500, true], ["r_visits", "Visits avoided", 0, 500, true], ["r_cost", "Cost per visit", 0, 1e7], ["r_extra", "Extra install value", 0, 1e9], ["r_ret", "Retained customers", 0, 1e9], ["r_sup", "Support savings", 0, 1e9], ["r_dev", "Devices", 1, 500, true], ["r_price", "Device price", 0, 1e8], ["r_sub", "Subscription", 0, 1e7]];
      var v = {}, bad = false;
      spec.forEach(function (s) { var x = BP.num(g(s[0]), { label: s[1], min: s[2], max: s[3], int: s[4] }); if (x === null) bad = true; v[s[0]] = x; });
      var outs = ["o_save", "o_cost", "o_net", "o_pb", "o_half", "o_sug"];
      if (bad) { outs.forEach(function (o) { g(o).textContent = "-"; }); return; }
      var save = v.r_visits * v.r_cost + v.r_extra + v.r_ret + v.r_sup, cost = v.r_dev * v.r_sub, capex = v.r_dev * v.r_price, net = save - cost, half = save / 2 - cost;
      var pb = function (x) { return x > 0 ? (capex / x).toFixed(1) + " months" : "no payback"; };
      g("o_save").textContent = fmt(save); g("o_cost").textContent = fmt(cost); g("o_net").textContent = fmt(net);
      g("o_pb").textContent = pb(net); g("o_half").textContent = pb(half); g("o_sug").textContent = Math.ceil(v.r_tech / 3);
    };
    roi.addEventListener("input", calc); calc();
  }

  var be = $("#be");
  if (be) {
    var bcalc = function () {
      var f = BP.num(g("b_fixed"), { label: "Fixed costs", min: 1, max: 1e11 }), c = BP.num(g("b_contrib"), { label: "Contribution per unit", min: 1, max: 1e8 }),
          d = BP.num(g("b_devs"), { label: "Devices in the field", min: 0, max: 5000, int: true }), s = BP.num(g("b_sub"), { label: "Subscription", min: 0, max: 1e7 });
      if ([f, c, d, s].indexOf(null) >= 0) { ["o_units", "o_cover", "o_after"].forEach(function (o) { g(o).textContent = "-"; }); return; }
      var cover = d * s * 12, units = Math.ceil(f / c), after = Math.max(0, Math.ceil((f - cover) / c));
      g("o_units").textContent = units + " units"; g("o_cover").textContent = Math.min(100, Math.round(cover / f * 100)) + "% of fixed costs";
      g("o_after").textContent = after + " units";
    };
    be.addEventListener("input", bcalc); bcalc();
  }

  var latest = $("#latest");
  if (latest) {
    var jobs = BP && window.BPStore.get("bp-jobs"), rows = jobs.length ? jobs.slice(0, 5).map(function (j) { return [j.id, j.tower, j.quality, j.time]; }) : window.SITE.jobsSample;
    rows.forEach(function (r) { var li = document.createElement("li"); li.innerHTML = "<b>" + r[0] + "</b><span>" + r[1] + "</span><span>Q " + r[2] + "</span><span>" + r[3] + "</span>"; latest.appendChild(li); });
    var src = $("#jobsrc"); if (src) src.textContent = jobs.length ? "Showing jobs locked in the demo on this browser." : "Sample jobs. Lock a job in the demo to see it here.";
  }
  document.querySelectorAll("[data-export=jobs]").forEach(function (b) {
    b.addEventListener("click", function () {
      var jobs = window.BPStore.get("bp-jobs"); if (!jobs.length) { BP.toast("No jobs to export yet. Lock one in the demo first.", "info"); return; }
      BP.csv("beampoint-jobs.csv", ["Job ID", "Tower", "Quality", "Time"], jobs.map(function (j) { return [j.id, j.tower, j.quality, j.time]; }));
    });
  });

  var form = $("#pilotform");
  if (form) {
    form.noValidate = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var el = form.elements, name = BP.text(el.name, { label: "Name", min: 2, max: 60 }), co = BP.text(el.company, { label: "Company", min: 2, max: 80 }),
          role = BP.text(el.role, { label: "Role", min: 2, max: 60 }), wa = BP.phone(el.whatsapp);
      if ([name, co, role, wa].indexOf(null) >= 0) { BP.toast("Please fix the highlighted fields.", "error"); var first = form.querySelector("[aria-invalid=true]"); if (first) first.focus(); return; }
      var leads = window.BPStore.get("bp-leads");
      if (leads.some(function (l) { return l.whatsapp === wa; })) { BP.fail(el.whatsapp, "This number already requested a pilot on this browser."); return; }
      leads.push({ name: name, company: co, role: role, whatsapp: wa, savedAt: new Date().toISOString() });
      if (!window.BPStore.set("bp-leads", leads)) return;
      form.hidden = true; g("thanks").hidden = false; g("thanks").querySelector("b").textContent = name.split(" ")[0]; BP.toast("Pilot request saved.", "ok");
    });
    form.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid")) BP.ok(e.target); });
  }
})();
