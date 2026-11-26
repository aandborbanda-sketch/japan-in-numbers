// Japan in Numbers — router and interactions. Hash routes, no network.
//   #/                overview        #/health       health
//   #/population      population      #/education    education
//   #/economy         economy         #/regions      prefectures
//   #/sources         sources & methods
// window.__shotReady is false while a page renders and true once it is on screen.
import { overview, populationPage, economyPage, healthPage, educationPage, regionsPage, sourcesPage, missingPage } from './views.js';

const app = document.getElementById('app');
const state = { year: 2024, chartType: 'line', tab: 'gdp', query: '', sortKey: 'pop', sortDir: 'desc', detail: '', cmpA: 'Tokyo', cmpB: 'Hokkaido' };

function route() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, qs] = raw.split('?');
  const params = new URLSearchParams(qs || '');
  return { path: path || '', params };
}

function render() {
  window.__shotReady = false;
  const { path, params } = route();
  if (params.get('pref')) state.detail = params.get('pref');
  let html, title;
  switch (path) {
    case '': html = overview(state); title = 'Japan in Numbers — National Statistics Atlas'; break;
    case 'population': html = populationPage(state); title = 'Population | Japan in Numbers'; break;
    case 'economy': html = economyPage(state); title = 'Economy | Japan in Numbers'; break;
    case 'health': html = healthPage(); title = 'Health | Japan in Numbers'; break;
    case 'education': html = educationPage(); title = 'Education | Japan in Numbers'; break;
    case 'regions': html = regionsPage(state); title = 'Regions — 47 Prefectures | Japan in Numbers'; break;
    case 'sources': html = sourcesPage(); title = 'Sources & Methods | Japan in Numbers'; break;
    default: html = missingPage(); title = 'Not found | Japan in Numbers';
  }
  document.title = title;
  app.innerHTML = html;
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === '#/' + (path || '') || (path === '' && href === '#/'));
  });
  bind();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function bind() {
  const ys = document.getElementById('yearSelect');
  if (ys) ys.addEventListener('change', () => { state.year = Number(ys.value); render(); });
  const rs = document.getElementById('regionSearch');
  if (rs) rs.addEventListener('input', () => { state.query = rs.value; render(); const n = document.getElementById('regionSearch'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } });
  const ss = document.getElementById('sortSelect');
  if (ss) ss.addEventListener('change', () => {
    const v = ss.value;
    if (v === 'name') { state.sortKey = 'name'; state.sortDir = 'asc'; }
    else { state.sortKey = v; state.sortDir = 'desc'; }
    render();
  });
  const ca = document.getElementById('cmpA'), cb = document.getElementById('cmpB');
  if (ca) ca.addEventListener('change', () => { state.cmpA = ca.value; render(); });
  if (cb) cb.addEventListener('change', () => { state.cmpB = cb.value; render(); });
  app.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const a = el.dataset.action, v = el.dataset.v;
      if (a === 'chart-type') { state.chartType = v; render(); }
      if (a === 'tab') { state.tab = v; render(); }
      if (a === 'pref-detail') { state.detail = v; render(); }
    });
  });
}

window.addEventListener('hashchange', render);
render();
