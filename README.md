# Portfolio – Portfolio Page

Eine persönliche, statische Portfolio‑Website, entwickelt als einfache Projektseite. Minimaler, responsiver Aufbau mit HTML/CSS/JavaScript.

🌐 Live: (optional auf GitHub Pages bereitstellen)

Über die Seite
Die Website zeigt eine klassische Portfolio‑Struktur mit mehreren Seiten, die jeweils spezifische Inhalte präsentieren. Ziel ist eine leicht wartbare, vollständig statische Seite, die lokal oder als GitHub Pages Site läuft.

Seiten — Inhalt
- `index.html` — Startseite / Navigationsübersicht
- `about.html` — Über mich: Kurzvorstellung, Steckbrief, Profilbild
- `career.html` — Karriereübersicht: Timeline, Daten aus `assets/career.json` (dynamisch geladen)
- `hobbies.html` — Hobbys & Interessen

Features
- Vollständig statisch — kein Backend nötig
- Dynamisches Laden von strukturierten Daten (`assets/career.json`) via `assets/app.js`
- Sauberes Styling in `assets/styles.css`
- Einfaches Deployment auf GitHub Pages oder jedem statischen Host

Tech Stack
- HTML / CSS / JavaScript — Vanilla (kein Framework)
- Optional: Lokaler Dev‑Server (z. B. Python `http.server` oder VS Code Live Server)

Website anschauen — für Besucher
- Kein Setup, keine Installation nötig. Einfach `index.html` öffnen oder die Site via GitHub Pages deployen.

Lokal ausführen (Entwicklung)
Voraussetzungen: Browser
Lokaler Server (empfohlen):
```bash
python -m http.server 8000
# Dann öffnen: http://localhost:8000
```

Projektstruktur
```
portfolio-page/
├── index.html
├── about.html
├── career.html
├── hobbies.html
├── assets/
│   ├── styles.css
│   ├── app.js
│   └── career.json
```

`assets/career.json` — enthält die strukturierte Karriere‑Daten (Jobs, Zeiträume, Beschreibungen) und wird von `assets/app.js` geladen.

Häufige Probleme & Hinweise
- Lokales Laden von Dateien: Manche Browser blockieren `fetch` für lokale Dateien (`file://`). Nutze daher einen lokalen Server wie oben beschrieben.
- Dateipfade: Achte auf korrekte, relative Pfade zu `assets/` beim Kopieren von Dateien.
- GitHub Pages: Falls du deployen willst, lege die Dateien in `/docs` oder nutze den `gh-pages` Branch und überprüfe die Pages‑Einstellungen im Repository.

Erweiterungsmöglichkeiten
- Mehrsprachigkeit (i18n) per JSON‑Dateien
- Kontaktformular via Serverless‑Function
- CI: GitHub Actions für automatische Deploys bei Push

Autor / Kontakt
- (Dein Name) — Kurzinfo, z. B. Student / Beruf / Institution
- LinkedIn / GitHub (optional)
