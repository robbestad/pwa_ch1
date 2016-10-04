class PWAComponent extends React.Component {
  componentDidMount() {
    const status = this.refs.status;
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

  exchangeHellos() {
    if (navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      navigator.serviceWorker.controller.postMessage('Hello from React', [messageChannel.port1]);
      messageChannel.port2.onmessage = e => {
        this.refs.sw.textContent = e.data.message;
      };
    } else {
      this.refs.sw.textContent = 'Please reload this page to allow the Service Worker to take control of network operations';
    }
  }

  render() {
    return <div>
      <h1>My React Progressive Web App</h1>
      <button onClick={::this.exchangeHellos}>Send hello to Service Worker</button>
      <hr/>
      <div ref="status"></div>
      <hr/>
      <div ref="sw">...</div>
    </div>;
  }
}

ReactDOM.render(
  <PWAComponent/>,
  document.getElementById('root')
);
