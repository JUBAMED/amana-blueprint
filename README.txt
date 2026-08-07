# AMANA PWA

Diese Version ist für GitHub Pages als installierbare PWA vorbereitet.

Dateien:
- `index.html` – Deine angepasste AMANA-Seite
- `manifest.json` – PWA-Manifest
- `sw.js` – Service Worker
- `icons/icon-192.png`
- `icons/icon-512.png`

Wichtig:
Alle Dateien müssen im gleichen GitHub-Pages-Verzeichnis liegen wie die `index.html`.
Bei `https://jubamed.github.io/arm/` also z. B.:

arm/
  index.html
  manifest.json
  sw.js
  icons/
    icon-192.png
    icon-512.png

Danach die Seite in Chrome neu laden. Wenn Chrome die Installierbarkeit erkennt, erscheint im Browser-Menü „App installieren“. Zusätzlich kann der Button „＋ AMANA installieren“ innerhalb der Seite erscheinen.

Wenn Du ein echtes AMANA-Logo hast, ersetze die beiden PNG-Dateien durch Deine finalen 192x192- und 512x512-Icons.
