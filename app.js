const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const P2PServer = require('./p2p-server');
const Wallet = require('./wallet');
const TransactionPool = require('./transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2PServer(bc);
const wallet = new Wallet();
const TxnPool = new TransactionPool()

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const data = req.body.data;
  const block = bc.addBlock(data);
  console.log(`New block is added: ${block.toString()}`);

  p2pServer.syncChain();
  res.redirect('/blocks');
});

app.get('/transactions', (req, res) => {
  res.json(TxnPool.transactions);
});

app.post('/transaction', (req, res) => {
  const { receiver, amount } = req.body;
  const transaction = wallet.newTransaction(receiver, amount, TxnPool);
  res.redirect('transactions');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
