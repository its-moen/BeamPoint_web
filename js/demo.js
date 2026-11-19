// Interactive BP-1 simulator. Sample towers only.
(function () {
  var root = document.getElementById("sim"); if (!root) return;
  var T = window.SITE.towers, $ = function (s) { return root.querySelector(s); };
  var cellsEl = $("#cells"), listEl = $("#tlist"), dial = $("#dial"), hdg = $("#hdg"), state = $("#state"), lockBtn = $("#lock"), scanBtn = $("#scan"), sndBtn = $("#snd"), logEl = document.getElementById("joblog"), tm = document.getElementById("demotime");
  var sel = -1, heading = 0, scanned = false, t0 = 0, soundOn = false, ctx = null, timer = null;
  var jobs = window.BPStore.get("bp-jobs");
  var err = function (a, b) { return Math.round(((a - b + 540) % 360) - 180); };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var p3 = function (n) { return ("00" + n).slice(-3); };

  // six scan cells
  for (var i = 1; i <= 6; i++) { var s = document.createElement("span"); s.textContent = "CELL " + i; cellsEl.appendChild(s); }

  // dial
  var ticks = "";
  for (var a = 0; a < 360; a += 10) { var r1 = a % 90 === 0 ? 88 : 96, rad = a * Math.PI / 180; ticks += '<line x1="' + (120 + 104 * Math.sin(rad)) + '" y1="' + (120 - 104 * Math.cos(rad)) + '" x2="' + (120 + r1 * Math.sin(rad)) + '" y2="' + (120 - r1 * Math.cos(rad)) + '" class="tk"/>'; }
  dial.innerHTML = '<circle cx="120" cy="120" r="108" class="dr"/>' + ticks +
    '<text x="120" y="76" class="dl">N</text><text x="168" y="124" class="dl">E</text><text x="120" y="172" class="dl">S</text><text x="72" y="124" class="dl">W</text>' +
    '<g id="tn" style="opacity:0"><path d="M120 120 V30" class="tn"/><path d="M112 40 L120 24 L128 40Z" class="tnh"/></g>' +
    '<g id="hn"><path d="M120 120 V48" class="hn"/><path d="M114 56 L120 44 L126 56Z" class="hnh"/></g><circle cx="120" cy="120" r="6" class="hub"/>';
  var tn = dial.querySelector("#tn"), hn = dial.querySelector("#hn");

  function update() {
    hn.setAttribute("transform", "rotate(" + heading + " 120 120)");
    $("#r_now").textContent = p3(heading) + " deg";
    if (sel < 0) { state.textContent = "Scan to begin"; state.className = "state"; return; }
    var t = T[sel], e = err(t.b, heading), ab = Math.abs(e), ok = ab <= 3;
    tn.setAttribute("transform", "rotate(" + t.b + " 120 120)"); tn.style.opacity = 1;
    $("#r_target").textContent = p3(t.b) + " deg";
    $("#r_elev").textContent = "+" + t.el.toFixed(1) + " deg";
    $("#r_turn").textContent = ok ? "0 deg" : (e > 0 ? "Right " : "Left ") + ab + " deg";
    state.textContent = ok ? "ALIGNED" : (e > 0 ? "Turn right" : "Turn left");
    state.className = "state" + (ok ? " good" : "");
  }
  function setHeading(v) { heading = ((Math.round(v) % 360) + 360) % 360; hdg.value = heading; update(); }

  // dial click and drag
  var drag = false;
  var fromEvent = function (ev) { var r = dial.getBoundingClientRect(), x = ev.clientX - r.left - r.width / 2, y = ev.clientY - r.top - r.height / 2; setHeading(Math.atan2(x, -y) * 180 / Math.PI); };
  dial.addEventListener("pointerdown", function (e) { drag = true; fromEvent(e); });
  window.addEventListener("pointermove", function (e) { if (drag) fromEvent(e); });
  window.addEventListener("pointerup", function () { drag = false; });
  hdg.addEventListener("input", function () { setHeading(+hdg.value); });

  // scan
  scanBtn.addEventListener("click", function () {
    if (scanBtn.disabled) return;
    scanBtn.disabled = true; listEl.innerHTML = ""; sel = -1; scanned = false; lockBtn.disabled = true; update();
    var spans = cellsEl.children; Array.prototype.forEach.call(spans, function (s) { s.className = ""; });
    var k = 0;
    (function step() {
      if (k < spans.length) { spans[k].className = "on"; k++; setTimeout(step, 260); return; }
      T.forEach(function (t, i) {
        var li = document.createElement("li"); li.style.setProperty("--d", i * 0.1 + "s");
        li.innerHTML = '<b>' + t.site + '</b><span>Q ' + t.q + '</span><span>' + t.km + ' km</span><span>' + p3(t.b) + ' deg</span><small>' + t.note + "</small>";
        li.tabIndex = 0; li.addEventListener("click", function () { pick(i); }); li.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
        listEl.appendChild(li);
      });
      scanned = true; scanBtn.disabled = false; scanBtn.textContent = "Scan again"; lockBtn.disabled = false; t0 = performance.now(); pick(0); startTone();
    })();
  });
  function pick(i) { sel = i; Array.prototype.forEach.call(listEl.children, function (li, k) { li.className = k === i ? "sel" : ""; }); update(); }

  // lock and log
  var renderLog = function () {
    logEl.innerHTML = "";
    if (!jobs.length) { logEl.innerHTML = '<li class="mute">No jobs yet. Scan, align within 3 degrees, then press Lock.</li>'; return; }
    jobs.slice(0, 6).forEach(function (j) { var li = document.createElement("li"); li.innerHTML = "<b>" + j.id + "</b><span>" + j.tower + "</span><span>Q " + j.quality + "</span><span>" + j.time + "</span>"; logEl.appendChild(li); });
  };
  lockBtn.addEventListener("click", function () {
    if (sel < 0) return; var t = T[sel];
    if (Math.abs(err(t.b, heading)) > 3) { state.textContent = "Align within 3 degrees to lock"; state.className = "state warn"; return; }
    var secs = Math.round((performance.now() - t0) / 1000), d = new Date();
    jobs.unshift({ id: "JOB-" + (1043 + jobs.length), tower: t.site, quality: t.q, time: pad(d.getHours()) + ":" + pad(d.getMinutes()) });
    window.BPStore.set("bp-jobs", jobs); renderLog();
    tm.textContent = "Your demo time: " + pad(Math.floor(secs / 60)) + ":" + pad(secs % 60);
    state.textContent = "LOCKED and logged"; state.className = "state good";
    tone(1500, 160);
  });

  // sound: only after the user presses the button, rising tone as the error shrinks
  function tone(f, d) {
    if (!ctx) return; var o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
    o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.15, n + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, n + d / 1000);
    o.connect(g); g.connect(ctx.destination); o.start(n); o.stop(n + d / 1000 + 0.02);
  }
  function startTone() {
    clearTimeout(timer); if (!soundOn || !scanned || sel < 0) return;
    var e = Math.abs(err(T[sel].b, heading)), ok = e <= 3;
    tone(ok ? 1400 : 380 + (180 - e) * 4, ok ? 70 : 90);
    timer = setTimeout(startTone, ok ? 110 : 140 + e * 5);
  }
  sndBtn.addEventListener("click", function () {
    soundOn = !soundOn; sndBtn.textContent = soundOn ? "Sound on" : "Sound off"; sndBtn.setAttribute("aria-pressed", soundOn);
    if (soundOn) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) { soundOn = false; sndBtn.textContent = "Sound off"; sndBtn.setAttribute("aria-pressed", false); window.BP.toast("Sound is not supported in this browser.", "error"); return; } try { if (!ctx) ctx = new AC(); if (ctx.resume) ctx.resume(); startTone(); } catch (e) { soundOn = false; sndBtn.textContent = "Sound off"; window.BP.toast("Could not start sound. Check the browser audio settings.", "error"); } } else { clearTimeout(timer); }
  });
  renderLog(); update();
})();
