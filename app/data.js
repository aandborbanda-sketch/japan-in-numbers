// Japan in Numbers — real national statistics, all figures held locally.
// Sources: Statistics Bureau of Japan (population estimates, census), Cabinet Office
// (national accounts), IMF World Economic Outlook, World Bank, OECD (PISA, health,
// education). Figures are rounded and labelled with their reference year; see #/sources.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const POPULATION = [ // millions, 1 October estimates (2020 = census)
  { y: 2015, v: 127.09 }, { y: 2016, v: 126.93 }, { y: 2017, v: 126.71 },
  { y: 2018, v: 126.44 }, { y: 2019, v: 126.17 }, { y: 2020, v: 126.15 },
  { y: 2021, v: 125.50 }, { y: 2022, v: 124.95 }, { y: 2023, v: 124.35 },
  { y: 2024, v: 123.97 },
];
export const GDP_NOMINAL = [ // US$ trillion, IMF WEO (yen moves shift the dollar figure)
  { y: 2015, v: 4.44 }, { y: 2016, v: 5.00 }, { y: 2017, v: 4.93 },
  { y: 2018, v: 5.04 }, { y: 2019, v: 5.12 }, { y: 2020, v: 5.05 },
  { y: 2021, v: 5.03 }, { y: 2022, v: 4.26 }, { y: 2023, v: 4.21 },
  { y: 2024, v: 4.03 },
];
export const GDP_REAL_GROWTH = [ // % year on year, Cabinet Office
  { y: 2015, v: 1.6 }, { y: 2016, v: 0.8 }, { y: 2017, v: 1.7 },
  { y: 2018, v: 0.6 }, { y: 2019, v: -0.4 }, { y: 2020, v: -4.2 },
  { y: 2021, v: 2.6 }, { y: 2022, v: 0.9 }, { y: 2023, v: 1.7 },
  { y: 2024, v: -0.1 },
];
export const UNEMPLOYMENT = [ // % of labour force
  { y: 2015, v: 3.4 }, { y: 2016, v: 3.1 }, { y: 2017, v: 2.8 },
  { y: 2018, v: 2.4 }, { y: 2019, v: 2.4 }, { y: 2020, v: 2.8 },
  { y: 2021, v: 2.8 }, { y: 2022, v: 2.6 }, { y: 2023, v: 2.6 },
  { y: 2024, v: 2.5 },
];
export const CPI = [ // consumer prices, % year on year
  { y: 2015, v: 0.8 }, { y: 2016, v: -0.1 }, { y: 2017, v: 0.5 },
  { y: 2018, v: 1.0 }, { y: 2019, v: 0.5 }, { y: 2020, v: 0.0 },
  { y: 2021, v: -0.2 }, { y: 2022, v: 2.5 }, { y: 2023, v: 3.3 },
  { y: 2024, v: 2.7 },
];
// Age structure, 2024 (millions, Statistics Bureau estimates)
export const AGE_GROUPS = [
  { label: '0–14', value: 13.85, pct: 11.2 },
  { label: '15–64', value: 73.78, pct: 59.5 },
  { label: '65+', value: 36.34, pct: 29.3 },
];
// Population pyramid, 2024, millions per 5-year band (approx., rounded)
export const PYRAMID = [
  { band: '0–4', m: 3.6, f: 3.4 }, { band: '5–9', m: 4.1, f: 3.9 },
  { band: '10–14', m: 4.6, f: 4.4 }, { band: '15–19', m: 5.0, f: 4.8 },
  { band: '20–24', m: 5.5, f: 5.3 }, { band: '25–29', m: 5.6, f: 5.4 },
  { band: '30–34', m: 5.7, f: 5.5 }, { band: '35–39', m: 6.0, f: 5.8 },
  { band: '40–44', m: 6.8, f: 6.6 }, { band: '45–49', m: 7.6, f: 7.4 },
  { band: '50–54', m: 7.3, f: 7.1 }, { band: '55–59', m: 6.2, f: 6.1 },
  { band: '60–64', m: 5.9, f: 5.9 }, { band: '65–69', m: 6.2, f: 6.5 },
  { band: '70–74', m: 7.3, f: 8.0 }, { band: '75–79', m: 5.5, f: 6.6 },
  { band: '80–84', m: 4.0, f: 5.4 }, { band: '85+', m: 3.1, f: 5.9 },
];
// All 47 prefectures: population (millions, 2024 approx.) and land area (km²)
export const PREFECTURES = [
  { name: 'Hokkaido', pop: 5.14, area: 83424 }, { name: 'Aomori', pop: 1.19, area: 9646 },
  { name: 'Iwate', pop: 1.16, area: 15275 }, { name: 'Miyagi', pop: 2.28, area: 7282 },
  { name: 'Akita', pop: 0.92, area: 11638 }, { name: 'Yamagata', pop: 1.03, area: 9323 },
  { name: 'Fukushima', pop: 1.78, area: 13784 }, { name: 'Ibaraki', pop: 2.86, area: 6097 },
  { name: 'Tochigi', pop: 1.90, area: 6408 }, { name: 'Gunma', pop: 1.91, area: 6362 },
  { name: 'Saitama', pop: 7.34, area: 3798 }, { name: 'Chiba', pop: 6.28, area: 5158 },
  { name: 'Tokyo', pop: 14.18, area: 2194 }, { name: 'Kanagawa', pop: 9.24, area: 2416 },
  { name: 'Niigata', pop: 2.14, area: 12584 }, { name: 'Toyama', pop: 1.01, area: 4248 },
  { name: 'Ishikawa', pop: 1.11, area: 4186 }, { name: 'Fukui', pop: 0.75, area: 4191 },
  { name: 'Yamanashi', pop: 0.80, area: 4465 }, { name: 'Nagano', pop: 2.02, area: 13562 },
  { name: 'Gifu', pop: 1.95, area: 10621 }, { name: 'Shizuoka', pop: 3.55, area: 7777 },
  { name: 'Aichi', pop: 7.51, area: 5173 }, { name: 'Mie', pop: 1.73, area: 5774 },
  { name: 'Shiga', pop: 1.41, area: 4017 }, { name: 'Kyoto', pop: 2.55, area: 4613 },
  { name: 'Osaka', pop: 8.81, area: 1905 }, { name: 'Hyogo', pop: 5.39, area: 8401 },
  { name: 'Nara', pop: 1.31, area: 3691 }, { name: 'Wakayama', pop: 0.89, area: 4725 },
  { name: 'Tottori', pop: 0.54, area: 3507 }, { name: 'Shimane', pop: 0.65, area: 6708 },
  { name: 'Okayama', pop: 1.86, area: 7115 }, { name: 'Hiroshima', pop: 2.76, area: 8479 },
  { name: 'Yamaguchi', pop: 1.30, area: 6112 }, { name: 'Tokushima', pop: 0.70, area: 4147 },
  { name: 'Kagawa', pop: 0.93, area: 1877 }, { name: 'Ehime', pop: 1.29, area: 5676 },
  { name: 'Kochi', pop: 0.67, area: 7104 }, { name: 'Fukuoka', pop: 5.12, area: 4986 },
  { name: 'Saga', pop: 0.80, area: 2441 }, { name: 'Nagasaki', pop: 1.27, area: 4130 },
  { name: 'Kumamoto', pop: 1.71, area: 7409 }, { name: 'Oita', pop: 1.10, area: 6341 },
  { name: 'Miyazaki', pop: 1.04, area: 7736 }, { name: 'Kagoshima', pop: 1.57, area: 9187 },
  { name: 'Okinawa', pop: 1.47, area: 2281 },
];
export const TRADE_2024 = { exports: 107.9, imports: 113.6, balance: -5.7 }; // ¥ trillion
export const SECTORS = [ // share of gross value added, approx.
  { label: 'Services', value: 71 }, { label: 'Industry', value: 28 },
  { label: 'Agriculture, forestry & fishing', value: 1 },
];
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '84.0 years', year: '2023', note: 'Men 81.1, women 87.1 — among the highest in the world.' },
  { label: 'Infant mortality', value: '1.8 per 1,000 live births', year: '2023', note: 'One of the lowest rates recorded anywhere.' },
  { label: 'Doctors', value: '2.6 per 1,000 people', year: '2022', note: 'Below the OECD average of 3.7, despite long lives.' },
  { label: 'Hospital beds', value: '12.6 per 1,000 people', year: '2022', note: 'The highest bed density in the OECD.' },
  { label: 'Health spending', value: '11.2% of GDP', year: '2023', note: 'Universal coverage since 1961.' },
  { label: 'Smoking rate (adults)', value: '15.7%', year: '2023', note: 'Men 24.6%, women 7.5% — falling steadily.' },
];
export const PISA_2022 = [ // OECD PISA 2022 mean scores
  { subject: 'Mathematics', japan: 536, oecd: 472 },
  { subject: 'Reading', japan: 516, oecd: 476 },
  { subject: 'Science', japan: 547, oecd: 485 },
];
export const EDUCATION = [
  { label: 'Tertiary attainment, age 25–34', value: '62%', year: '2023', note: 'Share holding a university or college qualification.' },
  { label: 'Upper secondary graduation', value: '96%', year: '2023', note: 'Almost every young person finishes high school.' },
  { label: 'Public spending on education', value: '3.2% of GDP', year: '2022', note: 'Below the OECD average of about 4%.' },
  { label: 'Pupils per teacher, primary', value: '15.2', year: '2022', note: 'Smaller classes than the OECD average.' },
];
export const ENVIRONMENT = [
  { label: 'CO₂ emissions', value: '1.00 Gt', year: '2022', note: 'Down from a 2013 peak of about 1.23 Gt.' },
  { label: 'Renewables in electricity', value: '23%', year: '2023', note: 'Hydro, solar and biomass lead; solar alone is about 10%.' },
  { label: 'Forest cover', value: '68%', year: '2023', note: 'About two-thirds of the land is forest.' },
  { label: 'Recycling rate (municipal waste)', value: '20%', year: '2022', note: 'Incineration with energy recovery handles most of the rest.' },
];
export const KEY_FINDINGS = [
  { k: 'Population is shrinking', v: 'Japan lost about 3.1 million people between 2015 and 2024 — roughly one person in forty — and the decline is speeding up.' },
  { k: 'Nearly 3 in 10 are 65 or older', v: '29.3% of the population was 65+ in 2024, the highest share of any large country. The 70–74 band is now the largest age group.' },
  { k: 'Tokyo keeps growing', v: 'Tokyo (14.18m) holds 11.4% of the country in 0.6% of its land. The three largest prefectures hold 26% of all residents.' },
  { k: 'Prices are rising again', v: 'After decades near zero, consumer prices rose 2.5% in 2022, 3.3% in 2023 and 2.7% in 2024.' },
  { k: 'Jobs are plentiful', v: 'Unemployment was 2.5% in 2024 — near a 30-year low — while the working-age population keeps shrinking.' },
  { k: 'Long, healthy lives', v: 'Life expectancy of 84.0 years (2023) and infant mortality of 1.8 per 1,000 are among the best in the world.' },
];
export const SOURCES = [
  { name: 'Statistics Bureau of Japan', what: 'Population estimates, census, labour force survey, consumer prices' },
  { name: 'Cabinet Office, Japan', what: 'National accounts (GDP, real growth), trade statistics' },
  { name: 'IMF World Economic Outlook', what: 'Nominal GDP in US dollars, 2015–2024' },
  { name: 'OECD', what: 'PISA 2022 scores, health and education indicators' },
  { name: 'World Bank', what: 'Development indicators used for cross-checks' },
  { name: 'Ministry of Health, Labour and Welfare', what: 'Life expectancy, infant mortality, doctors and beds' },
];
