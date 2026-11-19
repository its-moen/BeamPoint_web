(function () {
  var D = window.SITE, A = window.ART;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var page = document.body.getAttribute("data-page");

  var h = $("#site-header");
  if (h) {
    h.innerHTML = '<div class="wrap row"><a class="brand" href="index.html"><svg class="mark" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><rect x="1.5" y="1.5" width="17" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 15 L15 5" stroke="#ff7a1a" stroke-width="2.6" stroke-linecap="round"/></svg><span>Beam<i>Point</i></span></a><nav id="nav" aria-label="Main"></nav><div class="mode" role="group" aria-label="Color mode"><button data-m="light" aria-label="Light mode" title="Light"><svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="3.6"/><path d="M10 1.8v2.4M10 15.8v2.4M1.8 10h2.4M15.8 10h2.4M4.2 4.2l1.7 1.7M14.1 14.1l1.7 1.7M4.2 15.8l1.7-1.7M14.1 5.9l1.7-1.7"/></svg></button><button data-m="dark" aria-label="Dark mode" title="Dark"><svg viewBox="0 0 20 20" width="16" height="16"><path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7z"/></svg></button><button data-m="auto" aria-label="Match system" title="Match system"><svg viewBox="0 0 20 20" width="16" height="16"><rect x="2.5" y="3.5" width="15" height="10" rx="1.5"/><path d="M7 17h6M10 13.5V17"/></svg></button></div></div>';
    D.nav.forEach(function (n) { var a = el("a", "", n[1]); a.href = n[0]; if (n[0] === page) a.setAttribute("aria-current", "page"); $("#nav").appendChild(a); });
  }
  var f = $("#site-footer"), F = D.footer;
  if (f) {
    f.innerHTML = '<div class="wrap fgrid"><div class="fbrand"><a class="brand" href="index.html"><svg class="mark" viewBox="0 0 20 20" width="22" height="22" aria-hidden="true"><rect x="1.5" y="1.5" width="17" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 15 L15 5" stroke="#ff7a1a" stroke-width="2.6" stroke-linecap="round"/></svg><span>Beam<i>Point</i></span></a><p>' + F.tag + '</p><p class="tiny">' + F.place + '</p></div>' +
      F.cols.map(function (c) { return '<nav aria-label="' + c.h + '"><h4>' + c.h + '</h4><ul>' + c.links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join("") + '</ul></nav>'; }).join("") +
      '<div class="fdata"><h4>Your data</h4><p class="tiny">Demo jobs, pilot requests and tracker rows are saved only in this browser. Nothing is sent to a server.</p><button class="linkbtn" id="clearData" type="button">Clear my saved data</button></div></div>' +
      '<div class="wrap fbar"><span>&copy; ' + F.copy + '</span><a href="#top" class="totop-link">Back to top</a></div>';
    var cd = $("#clearData");
    if (cd) cd.addEventListener("click", function () {
      if (!confirm("Clear demo jobs, pilot requests and tracker rows saved in this browser?")) return;
      try { ["bp-jobs", "bp-leads", "bp-pilot"].forEach(function (k) { localStorage.removeItem(k); }); window.BP.toast("Saved data cleared.", "ok"); setTimeout(function () { location.reload(); }, 700); }
      catch (e) { window.BP.toast("This browser blocked access to saved data.", "error"); }
    });
  }
  var tt = document.createElement("button"); tt.id = "totop"; tt.type = "button"; tt.setAttribute("aria-label", "Back to top"); tt.innerHTML = '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 16V4M4.5 9.5 10 4l5.5 5.5"/></svg>';
  tt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); }); document.body.appendChild(tt);

  var chips = $("#chips"), n = 0;
  document.querySelectorAll("section[data-title]").forEach(function (s) {
    if (chips) { var a = el("a", "", s.getAttribute("data-title")); a.href = "#" + s.id; a.setAttribute("data-for", s.id); chips.appendChild(a); }
    var e = s.querySelector(".eyebrow");
    if (e && !s.classList.contains("hero")) { n++; e.textContent = (n < 10 ? "0" : "") + n + " / " + e.textContent; }
  });

  var sc = function () { return el("div", "card rv tilt"); };
  var dl = function (i, s) { return (i * (s || 0.08)) + "s"; };
  var views = {
    problem: function (d) { var c = sc(); c.innerHTML = A.icon(d.i) + "<h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    steps: function (d) { var l = el("li"); l.innerHTML = "<b>" + d.t + "</b><span>" + d.b + "</span>"; return l; },
    features: function (d, i) { var c = sc(); c.style.setProperty("--d", dl(i)); c.innerHTML = "<h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    specs: function (d, i) { var c = sc(); c.style.setProperty("--d", dl(i, 0.06)); c.innerHTML = "<p>" + d[0] + "</p><h3>" + d[1] + "</h3>"; return c; },
    pricing: function (d, i) { var c = sc(); c.style.setProperty("--d", dl(i)); c.innerHTML = '<p class="price">' + d.p + '</p><p class="unit">' + d.u + "</p><h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    market: function (d, i) { var r = el("div", "hbar"); r.innerHTML = "<span>" + d[0] + '</span><span class="t"><i style="--w:' + d[1] / 210 * 100 + "%;--d:" + dl(i, 0.1) + '"></i></span><b>' + d[1] + "</b>"; return r; },
    survey: function (d, i) { var r = el("div", "hbar"); r.innerHTML = "<span>" + d[0] + '</span><span class="t"><i style="--w:' + d[1] + "%;--d:" + dl(i, 0.07) + '"></i></span><b>' + d[1] + "%</b>"; return r; },
    bom: function (d, i) { var x = el("i"); x.style.cssText = "--g:" + d[1] + ";--h:" + (20 + i * 26) + ";--d:" + dl(i, 0.05); x.title = d[0] + " UGX " + d[1] + "k"; return x; },
    bomlegend: function (d, i) { var s = el("span"); s.innerHTML = '<s style="--h:' + (20 + i * 26) + '"></s>' + d[0] + " " + d[1] + "k"; return s; },
    cash: function (d, i) { var c = el("div", "col"); c.innerHTML = "<b>" + d[1] + "m</b><i style=\"--h:" + d[1] / 35 * 100 + "%;--d:" + dl(i, 0.15) + '"></i><span>' + d[0] + "</span>"; return c; },
    weekly: function (d, i) { var c = el("div", "col"); c.innerHTML = "<b>" + d[1] + "</b><i style=\"--h:" + d[1] / 52 * 100 + "%;--d:" + dl(i, 0.08) + '"></i><span>' + d[0] + "</span>"; return c; },
    kpis: function (d) { var c = sc(); c.innerHTML = "<b class=\"kv\">" + d[0] + "</b><p>" + d[1] + "</p>" + (d[2] ? '<p class="tiny">' + d[2] + "</p>" : ""); return c; },
    techs: function (d) { var r = el("tr"); r.innerHTML = "<td>" + d[0] + "</td><td>" + d[1] + "</td><td>" + d[2] + " min</td>"; return r; },
    roadmap: function (d) { var c = el("div", "card"); c.innerHTML = '<p class="m">' + d.m + "</p><h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    team: function (d, i) { var c = sc(); c.style.setProperty("--d", dl(i)); c.innerHTML = '<div class="avatar">' + d.n.split(" ").slice(0, 2).map(function (w) { return w[0]; }).join("") + "</div><h3>" + d.n + "</h3><p>" + d.r + "</p>"; return c; },
    risks: function (d, i) { var r = el("div", "risk"); r.innerHTML = "<b>" + d.id + "</b><span>" + d.t + '</span><span class="t"><i style="--w:' + d.s / 20 * 100 + "%;--d:" + dl(i, 0.1) + '"></i></span>'; return r; },
    legal: function (d) { var x = el("details"); x.innerHTML = "<summary><span>" + d.t + '</span><span class="mute">' + d.w + "</span></summary><p>" + d.b + "</p>"; return x; }
  };
  document.querySelectorAll("[data-render]").forEach(function (box) {
    var key = box.getAttribute("data-render").split(":")[0];
    var src = key === "bomlegend" ? D.bom : D[key];
    src.forEach(function (d, i) { box.appendChild(views[key](d, i)); });
  });
  document.querySelectorAll("[data-art]").forEach(function (b) { b.innerHTML = A[b.getAttribute("data-art")](); });
})();
