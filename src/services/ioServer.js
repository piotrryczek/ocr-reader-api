class IoServer {
  server = null;

  setServer = (server) => {
    this.server = server;
    this.server.origins('*:*');
  }

  init = () => {
    this.server.on('connection', () => {
      console.log('IoServer Connection initialized');
    });
  }

  send = (action, payload) => {
    this.server.emit(action, payload);
  }

  stop = () => {
    this.server.close();
  }
}

export default new IoServer();
