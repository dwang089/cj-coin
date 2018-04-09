const Utils = require('./utils');

class Transaction {
  constructor() {
    this.id = Utils.createId();
    this.input = null;
    this.output = [];
  }

  static newTransaction(sender, receiver, amount) {
    const transaction = new this();

    if (amount > sender.balance) {
      console.log("Amount ${amount} exceeds balance");
      return;
    }

    transaction.output.push(...[
      {amount: sender.balance - amount, address: sender.publicKey},
      {amount: amount, address: receiver }
    ])

    return transaction;
  }
}

module.exports = Transaction;