const { INITIAL_BALANCE } = require('./config');
const Utils = require('./utils');
const Transaction = require('./transaction');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = Utils.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      PublicKey: ${this.publicKey.toString()}
      Balance  : ${this.balance}`;
  }

  sign(hash) {
    return this.keyPair.sign(hash);    
  }

  newTransaction(receiver, amount, transactionPool) {
    if (amount > this.balance) {
      console.log("Amount ${amount} exceeds balance: ${this.balance}");
      return;
    }

    let transaction = transactionPool.hasTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, receiver, amount);
    } else {
      transaction = new Transaction(this, receiver, amount);
      transactionPool.updateTransaction(transaction)
    }

    return transaction;
  }
}

module.exports = Wallet;
