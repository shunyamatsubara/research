/* LNG chain diagram: one cargo's path from gas field to buyer, with the money flowing back.
   Shared by every lesson and reference page.

   Markup:
     <figure class="wide">
       <div class="lng-chain" data-label="What the picture shows, for screen readers"
            data-channels="on" data-mark="ship"></div>
       <figcaption>…</figcaption>
     </figure>

   Options (data attributes on .lng-chain):
     data-channels="on"   tag each stop with the impact channels that hit it
     data-mark="a,b"      ring these stops in amber (a lesson is discussing an event there);
                          stop keys: gas, plant, ship, terminal, buyer
   Layout: left to right when the box is at least 720px wide, top to bottom otherwise.
   Colors and fonts come from assets/course.css (.chain-* classes), so both themes work. */
(() => {
  "use strict";

  const STOPS = [
    { key: "gas", title: "Gas field", sub: "US or Canada", money: "− gas cost", channels: ["PRICE", "VOLUME"] },
    { key: "plant", title: "LNG plant", sub: "cools gas to −162 °C", money: "− plant fee", channels: ["VOLUME"] },
    { key: "ship", title: "LNG ship", sub: "one cargo", money: "− ship cost", channels: ["SHIPPING"] },
    { key: "terminal", title: "Import terminal", sub: "warms LNG to gas", money: "", channels: [] },
    { key: "buyer", title: "Buyer", sub: "power, city gas", money: "+ sale price", channels: ["PRICE", "VOLUME", "CREDIT"] },
  ];
  const LINKS = ["pipe", "load", "voyage", "pipe"];
  const ZONE_FROM = 2; // DGE's zone starts at the ship (after the plant loads the cargo)
  const ZONE_LABEL_LONG = "DGE’S ZONE · sells MC’s share of the LNG, plans cargoes, trades";
  const ZONE_LABEL_SHORT = "DGE’S ZONE";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const text = (x, y, cls, s, anchor) =>
    `<text x="${x}" y="${y}" class="${cls}"${anchor ? ` text-anchor="${anchor}"` : ""}>${esc(s)}</text>`;
  const tagWidth = (s) => Math.round(s.length * 6.4 + 10);

  // A row of channel tags, laid out from x (start, or end when alignEnd is true).
  function tags(list, x, y, alignEnd) {
    const total = list.reduce((w, s) => w + tagWidth(s), 0) + Math.max(0, list.length - 1) * 4;
    let cx = alignEnd ? x - total : x;
    return list.map((s) => {
      const w = tagWidth(s);
      const out = `<g class="chain-tag"><rect x="${cx}" y="${y}" width="${w}" height="15" rx="2"/>` +
        text(cx + w / 2, y + 11, "chain-tag-text", s, "middle") + `</g>`;
      cx += w + 4;
      return out;
    }).join("");
  }

  function node(stop, x, y, w, hgt, marked) {
    const cx = x + w / 2;
    let out = `<rect class="chain-node${marked ? " is-marked" : ""}" x="${x}" y="${y}" width="${w}" height="${hgt}" rx="3"/>` +
      text(cx, y + 27, "chain-title", stop.title, "middle") +
      text(cx, y + 46, "chain-sub", stop.sub, "middle");
    if (marked) {
      out += `<circle class="chain-alert" cx="${x + w - 2}" cy="${y + 2}" r="9"/>` +
        text(x + w - 2, y + 6.5, "chain-alert-text", "!", "middle");
    }
    return out;
  }

  const arrowHead = (x, y, dir) => {
    const p = { right: [[0, 0], [-8, -4.5], [-8, 4.5]], left: [[0, 0], [8, -4.5], [8, 4.5]],
      down: [[0, 0], [-4.5, -8], [4.5, -8]], up: [[0, 0], [-4.5, 8], [4.5, 8]] }[dir];
    return `<polygon class="chain-head" points="${p.map(([dx, dy]) => `${x + dx},${y + dy}`).join(" ")}"/>`;
  };

  function horizontal(opts) {
    const W = 1000, M = 12, w = 148, hgt = 64, gap = (W - 2 * M - 5 * w) / 4;
    const top = opts.channels ? 70 : 70;
    const tagsY = top + hgt + 12;
    const moneyY = opts.channels ? tagsY + 3 * 19 + 26 : top + hgt + 46;
    const H = moneyY + 40;
    const xs = STOPS.map((_, i) => M + i * (w + gap));
    let svg = "";
    // DGE's zone
    const zx = xs[ZONE_FROM] - gap / 2 + 6;
    svg += `<rect class="chain-zone" x="${zx}" y="34" width="${W - M / 2 - zx}" height="${(opts.channels ? tagsY + 3 * 19 : top + hgt) + 14 - 34}" rx="4"/>`;
    svg += text(zx + 12, 53, "chain-zone-label", ZONE_LABEL_LONG);
    svg += text(M, 53, "chain-row-label", "LNG FLOWS →");
    STOPS.forEach((stop, i) => {
      svg += node(stop, xs[i], top, w, hgt, opts.mark.has(stop.key));
      if (opts.channels && stop.channels.length) {
        stop.channels.forEach((c, ci) => { svg += tags([c], xs[i] + w / 2 - tagWidth(c) / 2, tagsY + ci * 19, false); });
      }
    });
    LINKS.forEach((verb, i) => {
      const x1 = xs[i] + w + 4, x2 = xs[i + 1] - 4, y = top + hgt / 2;
      svg += `<line class="chain-line" x1="${x1}" y1="${y}" x2="${x2 - 7}" y2="${y}"/>` + arrowHead(x2, y, "right");
      svg += text((x1 + x2) / 2, y - 8, "chain-verb", verb, "middle");
    });
    // Money flows back: in at the buyer, out at the ship, plant and gas field
    const mx1 = xs[4] + w / 2, mx2 = xs[0] + 10;
    svg += text(M, moneyY - 10, "chain-row-label", "← MONEY FLOWS BACK");
    svg += `<line class="chain-money-line" x1="${mx1}" y1="${moneyY}" x2="${mx2 + 7}" y2="${moneyY}"/>` + arrowHead(mx2, moneyY, "left");
    STOPS.forEach((stop, i) => {
      if (!stop.money) return;
      const cx = xs[i] + w / 2;
      svg += `<line class="chain-tick" x1="${cx}" y1="${moneyY - 5}" x2="${cx}" y2="${moneyY + 5}"/>`;
      svg += text(cx, moneyY + 22, stop.money.startsWith("+") ? "chain-money in" : "chain-money", stop.money, "middle");
    });
    return { W, H, svg };
  }

  function vertical(opts) {
    const W = 360, M = 12, w = 184, hgt = 60, step = 124, top = 48;
    const ys = STOPS.map((_, i) => top + i * step);
    const H = ys[4] + hgt + (opts.channels ? 52 : 34);
    const cx = M + w / 2;
    let svg = "";
    const zy = ys[ZONE_FROM] - 26;
    svg += `<rect class="chain-zone" x="4" y="${zy}" width="${W - 8}" height="${H - 8 - zy}" rx="4"/>`;
    svg += text(M + 4, zy + 16, "chain-zone-label", ZONE_LABEL_SHORT);
    svg += text(M, 26, "chain-row-label", "LNG FLOWS ↓");
    svg += text(W - 10, 26, "chain-row-label", "MONEY ↑", "end");
    STOPS.forEach((stop, i) => {
      svg += node(stop, M, ys[i], w, hgt, opts.mark.has(stop.key));
      const ty = ys[i] + 26;
      if (stop.money) {
        svg += text(W - 30, ty, stop.money.startsWith("+") ? "chain-money in" : "chain-money", stop.money, "end");
      }
      // Tags stack one per line in the right-hand column, so they never reach the stop's box
      if (opts.channels) stop.channels.forEach((c, ci) => { svg += tags([c], W - 30, ty + 8 + ci * 19, true); });
    });
    LINKS.forEach((verb, i) => {
      const y1 = ys[i] + hgt + 4, y2 = ys[i + 1] - 4;
      svg += `<line class="chain-line" x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2 - 7}"/>` + arrowHead(cx, y2, "down");
      svg += text(cx + 10, y1 + 18, "chain-verb", verb);
    });
    const mx = W - 16;
    svg += `<line class="chain-money-line" x1="${mx}" y1="${ys[4] + 22}" x2="${mx}" y2="${ys[0] + 20 + 7}"/>` + arrowHead(mx, ys[0] + 20, "up");
    return { W, H, svg };
  }

  function render(box) {
    const opts = {
      channels: box.dataset.channels === "on",
      mark: new Set((box.dataset.mark || "").split(",").map((s) => s.trim()).filter(Boolean)),
    };
    const wide = box.clientWidth >= 720;
    if (box.dataset.layout === (wide ? "h" : "v")) return;
    box.dataset.layout = wide ? "h" : "v";
    box.classList.toggle("is-vertical", !wide);
    const { W, H, svg } = wide ? horizontal(opts) : vertical(opts);
    const label = box.dataset.label || "Diagram of the LNG chain";
    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${svg}</svg>`;
  }

  function start() {
    const boxes = document.querySelectorAll(".lng-chain");
    boxes.forEach(render);
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver((entries) => entries.forEach((e) => render(e.target)));
      boxes.forEach((b) => ro.observe(b));
    } else {
      window.addEventListener("resize", () => boxes.forEach(render));
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
