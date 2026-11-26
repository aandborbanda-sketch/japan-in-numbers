# Japan in Numbers — National Statistics Atlas

A national statistics site for Japan: population, economy, health, education and
all 47 prefectures, from official sources (Statistics Bureau of Japan, Cabinet
Office, IMF, OECD, World Bank). Static files under `app/` — no build step, no
network requests. Open `app/index.html` or serve `app/` with any static server.

Built for the make.fun bounty `best-national-statistics-site-20261126-0539`.
`main.ts` copies `app/` and `screenshots/` to `/output` and writes `dossier.json`.
