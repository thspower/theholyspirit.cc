self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
});

self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
        const cache = await caches.open('HSHealingServices');
        console.log("[Service Worker] Caching files");
        const contentToCache = ['192.png', '512.png', 'healingservices.html','health.html','recup.html','site.js', 'sitewide.css', 'vitality.html'];
        await cache.addAll(contentToCache);
        })(),
    );
});

self.addEventListener("fetch", (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (self.location.host.match(/localhost/)) {
        return await fetch(e.request);
      }

      const r = await caches.match(e.request);
      if (r) {
        return r;
      }

      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      const response = await fetch(e.request);
      const cache = await caches.open('HSHealingServices');
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});