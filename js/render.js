(function () {
  var D = window.SITE, A = window.ART;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var page = document.body.getAttribute("data-page");

  // shared header and footer
  var h = $("#site-header");
  if (h) {
    h.innerHTML = '<div class="wrap row"><a class="brand" href="index.html">Beam<i>Point</i></a><nav id="nav" aria-label="Main"></nav></div>';
    D.nav.forEach(function (n) {
      var a = el("a", "", n[1]); a.href = n[0];
      if (n[0] === page) a.setAttribute("aria-current", "page");
      $("#nav").appendChild(a);
    });
  }
  var f = $("#site-footer");
  if (f) f.innerHTML = '<div class="wrap row"><span>' + D.footer + '</span><span><a href="index.html">Device</a> &nbsp; <a href="business.html">Business</a> &nbsp; <a href="project.html">Project</a></span></div>';

  // section chips (the rest of the content lives inside each main page)
  var chips = $("#chips");
  if (chips) document.querySelectorAll("section[data-title]").forEach(function (s) {
    var a = el("a", "", s.getAttribute("data-title")); a.href = "#" + s.id; a.setAttribute("data-for", s.id); chips.appendChild(a);
  });

  var sc = function (c) { var d = el("div", "card rv tilt"); return d; };
  var views = {
    problem: function (d, i) { var c = sc(); c.innerHTML = A.icon(d.i) + "<h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    steps: function (d) { var l = el("li"); l.innerHTML = "<b>" + d.t + "</b><span>" + d.b + "</span>"; return l; },
    features: function (d, i) { var c = sc(); c.style.setProperty("--d", i * 0.08 + "s"); c.innerHTML = "<h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    specs: function (d, i) { var c = sc(); c.style.setProperty("--d", i * 0.06 + "s"); c.innerHTML = "<p>" + d[0] + "</p><h3>" + d[1] + "</h3>"; return c; },
    pricing: function (d, i) { var c = sc(); c.style.setProperty("--d", i * 0.08 + "s"); c.innerHTML = '<p class="price">' + d.p + '</p><p class="unit">' + d.u + "</p><h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    market: function (d, i) { var r = el("div", "hbar"); var max = 210; r.style.setProperty("--d", i * 0.1 + "s"); r.innerHTML = "<span>" + d[0] + '</span><span class="t"><i style="--w:' + (d[1] / max * 100) + '%;--d:' + i * 0.1 + 's"></i></span><b>' + d[1] + "</b>"; return r; },
    bom: function (d, i) { var x = el("i"); x.style.cssText = "--g:" + d[1] + ";--h:" + (170 + i * 22) + ";--d:" + i * 0.05 + "s"; x.title = d[0] + " UGX " + d[1] + "k"; return x; },
    bomlegend: function (d, i) { var s = el("span"); s.innerHTML = '<s style="--h:' + (170 + i * 22) + '"></s>' + d[0] + " " + d[1] + "k"; return s; },
    cash: function (d, i) { var c = el("div", "col"); c.innerHTML = "<b>" + d[1] + "m</b><i style=\"--h:" + (d[1] / 35 * 100) + "%;--d:" + i * 0.15 + 's"></i><span>' + d[0] + "</span>"; return c; },
    roadmap: function (d) { var c = el("div", "card"); c.innerHTML = '<p class="m">' + d.m + "</p><h3>" + d.t + "</h3><p>" + d.b + "</p>"; return c; },
    team: function (d, i) { var c = sc(); c.style.setProperty("--d", i * 0.08 + "s"); c.innerHTML = '<div class="avatar">' + d.n.split(" ").slice(0, 2).map(function (w) { return w[0]; }).join("") + "</div><h3>" + d.n + "</h3><p>" + d.r + "</p>"; return c; },
    risks: function (d, i) { var r = el("div", "risk"); r.innerHTML = "<b>" + d.id + "</b><span>" + d.t + '</span><span class="t"><i style="--w:' + d.s / 20 * 100 + "%;--d:" + i * 0.1 + 's"></i></span>'; return r; },
    legal: function (d) { var x = el("details"); x.innerHTML = "<summary><span>" + d.t + '</span><span class="mute">' + d.w + "</span></summary><p>" + d.b + "</p>"; return x; }
  };
  document.querySelectorAll("[data-render]").forEach(function (box) {
    var k = box.getAttribute("data-render"), key = k.split(":")[0];
    var src = key === "bomlegend" ? D.bom : D[key];
    src.forEach(function (d, i) { box.appendChild(views[key](d, i)); });
  });
  document.querySelectorAll("[data-art]").forEach(function (b) { b.innerHTML = A[b.getAttribute("data-art")](); });
})();
