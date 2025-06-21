// Super Dudu & Bubu Game Service Worker
const CACHE_NAME = "dudu-bubu-game-v1.0.0";
const STATIC_CACHE_URLS = [
  "/",
  "/game",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  // Game assets
  "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=800",
  "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/bg-ce4320?format=webp&width=800",
  "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/coin-a69003?format=webp&width=800",
  "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/ground-7a1485?format=webp&width=800",
  "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/barrier-56015f?format=webp&width=800",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Clearing Old Cache");
              return caches.delete(cache);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith("http")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(event.request).catch(() => {
            // If both cache and network fail, return a custom offline page
            if (event.request.destination === "document") {
              return caches.match("/");
            }
          })
        );
      }),
    );
  }
});

// Background sync for game progress
self.addEventListener("sync", (event) => {
  if (event.tag === "save-game-progress") {
    event.waitUntil(saveGameProgress());
  }
});

// Push notifications for game updates
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "New level available in Super Dudu & Bubu!",
    icon: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=192",
    badge:
      "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=72",
    vibrate: [200, 100, 200],
    tag: "game-update",
    actions: [
      {
        action: "play",
        title: "Play Now",
        icon: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/player-d7e8a5?format=webp&width=48",
      },
      {
        action: "later",
        title: "Later",
        icon: "https://cdn.builder.io/api/v1/assets/eec2c1b00e834cd39ddbda5535f96e32/coin-a69003?format=webp&width=48",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Super Dudu & Bubu", options),
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "play") {
    event.waitUntil(clients.openWindow("/game"));
  }
});

// Helper function to save game progress
async function saveGameProgress() {
  try {
    // This would sync with a backend API when online
    console.log("Service Worker: Syncing game progress...");
    // Implementation would go here
  } catch (error) {
    console.error("Service Worker: Failed to sync game progress:", error);
  }
}
