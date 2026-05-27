# Portfolio – Portfolio Page

Eine persönliche, statische Portfolio‑Website, entwickelt als einfache Projektseite. Minimaler, responsiver Aufbau mit HTML/CSS/JavaScript.

Live: (optional auf GitHub Pages bereitstellen)

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


Website anschauen — für Besucher
- Kein Setup, keine Installation nötig. Einfach `index.html` öffnen oder die Site via GitHub Pages deployen.


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


Autor
- Aschvarthan Ponniah — Student an der BFH

