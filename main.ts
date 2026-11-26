// Japan in Numbers — the entry program for this make.fun bounty (Node 22, standard library only).
//
// The site itself is the app/ folder next to this file: plain static files (HTML, CSS and ES modules,
// no build step) that a browser opens at app/index.html. Nothing the site runs, styles or shows is
// loaded over the network; every figure lives in app/data.js.
//
// My job here is only to hand the site in. I copy app/ and screenshots/ into the output directory
// (MAKEFUN_OUTPUT_DIR when set, otherwise /output) and write dossier.json there with the vendored
// make.fun library — vendor/makefun-frontend.ts stays exactly as the kit handed it out, because the
// scorer requires the dossier to be byte for byte what its own copy of that library writes.
//
// The caps passed to buildDossier are the scorer's own (its gate.json): at most 4 screenshots of
// 256 KiB each, at most 993 files and directories in app/ and 16 MiB of app files, and a text budget
// of 163840 bytes for the dossier's source section.
//
// To look at the site while developing: `node serve.ts`, then http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });

mkdirSync(join(out, 'screenshots'), { recursive: true });
const shotsDir = join(here, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });
}

writeFileSync(join(out, 'dossier.json'), buildDossier(out, DOSSIER_CAPS));
