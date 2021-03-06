workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:\/\/gitlab.com\/api\/v4\/.*'),
  workbox.strategies.networkFirst()
)

workbox.routing.registerNavigationRoute('/index.html');

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST' || event.request.method === 'DELETE') {
    event.respondWith(
      fetch(event.request).catch(err => {
        return new Response(
          JSON.stringify({ message: 'This action disabled while app is offline' }),
          {
            status: 503,
            statusText: 'This action disabled while app is offline',
            headers: { 'Content-Type': 'application/json' }
          }
        )
      })
    )
  }
})

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])