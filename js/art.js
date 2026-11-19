// Illustrations drawn as SVG strings. Edit here to change any picture.
window.ART = {
  scene: function () {
    var tower = function (x, y, s) {
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="#1cc8b4" stroke-width="3" fill="none">' +
        '<path d="M0 0 L-26 260 M0 0 L26 260 M-18 90 L18 90 M-12 150 L12 150 M-22 210 L22 210 M-18 90 L12 150 M18 90 L-12 150 M-12 150 L22 210 M12 150 L-22 210"/>' +
        '<path d="M-10 4 L10 4" stroke-width="5"/></g>';
    };
    var arcs = function (x, y) {
      var o = '';
      [30, 55, 80].forEach(function (r) { o += '<path class="arc" d="M' + (x + r * 0.5) + ' ' + (y - r * 0.87) + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r * 0.5) + ' ' + (y + r * 0.87) + '"/>'; });
      return '<g>' + o + '</g>';
    };
    return '<svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071125"/><stop offset="1" stop-color="#122650"/></linearGradient>' +
      '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7a1a" stop-opacity=".9"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="1200" height="640" fill="url(#sky)"/>' +
      '<g class="par" data-speed="0.05"><circle cx="800" cy="170" r="150" fill="url(#glow)" opacity=".55"/><circle cx="800" cy="170" r="34" fill="#ff7a1a" opacity=".8"/></g>' +
      '<g class="par" data-speed="0.1"><path d="M0 430 Q150 360 300 420 T620 400 T940 420 T1200 380 V640 H0Z" fill="#10224a"/></g>' +
      '<g class="par" data-speed="0.18"><path d="M0 500 Q200 430 420 490 T820 470 T1200 480 V640 H0Z" fill="#0c1b3b"/>' + tower(1010, 250, .9) + arcs(1030, 255) + '</g>' +
      '<g class="par" data-speed="0.3"><path d="M0 590 Q260 520 560 580 T1200 560 V640 H0Z" fill="#060e20"/>' +
        '<g transform="translate(150 505)"><path d="M0 60 V20 L50 -14 L100 20 V60Z" fill="#122650" stroke="#1a3263" stroke-width="2"/><rect x="38" y="30" width="24" height="30" fill="#071619"/>' +
        '<path d="M66 -4 L66 -42 M54 -42 L78 -42 M58 -34 L74 -34" stroke="#ff7a1a" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
        '<path class="dash" d="M222 462 Q600 360 1002 258"/></g>' +
      '</svg>';
  },
  device: function () {
    var C = [150, 220];
    var P = {A: [203.5, 160.6], B: [195, 273.6], C: [61.4, 204.4]};
    var tw = function (k, best) { var p = P[k]; return '<g class="sg" data-from="2"><path class="tw' + (best ? ' best' : '') + '" d="M' + p[0] + ' ' + (p[1] - 9) + ' l7 16 h-14Z"/></g>' +
      '<g class="sg" data-from="3"><text x="' + (p[0] + 9) + '" y="' + (p[1] + 3) + '">' + k + '</text></g>'; };
    var rows = [["A  3.1 km",150,1],["B  5.4 km",98,0],["C  7.9 km",60,0]].map(function (r, i) {
      var y = 362 + i * 28;
      return '<text x="34" y="' + (y + 9) + '">' + r[0] + '</text><rect class="bar' + (r[2] ? ' best' : '') + '" x="104" y="' + y + '" width="' + r[1] + '" height="11" rx="5"/>';
    }).join('');
    var rings = [40, 70, 100].map(function (r) { return '<circle class="ring" cx="' + C[0] + '" cy="' + C[1] + '" r="' + r + '"/>'; }).join('');
    return '<svg class="dev" viewBox="0 0 300 520" role="img" aria-label="BP-1 device screen">' +
      '<rect class="body" x="6" y="6" width="288" height="508" rx="34"/><rect class="screen" x="22" y="30" width="256" height="420" rx="14"/>' +
      '<text x="34" y="50">BP-1</text><text x="236" y="50">87%</text>' +
      rings + '<path class="ring" d="M150 110 V330 M40 220 H260"/><text x="146" y="118">N</text>' +
      '<g class="sg" data-from="1"><circle cx="150" cy="220" r="5" fill="#eaf0ff"/><circle cx="150" cy="220" r="12" fill="none" stroke="#eaf0ff" class="blink"/></g>' +
      '<g class="sg" data-from="2" data-to="3"><g class="sweep"><path d="M150 220 L150 120 A100 100 0 0 1 187 127Z" fill="#1cc8b4" opacity=".3"/></g></g>' +
      tw("A", true) + tw("B") + tw("C") +
      '<g class="sg" data-from="4">' + rows + '</g>' +
      '<g class="sg" data-from="5"><path class="dash" d="M150 220 L203.5 160.6" style="stroke:#ff7a1a"/><text x="206" y="150" style="fill:#ff7a1a">042 deg</text></g>' +
      '<g class="sg" data-from="6"><g id="needle"><path d="M150 220 V128" stroke="#eaf0ff" stroke-width="3" stroke-linecap="round"/><path d="M144 134 L150 120 L156 134Z" fill="#eaf0ff"/></g></g>' +
      '<g class="sg" data-from="7"><circle cx="203.5" cy="160.6" r="15" fill="none" stroke="#5be28a" stroke-width="3"/><rect class="lock" x="104" y="294" width="92" height="22" rx="11"/><text class="lockt" x="116" y="309">LOCKED</text></g>' +
      '<text id="status" x="34" y="342">Fixing position</text>' +
      '<rect x="110" y="482" width="80" height="6" rx="3" fill="#1a3263"/></svg>';
  },
  icon: function (n) {
    var d = {
      sweep: '<circle cx="27" cy="27" r="19"/><path d="M27 27 L27 8 M27 27 L40 40"/><path d="M8 27 A19 19 0 0 1 14 14" stroke-dasharray="3 5"/>',
      wrong: '<path d="M27 6 L16 48 M27 6 L38 48 M19 30 H35 M17 40 H37"/><path d="M38 8 L50 20 M50 8 L38 20" style="stroke:var(--bad)"/>',
      repeat: '<path d="M44 20 A18 18 0 0 0 12 18 M10 34 A18 18 0 0 0 42 36"/><path d="M12 8 V18 H22 M42 46 V36 H32"/>',
      log: '<rect x="12" y="8" width="30" height="38" rx="4"/><path d="M19 18 H35 M19 26 H35 M19 34 H28"/>'
    }[n];
    return '<svg class="ico" viewBox="0 0 54 54" aria-hidden="true">' + d + '</svg>';
  }
};
