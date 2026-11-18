(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // hero headline: word by word
  all("[data-split]").forEach(function (h) {
    h.innerHTML = h.textContent.split(" ").map(function (w, i) { return '<span class="w" style="--d:' + (0.1 + i * 0.09) + 's">' + w + "</span>"; }).join(" ");
  });

  // reveal on scroll, plus bars and columns grow when their parent enters
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.18 });
  all(".rv, .grow").forEach(function (e) { io.observe(e); });

  // counters
  var co = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; co.unobserve(e.target);
      var n = parseFloat(e.target.getAttribute("data-count")), pre = e.target.getAttribute("data-pre") || "", suf = e.target.getAttribute("data-suf") || "", dec = (String(n).split(".")[1] || "").length, t0 = performance.now();
      (function tick(t) {
        var p = reduce ? 1 : clamp((t - t0) / 1400, 0, 1), v = n * (1 - Math.pow(1 - p, 3));
        e.target.textContent = pre + v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  all("[data-count]").forEach(function (e) { co.observe(e); });

  // chips follow the section in view
  var chipEls = all("#chips a");
  var so = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      chipEls.forEach(function (c) { var on = c.getAttribute("data-for") === e.target.id; c.classList.toggle("on", on); if (on) c.scrollIntoView({ inline: "center", block: "nearest" }); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  all("section[data-title]").forEach(function (s) { so.observe(s); });

  // card tilt
  all(".tilt").forEach(function (c) {
    c.addEventListener("pointermove", function (e) { if (e.pointerType !== "mouse" || reduce) return; var r = c.getBoundingClientRect(); c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 8 + "deg"); c.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 8 + "deg"); });
    c.addEventListener("pointerleave", function () { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
  });

  // drag to scroll rails
  all(".rail").forEach(function (r) {
    var down = false, x0 = 0, s0 = 0;
    r.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; x0 = e.clientX; s0 = r.scrollLeft; r.classList.add("drag"); });
    window.addEventListener("pointerup", function () { down = false; r.classList.remove("drag"); });
    window.addEventListener("pointermove", function (e) { if (down) r.scrollLeft = s0 - (e.clientX - x0); });
  });

  // savings calculator (planning estimate from the proposal, to be validated in the pilot)
  var cr = $("#techs");
  if (cr) {
    var fmt = function (n) { return "UGX " + Math.round(n).toLocaleString("en-US"); };
    var upd = function () {
      var t = +cr.value, dev = Math.ceil(t / 3), save = t * (5150000 / 6), cost = dev * 1200000, sub = dev * 45000, net = save - sub;
      $("#tn").textContent = t; $("#dv").textContent = dev;
      $("#sv").innerHTML = fmt(net) + "<small>estimated monthly benefit after subscription</small>";
      $("#pb").innerHTML = (cost / net).toFixed(1) + " months<small>to recover " + fmt(cost) + " in devices</small>";
    };
    cr.addEventListener("input", upd); upd();
  }

  // scroll driven: parallax, progress bar, horizontal pin, morph stage
  var par = all(".par"), hp = all(".hpin"), mp = all(".morph"), bar = $("#progress");
  hp.forEach(function (p) { var tr = $(".track", p); var size = function () { p.style.height = tr.scrollWidth - window.innerWidth + window.innerHeight * 1.1 + "px"; }; size(); window.addEventListener("resize", size); });

  var needle = $("#needle"), status = $("#status"), last = -1;
  var STATUS = window.SITE.status;
  var morph = function (sec) {
    var r = sec.getBoundingClientRect(), p = clamp(-r.top / (r.height - window.innerHeight), 0, 0.9999), n = 7, i = Math.floor(p * n), f = p * n - i, step = i + 1;
    if (step !== last) {
      last = step;
      all(".sg").forEach(function (g) { var a = +g.getAttribute("data-from"), b = +(g.getAttribute("data-to") || 99); g.classList.toggle("on", step >= a && step <= b); });
      all(".steplist li").forEach(function (l, k) { l.classList.toggle("active", k === i); l.classList.toggle("done", k < i); });
      if (status) status.textContent = STATUS[i];
    }
    var ang = step < 6 ? -75 : step === 6 ? -75 + 117 * (1 - Math.pow(1 - f, 2)) : 42;
    if (needle) needle.setAttribute("transform", "rotate(" + ang + " 150 220)");
  };

  var tick = false;
  var frame = function () {
    tick = false;
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (!reduce) par.forEach(function (g) { g.style.transform = "translateY(" + y * +g.getAttribute("data-speed") + "px)"; });
    hp.forEach(function (p) {
      var tr = $(".track", p), r = p.getBoundingClientRect(), pr = clamp(-r.top / (r.height - window.innerHeight), 0, 1);
      tr.style.transform = "translateX(" + -pr * (tr.scrollWidth - window.innerWidth) + "px)";
      p.style.setProperty("--p", pr);
    });
    mp.forEach(morph);
  };
  var req = function () { if (!tick) { tick = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", req); frame();
})();
