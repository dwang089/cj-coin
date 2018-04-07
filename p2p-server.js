const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({port: P2P_PORT});
    server.on('connect', socket => this.addSocket(socket));

    this.connectToPeers();
    console.log(`Listening to p2p connections on port ${P2P_PORT}`);
  }

  addSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket added');
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.addSocket(socket));
    });
  }
}

module.exports = P2PServer;
