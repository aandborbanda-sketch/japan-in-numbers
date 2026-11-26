// Small SVG chart helpers. No libraries, no network — pure strings.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const NAVY = '#12355b', TEAL = '#0e7c7b', AMBER = '#d98e04', ROSE = '#c0392b', GREY = '#8a97a5';

export function lineChart(series, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260, pad = { l: 48, r: 14, t: 14, b: 28 };
  const vals = series.map((d) => d.v);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (opts.min !== undefined) min = opts.min;
  if (opts.max !== undefined) max = opts.max;
  const span = (max - min) || 1;
  const x = (i) => pad.l + (i * (w - pad.l - pad.r)) / (series.length - 1);
  const y = (v) => pad.t + (1 - (v - min) / span) * (h - pad.t - pad.b);
  const pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(' ');
  const grid = [0, 0.5, 1].map((f) => {
    const gv = min + span * f, gy = y(gv);
    return `<line x1="${pad.l}" y1="${gy}" x2="${w - pad.r}" y2="${gy}" stroke="#e3e8ee"/><text x="${pad.l - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#667">${fmtVal(gv, opts)}</text>`;
  }).join('');
  const labels = series.map((d, i) => (i % 2 === 0 || i === series.length - 1)
    ? `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#667">${d.y}</text>` : '').join('');
  const dots = series.map((d, i) => `<circle cx="${x(i)}" cy="${y(d.v)}" r="3.5" fill="${opts.color || TEAL}"><title>${d.y}: ${fmtVal(d.v, opts)}</title></circle>`).join('');
  const hl = opts.highlightYear ? series.findIndex((d) => d.y === opts.highlightYear) : -1;
  const hlMark = hl >= 0 ? `<circle cx="${x(hl)}" cy="${y(series[hl].v)}" r="7" fill="none" stroke="${AMBER}" stroke-width="2.5"/><text x="${x(hl)}" y="${y(series[hl].v) - 14}" text-anchor="middle" font-size="12" font-weight="700" fill="#8a5a00">${fmtVal(series[hl].v, opts)}</text>` : '';
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}">${grid}<polyline points="${pts}" fill="none" stroke="${opts.color || TEAL}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${hlMark}${labels}</svg>`;
}
function fmtVal(v, opts) {
  if (opts.fmt === 'pct') return `${v.toFixed(1)}%`;
  if (opts.fmt === 'usd') return `$${v.toFixed(2)}T`;
  return v.toFixed(opts.decimals ?? 1);
}

export function barChart(series, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260, pad = { l: 48, r: 14, t: 14, b: 28 };
  const vals = series.map((d) => d.v);
  let min = Math.min(0, ...vals), max = Math.max(...vals);
  if (opts.min !== undefined) min = opts.min;
  const span = (max - min) || 1;
  const bw = (w - pad.l - pad.r) / series.length;
  const y = (v) => pad.t + (1 - (v - min) / span) * (h - pad.t - pad.b);
  const zero = y(0);
  const bars = series.map((d, i) => {
    const neg = d.v < 0;
    const by = neg ? zero : y(d.v);
    const bh = Math.abs(y(d.v) - zero);
    const hl = opts.highlightYear === d.y;
    return `<rect x="${(pad.l + i * bw + bw * 0.18).toFixed(1)}" y="${by.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${hl ? AMBER : (neg ? ROSE : (opts.color || NAVY))}"><title>${d.y}: ${fmtVal(d.v, opts)}</title></rect>
    <text x="${(pad.l + i * bw + bw / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#667">${d.y}</text>`;
  }).join('');
  const grid = `<line x1="${pad.l}" y1="${zero}" x2="${w - pad.r}" y2="${zero}" stroke="#94a3b8"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}">${grid}${bars}</svg>`;
}

export function donut(parts, opts = {}) {
  const size = opts.size || 220, cx = size / 2, cy = size / 2, r = size / 2 - 14, th = 34;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let a0 = -Math.PI / 2;
  const arcs = parts.map((p, i) => {
    const frac = p.value / total, a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const col = [TEAL, NAVY, AMBER, ROSE, GREY][i % 5];
    a0 = a1;
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${th}"><title>${esc(p.label)}: ${p.value}%</title></path>`;
  }).join('');
  const legend = parts.map((p, i) => `<span class="lg"><i style="background:${[TEAL, NAVY, AMBER, ROSE, GREY][i % 5]}"></i>${esc(p.label)} — <b>${p.value}%</b> (${p.millions} m)</span>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Age structure donut">${arcs}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${NAVY}">${total === 100 ? '65+' : ''}${''}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="13" fill="#667">29.3% aged 65+</text></svg><div class="legend">${legend}</div></div>`;
}

export function pyramid(rows, opts = {}) {
  const w = 640, rowH = 24, h = rows.length * rowH + 34;
  const max = Math.max(...rows.flatMap((r) => [r.m, r.f]));
  const mid = w / 2, gap = 20, scale = (mid - 46 - gap) / max;
  const body = rows.map((r, i) => {
    const y = 30 + i * rowH;
    const mw = r.m * scale, fw = r.f * scale;
    return `<rect x="${(mid - gap - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="18" rx="2" fill="${NAVY}"><title>${r.band} men: ${r.m} m</title></rect>
    <rect x="${mid + gap}" y="${y}" width="${fw.toFixed(1)}" height="18" rx="2" fill="${TEAL}"><title>${r.band} women: ${r.f} m</title></rect>
    <text x="${mid}" y="${y + 13}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">${r.band}</text>
    <text x="${mid - gap - mw - 5}" y="${y + 13}" text-anchor="end" font-size="10.5" fill="#475569">${r.m.toFixed(1)}</text>
    <text x="${mid + gap + fw + 5}" y="${y + 13}" font-size="10.5" fill="#475569">${r.f.toFixed(1)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid 2024"><text x="${mid - 90}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">Men</text><text x="${mid + 90}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${TEAL}">Women</text>${body}</svg>`;
}

export function hbarRows(rows, opts = {}) {
  // rows: [{label, value, max?, color?}] horizontal bars with value labels
  const max = opts.max || Math.max(...rows.map((r) => r.value));
  return rows.map((r) => {
    const pct = Math.max(2, (r.value / max) * 100);
    return `<div class="hbar"><span class="hbar-label">${esc(r.label)}</span><span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%;background:${r.color || TEAL}"></span></span><span class="hbar-val">${esc(r.display ?? String(r.value))}</span></div>`;
  }).join('');
}
export { NAVY, TEAL, AMBER, ROSE };
