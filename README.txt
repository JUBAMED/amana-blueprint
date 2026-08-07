# AMANA PWA – GitHub Pages

Diese Dateien sind für das Repository `JUBAMED/amana-blueprint` vorbereitet.

## Dateistruktur

Alle Dateien liegen bewusst direkt im Repository-Root:

index.html
manifest.json
sw.js
icon-192.png
icon-512.png

## Installation

1. Diese fünf Dateien ins GitHub-Repository hochladen und die vorhandenen Versionen ersetzen.
2. Commit auf `main`.
3. Warten, bis GitHub Pages den neuen Stand veröffentlicht hat.
4. Die veröffentlichte AMANA-Seite in Chrome neu laden.

Die Icons werden absichtlich nicht in einem `icons/`-Unterordner abgelegt, weil sie in Deinem aktuellen Repository bereits im Root liegen.

## Falls Chrome noch die alte Version zeigt

Chrome kann den alten Service Worker zwischengespeichert haben. Auf dem PC:
Chrome → F12 → Application → Service Workers → Unregister
und anschließend die Seite mit Strg+Shift+R neu laden.

Auf Android kann zusätzlich das Website-Daten/Caches der Seite gelöscht werden.
