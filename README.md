# AMANA Blueprint – GitHub Pages

Diese Version wurde aus der bereitgestellten `index.html` erstellt und für GitHub Pages in eine wartbare Struktur aufgeteilt.

## Struktur

- `index.html` – Oberfläche
- `css/style.css` – gesamtes CSS
- `js/data.js` – Suchindex
- `js/tickets.js` – Ticket-/Umsetzungsdaten
- `js/app.js` – UI, Suche, Tracker, Ticket-Drawer und PWA-Registrierung
- `data/` – reserviert für spätere echte JSON-Daten
- `assets/` – AMANA-/IMAMI-Grafiken
- `manifest.json` – PWA
- `sw.js` – Service Worker
- `icon-192.png`, `icon-512.png` – PWA-Icons
- `.nojekyll` – verhindert Jekyll-Verarbeitung
- `404.html` – GitHub-Pages-Fallback

## GitHub Pages

Repository Settings → Pages:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

Danach einige Sekunden warten.

## Wichtig nach dem Austausch

Da die Seite einen Service Worker verwendet, wird die Cache-Version in `sw.js` bewusst auf `v3` gesetzt.

Wenn der Browser trotzdem die alte Version zeigt:
1. Seite hart neu laden (`Ctrl+F5`)
2. notfalls Browser-Website-Daten für die GitHub-Pages-Adresse löschen
3. GitHub Pages Deployment prüfen
