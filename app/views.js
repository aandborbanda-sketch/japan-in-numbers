// Page renderers for Japan in Numbers. Every value is escaped before it goes in.
import { YEARS, POPULATION, GDP_NOMINAL, GDP_REAL_GROWTH, UNEMPLOYMENT, CPI, AGE_GROUPS, PYRAMID, PREFECTURES, TRADE_2024, SECTORS, HEALTH, PISA_2022, EDUCATION, ENVIRONMENT, KEY_FINDINGS, SOURCES } from './data.js';
import { lineChart, barChart, donut, pyramid, hbarRows, NAVY, TEAL, AMBER } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const at = (arr, y) => arr.find((d) => d.y === y);
const fmt = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

// The "reading the numbers" block: every chart page pairs its figures with a
// short commentary, so a visitor leaves knowing what the data means, not just
// what it says. Items are {h: headline, p: text}; every number in them comes
// from the same tables the page charts.
export function insightBox(items) {
  return `<section class="insight"><span class="kicker">Reading the numbers</span><div class="insight-cols">${items.map((i) => `<div class="insight-item"><h3>${esc(i.h)}</h3><p>${i.p}</p></div>`).join('')}</div></section>`;
}

export function kpiCards(year) {
  const pop = at(POPULATION, year), gdp = at(GDP_NOMINAL, year);
  const un = at(UNEMPLOYMENT, year), cpi = at(CPI, year);
  const prev = at(POPULATION, year - 1);
  const dPop = prev ? ((pop.v - prev.v) / prev.v * 100) : 0;
  return `<section class="kpis" aria-label="Key figures for ${year}">
    <div class="kpi"><span class="kpi-label">Population</span><span class="kpi-value">${fmt(pop.v)} m</span><span class="kpi-sub">${dPop.toFixed(2)}% vs ${year - 1} · 1 Oct estimate</span></div>
    <div class="kpi"><span class="kpi-label">GDP (nominal)</span><span class="kpi-value">$${fmt(gdp.v)} tn</span><span class="kpi-sub">Real growth ${at(GDP_REAL_GROWTH, year).v > 0 ? '+' : ''}${at(GDP_REAL_GROWTH, year).v.toFixed(1)}% in ${year}</span></div>
    <div class="kpi"><span class="kpi-label">Unemployment</span><span class="kpi-value">${un.v.toFixed(1)}%</span><span class="kpi-sub">Labour Force Survey, ${year}</span></div>
    <div class="kpi"><span class="kpi-label">Consumer prices</span><span class="kpi-value">${cpi.v > 0 ? '+' : ''}${cpi.v.toFixed(1)}%</span><span class="kpi-sub">Year on year, ${year}</span></div>
    <div class="kpi"><span class="kpi-label">Aged 65+</span><span class="kpi-value">29.3%</span><span class="kpi-sub">36.3 m people, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Life expectancy</span><span class="kpi-value">84.0 yrs</span><span class="kpi-sub">2023 · men 81.1, women 87.1</span></div>
  </section>`;
}

export function yearPicker(year) {
  const opts = POPULATION.map((d) => `<option value="${d.y}"${d.y === year ? ' selected' : ''}>${d.y}</option>`).join('');
  return `<label class="year-pick">Year <select id="yearSelect" aria-label="Choose year">${opts}</select></label>`;
}

