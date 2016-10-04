(function () {

  const PWA_App =
      ng.core.Component({
        selector: 'pwa-app',
        template: `<h1>Angular 2 with Service Workeres</h1>
                   <button (click)="exchangeHellos()">Exchange hellos</button>
                   <hr/>
                   {{message}}`
      })
        .Class({
          exchangeHellos: function () {
            if (navigator.serviceWorker.controller) {
              const messageChannel = new MessageChannel();
              navigator.serviceWorker.controller.postMessage('Hello from Angular 2', [messageChannel.port1]);
              messageChannel.port2.onmessage = e => {
                this.message = e.data.message;
              };
            } else {
              this.message = 'Please reload this page to allow the Service Worker to take control of network operations';
            }
          },
          constructor: function () {
            this.message = '';

            if ('serviceWorker' in navigator) {
              navigator.serviceWorker
                .register('./serviceworker.js', {scope: './'})
                .then((registration) => {
                  if (registration.active) {
                    status.textContent = "Service Worker is active";
                  }
                  if (registration.waiting) {
                    status.textContent = "Service Worker is waiting";
                  }
                  if (registration.installing) {
                    status.textContent = "Service Worker is installing";
                  }
                  if (registration.onupdatefound) {
                    status.textContent = "Found update for Service Worker";
                  }
                });
            } else {
              status.textContent = "Service Worker not available";
            }

          }
        })
    ;


  document.addEventListener('DOMContentLoaded', function () {
    ng.platformBrowserDynamic.bootstrap(PWA_App);
  });

})();