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
    server.on('connection', socket => this.addSocket(socket));

    this.connectToPeers();
    console.log(`Listening to p2p connections on port ${P2P_PORT}`);
  }

  addSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket added');

    this.handleMessage(socket);
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.addSocket(socket));
    });
  }

  handleMessage(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      console.log('data', data);
    });
  }
}

module.exports = P2PServer;