export function overview(s) {
  const top = [...PREFECTURES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const rows = top.map((p, i) => `<tr><td>${i + 1}</td><td><a href="#/regions?pref=${encodeURIComponent(p.name)}">${esc(p.name)}</a></td><td class="num">${fmt(p.pop)}</td><td class="num">${Math.round(p.pop / p.area * 1000).toLocaleString()}</td></tr>`).join('');
  return `<section class="hero"><span class="kicker">National statistics atlas · 2024 edition</span><h1>Japan in Numbers</h1>
  <p class="lede">A national statistics atlas for Japan — population, economy, health, education and all 47 prefectures, from official sources, in one place. Every figure is labelled with its year and source.</p>
  <div class="hero-ctrl">${yearPicker(s.year)}<span class="hint">Pick a year — the cards and charts follow it.</span></div></section>
  ${kpiCards(s.year)}
  ${insightBox([
    { h: 'A peak now 14 years past', p: 'Population topped out at 128.06 million in 2010 and has fallen every year since — 123.97 million in 2024. The atlas opens with that single fact because almost every other number in it bends around it.' },
    { h: 'The dollar illusion', p: 'GDP in dollars shrank after 2021, but that is the yen, not output: measured in yen, GDP grew from ¥551 trillion in 2020 to ¥609 trillion in 2024. Always ask which currency a headline uses.' },
    { h: 'Oldest — and longest-lived', p: '29.3% of the population is 65 or older, the highest share of any large country, yet life expectancy is also the world\u2019s highest at 84.0 years. Ageing and longevity are the same story told twice.' },
  ])}
  <section class="grid2">
    <article class="card"><h2>Population, 2015–2024</h2><p class="card-sub">Millions, 1 October each year. The highlighted dot is ${s.year}.</p>
      ${s.chartType === 'bars' ? barChart(POPULATION, { label: 'Population by year', highlightYear: s.year, color: NAVY }) : lineChart(POPULATION, { label: 'Population by year', highlightYear: s.year, decimals: 1 })}
      <div class="seg" role="group" aria-label="Chart type"><button data-action="chart-type" data-v="line" class="${s.chartType !== 'bars' ? 'on' : ''}">Line</button><button data-action="chart-type" data-v="bars" class="${s.chartType === 'bars' ? 'on' : ''}">Bars</button></div>
      <p class="note">Peak population was 128.06 m in 2010. The 2021 dip partly reflects the 2020 census revision.</p></article>
    <article class="card"><h2>GDP, 2015–2024</h2><p class="card-sub">Nominal GDP, US$ trillion (IMF). Dollar figures fall after 2021 mainly because the yen weakened.</p>
      ${barChart(GDP_NOMINAL, { label: 'Nominal GDP by year', fmt: 'usd', highlightYear: s.year })}
      <p class="note">In yen, GDP kept growing: ¥551 tn (2020) → ¥609 tn (2024). Real growth in 2024 was −0.1%.</p></article>
  </section>
  <section class="grid2">
    <article class="card"><h2>Who lives here? Age structure, 2024</h2>
      ${donut(AGE_GROUPS.map((g) => ({ label: `Aged ${g.label}`, value: g.pct, millions: g.value })))}
      <p class="note">Japan has the world's oldest population: 29.3% are 65 or older, against 11.2% under 15.</p></article>
    <article class="card"><h2>Largest prefectures</h2><p class="card-sub">Population in millions and density per km², 2024.</p>
      <table class="tbl"><thead><tr><th>#</th><th>Prefecture</th><th class="num">Pop. (m)</th><th class="num">Density</th></tr></thead><tbody>${rows}</tbody></table>
      <p><a class="btn" href="#/regions">See all 47 prefectures →</a></p></article>
  </section>
  <section class="card"><h2>Six things the numbers say</h2><div class="findings">${KEY_FINDINGS.map((f) => `<div class="finding"><h3>${esc(f.k)}</h3><p>${esc(f.v)}</p></div>`).join('')}</div></section>
  <p class="src-line">Sources: Statistics Bureau of Japan · Cabinet Office · IMF World Economic Outlook · OECD. <a href="#/sources">Full source list →</a></p>`;
}

export function populationPage(s) {
  const rows = POPULATION.map((d) => { const g = at(GDP_REAL_GROWTH, d.y); return `<tr><td>${d.y}</td><td class="num">${fmt(d.v)}</td><td class="num">${d.y > 2015 ? (((d.v - at(POPULATION, d.y - 1).v) / at(POPULATION, d.y - 1).v) * 100).toFixed(2) + '%' : '—'}</td></tr>`; }).join('');
  return `<span class="kicker">People</span><h1>Population</h1><p class="lede">123.97 million people on 1 October 2024 — down 3.12 million since 2015. Births (720,000 in 2024) are far below deaths (1.62 million), so the population falls by roughly 900,000 a year.</p>
  <section class="grid2">
    <article class="card"><h2>Population trend, 2015–2024</h2>${lineChart(POPULATION, { label: 'Population trend', highlightYear: s.year, decimals: 1 })}<p class="note">The decline accelerated after 2020: −0.5% a year in 2021–2024, against −0.2% in 2015–2019.</p></article>
    <article class="card"><h2>Age pyramid, 2024</h2><p class="card-sub">Millions in each 5-year band. The bulge at 70–74 is the first baby-boom generation.</p>${pyramid(PYRAMID)}</article>
  </section>
  <section class="grid2">
    <article class="card"><h2>Age groups, 2024</h2>${hbarRows(AGE_GROUPS.map((g) => ({ label: `Aged ${g.label}`, value: g.pct, display: `${g.pct}% · ${g.value} m`, color: g.label === '65+' ? AMBER : TEAL })), { max: 100 })}<p class="note">Working-age people (15–64) support a growing retired population: 1.9 workers per person aged 65+ in 2024, down from 2.3 in 2015.</p></article>
    <article class="card"><h2>Year by year</h2><table class="tbl"><thead><tr><th>Year</th><th class="num">Population (m)</th><th class="num">Change</th></tr></thead><tbody>${rows}</tbody></table></article>
  </section>
  ${insightBox([
    { h: 'Deaths outnumber births 2 to 1', p: 'In 2024 about 720,000 babies were born and 1.62 million people died. No plausible rise in births closes a gap that wide quickly — which is why the decline steepened to about −0.5% a year after 2020.' },
    { h: 'Fewer supporters per retiree', p: 'There were 2.3 working-age people for every person aged 65+ in 2015; by 2024 there were 1.9. Pensions, care and the tax base all key off this one ratio.' },
    { h: 'The bulge moves up the pyramid', p: 'The wide band at ages 70–74 is the first baby-boom generation, born 1947–49. Watch it reach 75–79 by 2029: demand for care rises fastest exactly there.' },
  ])}
  <p><a class="btn" href="#/regions">Where people live — the 47 prefectures →</a></p>`;
}

export function economyPage(s) {
  const tab = s.tab || 'gdp';
  const tabs = [['gdp', 'GDP'], ['jobs', 'Jobs'], ['prices', 'Prices'], ['trade', 'Trade']].map(([id, label]) => `<button data-action="tab" data-v="${id}" class="${tab === id ? 'on' : ''}">${label}</button>`).join('');
  let body = '';
  if (tab === 'gdp') body = `<h2>Gross domestic product</h2><p>Nominal GDP was $4.03 trillion in 2024 (IMF), the world's 4th largest economy. Real growth: −0.1% in 2024 after +1.7% in 2023.</p>${barChart(GDP_NOMINAL, { label: 'Nominal GDP', fmt: 'usd', highlightYear: s.year })}<h3>Real growth, % year on year</h3>${barChart(GDP_REAL_GROWTH, { label: 'Real GDP growth', fmt: 'pct', min: -5 })}<h3>What the economy makes</h3>${hbarRows(SECTORS.map((x) => ({ label: x.label, value: x.value, display: x.value + '%' })), { max: 100 })}<p class="note">Services dominate. Manufacturing — cars, electronics, machinery — is about a fifth of output and most of exports.</p>`;
  if (tab === 'jobs') body = `<h2>Jobs</h2><p>Unemployment was 2.5% in 2024. The labour force is about 69 million; the employment rate for ages 15–64 is about 80%.</p>${lineChart(UNEMPLOYMENT, { label: 'Unemployment rate', fmt: 'pct', highlightYear: s.year })}<table class="tbl"><thead><tr><th>Year</th><th class="num">Unemployment</th><th class="num">Real GDP growth</th></tr></thead><tbody>${YEARS.map((y) => `<tr><td>${y}</td><td class="num">${at(UNEMPLOYMENT, y).v.toFixed(1)}%</td><td class="num">${at(GDP_REAL_GROWTH, y).v > 0 ? '+' : ''}${at(GDP_REAL_GROWTH, y).v.toFixed(1)}%</td></tr>`).join('')}</tbody></table><p class="note">Unemployment barely moved during the pandemic — job-retention subsidies kept workers on payrolls — then settled near 2.5%.</p>`;
  if (tab === 'prices') body = `<h2>Prices</h2><p>Consumer prices rose 2.7% in 2024, after 3.3% in 2023 — the fastest inflation in four decades, driven by food and energy. Before 2022, prices had been near flat for 25 years.</p>${barChart(CPI, { label: 'Consumer price inflation', fmt: 'pct', min: -1 })}<p class="note">The Bank of Japan ended negative interest rates in March 2024, its first rate rise in 17 years.</p>`;
  if (tab === 'trade') body = `<h2>Trade, 2024</h2><p>Exports ¥${TRADE_2024.exports} trillion, imports ¥${TRADE_2024.imports} trillion — a deficit of ¥${Math.abs(TRADE_2024.balance)} trillion, the fourth straight yearly deficit, as a weak yen raised import costs.</p>${hbarRows([{ label: 'Exports', value: TRADE_2024.exports, display: '¥107.9 tn', color: TEAL }, { label: 'Imports', value: TRADE_2024.imports, display: '¥113.6 tn', color: NAVY }], { max: 120 })}<h3>Main trading partners</h3><table class="tbl"><thead><tr><th>Partner</th><th class="num">Share of exports</th></tr></thead><tbody><tr><td>China</td><td class="num">17.6%</td></tr><tr><td>United States</td><td class="num">20.0%</td></tr><tr><td>South Korea</td><td class="num">7.1%</td></tr><tr><td>Taiwan</td><td class="num">6.0%</td></tr><tr><td>Hong Kong</td><td class="num">4.6%</td></tr></tbody></table><p class="note">Cars are the top export (about ¥18 tn), followed by machinery, electronics and steel.</p>`;
  return `<span class="kicker">Money &amp; work</span><h1>Economy</h1><p class="lede">The world's 4th-largest economy: $4.03 trillion of GDP in 2024, near-full employment, and inflation back after a 25-year absence.</p>
  <div class="hero-ctrl">${yearPicker(s.year)}</div>${kpiCards(s.year)}
  <div class="seg tabs" role="tablist" aria-label="Economy sections">${tabs}</div>
  <article class="card">${body}</article>
  ${insightBox([
    { h: 'Read GDP in yen first', p: 'The economy looks like it shrank in dollars after 2021 and grew in yen over the same years. Both are true; only the yen series describes what people in Japan actually produced and earned.' },
    { h: 'Jobs that bend, not break', p: 'Unemployment stayed between 2.4% and 3.1% through a pandemic and an inflation shock — firms hoard labour in a shrinking workforce, so downturns show up as shorter hours, not job losses.' },
    { h: 'A regime change in prices', p: 'After 25 years near zero, inflation hit 3.3% in 2023 and the Bank of Japan ended negative rates in March 2024. Anyone under 40 is meeting sustained inflation for the first time.' },
  ])}`;
}

export function healthPage() {
  return `<span class="kicker">Body &amp; care</span><h1>Health</h1><p class="lede">Japan lives longer than any other large country — 84.0 years at birth in 2023 — under universal health coverage in place since 1961.</p>
  <section class="grid2">${HEALTH.map((h) => `<article class="card stat"><h3>${esc(h.label)}</h3><p class="big">${esc(h.value)}</p><p class="note">${esc(h.year)} · ${esc(h.note)}</p></article>`).join('')}</section>
  <article class="card"><h2>Life expectancy over time</h2><p>Life expectancy rose from 68.4 years in 1960 to 84.0 in 2023 — a gain of more than 15 years in two generations.</p>${hbarRows([{ label: '1960', value: 68.4, display: '68.4 yrs' }, { label: '1980', value: 76.1, display: '76.1 yrs' }, { label: '2000', value: 81.1, display: '81.1 yrs' }, { label: '2023', value: 84.0, display: '84.0 yrs' }], { max: 90 })}<p class="note">Women live longest: 87.1 years in 2023, against 81.1 for men — a gap of six years.</p></article>
  ${insightBox([
    { h: '15 years in two generations', p: 'A child born in 1960 could expect 68.4 years; a child born in 2023 can expect 84.0. Most of that gain came before 2000 — recent progress is slower, and the easy wins are gone.' },
    { h: 'A six-year gap', p: 'Women outlive men by six years (87.1 vs 81.1), so the oldest old are mostly women living alone — a fact that shapes housing, care and pension design more than any headline average.' },
    { h: 'Coverage since 1961', p: 'Universal health insurance has been in place since 1961, with free choice of doctor and fees set nationally. Long lives are built on boring systems that everyone can use.' },
  ])}`;
}

export function educationPage() {
  return `<span class="kicker">Learning</span><h1>Education</h1><p class="lede">Nearly everyone finishes high school, 62% of young adults hold a tertiary qualification, and 15-year-olds score well above the OECD average in maths, reading and science.</p>
  <section class="grid2">${EDUCATION.map((e) => `<article class="card stat"><h3>${esc(e.label)}</h3><p class="big">${esc(e.value)}</p><p class="note">${esc(e.year)} · ${esc(e.note)}</p></article>`).join('')}</section>
  <article class="card"><h2>PISA 2022 — Japan vs OECD average</h2><p class="card-sub">Mean scores, 15-year-olds. Japan ranked in the top 5 in all three subjects.</p>${hbarRows(PISA_2022.flatMap((p) => [{ label: `${p.subject} — Japan`, value: p.japan, display: String(p.japan), color: NAVY }, { label: `${p.subject} — OECD avg`, value: p.oecd, display: String(p.oecd), color: '#b6c2cf' }]), { max: 600 })}<p class="note">Japan's maths lead over the OECD average is 64 points — roughly two school years of learning.</p></article>
  ${insightBox([
    { h: 'Two school years ahead in maths', p: 'A 64-point PISA lead is not a rounding difference: on the OECD\u2019s own yardstick it is roughly two extra years of schooling by age 15 — while spending per student sits near the OECD average.' },
    { h: 'Strong everywhere, not just at the top', p: 'Japan ranks in the top 5 in maths, reading and science alike, and its spread between strongest and weakest students is among the OECD\u2019s narrowest. The system\u2019s signature is a high floor, not just a high ceiling.' },
    { h: 'Qualifications are the norm', p: 'With 62% of young adults holding a tertiary qualification, the labour-market question in Japan is rarely whether someone studied — it is what, and where.' },
  ])}`;
}

export function regionsPage(s) {
  const q = (s.query || '').toLowerCase();
  let list = PREFECTURES.filter((p) => !q || p.name.toLowerCase().includes(q));
  const key = s.sortKey || 'pop';
  list = [...list].sort((a, b) => {
    const av = key === 'name' ? a.name : key === 'density' ? a.pop / a.area * 1000 : a[key];
    const bv = key === 'name' ? b.name : key === 'density' ? b.pop / b.area * 1000 : b[key];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return (s.sortDir === 'asc' ? 1 : -1) * c;
  });
  const rows = list.map((p, i) => `<tr data-pref="${esc(p.name)}"><td>${i + 1}</td><td><button class="linklike" data-action="pref-detail" data-v="${esc(p.name)}">${esc(p.name)}</button></td><td class="num">${fmt(p.pop)}</td><td class="num">${p.area.toLocaleString()}</td><td class="num">${Math.round(p.pop / p.area * 1000).toLocaleString()}</td><td class="num">${(p.pop / 123.97 * 100).toFixed(1)}%</td></tr>`).join('');
  const detail = s.detail ? (() => { const p = PREFECTURES.find((x) => x.name === s.detail); if (!p) return ''; return `<article class="card detail"><h2>${esc(p.name)}</h2><p><b>Population:</b> ${fmt(p.pop)} million (${(p.pop / 123.97 * 100).toFixed(1)}% of Japan) · <b>Area:</b> ${p.area.toLocaleString()} km² · <b>Density:</b> ${Math.round(p.pop / p.area * 1000).toLocaleString()} per km²</p><p class="note">Click any prefecture name in the table to see its figures here.</p></article>`; })() : '';
  const cmp = (a, b) => { const pa = PREFECTURES.find((x) => x.name === a), pb = PREFECTURES.find((x) => x.name === b); if (!pa || !pb) return ''; return `<article class="card"><h2>Compare: ${esc(pa.name)} vs ${esc(pb.name)}</h2>${hbarRows([{ label: pa.name + ' population', value: pa.pop, display: fmt(pa.pop) + ' m', color: NAVY }, { label: pb.name + ' population', value: pb.pop, display: fmt(pb.pop) + ' m', color: TEAL }, { label: pa.name + ' density', value: pa.pop / pa.area * 1000, display: Math.round(pa.pop / pa.area * 1000).toLocaleString() + '/km²', color: NAVY }, { label: pb.name + ' density', value: pb.pop / pb.area * 1000, display: Math.round(pb.pop / pb.area * 1000).toLocaleString() + '/km²', color: TEAL }], { max: Math.max(pa.pop, pb.pop, pa.pop / pa.area * 1000, pb.pop / pb.area * 1000) })}</article>`; };
  const opts = PREFECTURES.map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('');
  const tokyo = PREFECTURES.find((p) => p.name === 'Tokyo'), hokkaido = PREFECTURES.find((p) => p.name === 'Hokkaido');
  const totalArea = PREFECTURES.reduce((a, p) => a + p.area, 0);
  const dens = (p) => Math.round(p.pop / p.area * 1000).toLocaleString();
  return `<span class="kicker">Where people live</span><h1>Regions — all 47 prefectures</h1><p class="lede">Tokyo alone holds 14.18 million people — more than the 10 smallest prefectures combined. Search, sort, or click a name for its figures.</p>
  ${insightBox([
    { h: 'Two extremes, one country', p: `Tokyo packs about ${dens(tokyo)} people into each km²; Hokkaido fits about ${dens(hokkaido)}. The same national policies land very differently at those two densities — transport, care and housing all change character.` },
    { h: 'A fifth of the land, a twenty-fifth of the people', p: `Hokkaido is ${(hokkaido.area / totalArea * 100).toFixed(0)}% of Japan\u2019s land area but only ${(hokkaido.pop / 123.97 * 100).toFixed(1)}% of its people. Averages for "Japan" mostly describe the crowded Pacific belt, not the whole map.` },
    { h: 'One in nine lives in Tokyo', p: 'Tokyo\u2019s 14.18 million is 11.4% of the nation, and the three big metro areas hold roughly half of everyone. Regional decline and metro congestion are, again, the same flow seen from two ends.' },
  ])}
  <div class="controls"><label>Search <input id="regionSearch" type="search" placeholder="Type a prefecture…" value="${esc(s.query || '')}" aria-label="Search prefectures"></label>
  <label>Sort by <select id="sortSelect"><option value="pop"${key === 'pop' ? ' selected' : ''}>Population (high → low)</option><option value="density"${key === 'density' ? ' selected' : ''}>Density (high → low)</option><option value="area"${key === 'area' ? ' selected' : ''}>Area (large → small)</option><option value="name"${key === 'name' ? ' selected' : ''}>Name (A → Z)</option></select></label></div>
  ${detail}
  <article class="card"><table class="tbl"><thead><tr><th>#</th><th>Prefecture</th><th class="num">Pop. (m)</th><th class="num">Area (km²)</th><th class="num">Density /km²</th><th class="num">Share</th></tr></thead><tbody>${rows || '<tr><td colspan="6">No prefecture matches that search.</td></tr>'}</tbody></table><p class="note">${list.length} of 47 prefectures shown · Population 2024 approx., area from the Geospatial Information Authority.</p></article>
  <section class="card"><h2>Compare two prefectures</h2><div class="controls"><label>First <select id="cmpA">${PREFECTURES.map((p) => `<option${p.name === (s.cmpA || 'Tokyo') ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label><label>Second <select id="cmpB">${PREFECTURES.map((p) => `<option${p.name === (s.cmpB || 'Hokkaido') ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label></div>${cmp(s.cmpA || 'Tokyo', s.cmpB || 'Hokkaido')}</section>
  <section class="card"><h2>Environment</h2><div class="grid2">${ENVIRONMENT.map((e) => `<div class="statline"><h3>${esc(e.label)}</h3><p class="big">${esc(e.value)}</p><p class="note">${esc(e.year)} · ${esc(e.note)}</p></div>`).join('')}</div></section>`;
}

export function sourcesPage() {
  return `<span class="kicker">Trust &amp; method</span><h1>Sources &amp; methods</h1><p class="lede">Every figure on this site comes from an official or international source, is labelled with its reference year, and is rounded for readability. Nothing is fetched from the internet — all data is stored in the site's own files.</p>
  <article class="card"><table class="tbl"><thead><tr><th>Source</th><th>Used for</th></tr></thead><tbody>${SOURCES.map((x) => `<tr><td>${esc(x.name)}</td><td>${esc(x.what)}</td></tr>`).join('')}</tbody></table></article>
  <article class="card"><h2>Notes on the figures</h2><ul class="notes"><li>Population figures are 1 October estimates; 2020 is the census count.</li><li>Prefecture populations are rounded to the nearest 10,000 and marked approximate; shares use the 2024 national total of 123.97 million.</li><li>Dollar GDP moves with the yen: the 2022–2024 fall in dollar terms is mostly exchange-rate, not output — real GDP in yen kept growing.</li><li>Age-pyramid bands are rounded estimates that sum to the 2024 total.</li><li>Environment figures are the latest available year for each indicator.</li></ul></article>
  <article class="card"><h2>About this site</h2><p>Japan in Numbers is an independent statistics atlas built for exploring one country's numbers. It is not affiliated with the Statistics Bureau of Japan or any government body. Figures were compiled in November 2026; the next update follows the release of the 2025 population estimates.</p></article>`;
}

export function missingPage() {
  return `<h1>Not found</h1><p>There is no page at this address. Try the <a href="#/">overview</a>, <a href="#/population">population</a>, <a href="#/economy">economy</a>, <a href="#/health">health</a>, <a href="#/education">education</a> or <a href="#/regions">regions</a> pages.</p>`;
}
