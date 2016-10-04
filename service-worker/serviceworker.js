self.addEventListener('install', e => {
  console.info('Service Worker: Installed');
});
self.addEventListener('activate', e => {
  console.info('Service Worker: Active');
});