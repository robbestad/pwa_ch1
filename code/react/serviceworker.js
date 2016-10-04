self.addEventListener('install', e => {
  console.info('Service Worker: Installed');
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  console.info('Service Worker: Active');
});
self.addEventListener('message', e => {
  const message = `Hi from Service Worker (responding to: ${e.data})`;
  e.ports[0].postMessage({message});
});