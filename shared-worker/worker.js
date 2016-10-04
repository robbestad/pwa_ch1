const ports = [];
let conn = 0;

self.addEventListener('connect', e => {
  conn++;

  e.source.addEventListener('message', e => {
    for (const port of ports) {
      port.postMessage({message: e.data, conn});
    }
  });

  ports.push(e.source);
  e.source.start();
});
