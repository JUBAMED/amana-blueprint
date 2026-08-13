/* AMANA Blueprint – GitHub Pages Service Worker */
const CACHE_NAME = "amana-blueprint-v3";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/tickets.js",
  "./js/app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./assets/amana-logo.png",
  "./assets/amana-logo-hero.png",
  "./assets/imami-logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return Response.error();
      }))
  );
});

