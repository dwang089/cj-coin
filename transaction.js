const Utils = require('./utils');

class Transaction {
  constructor() {
    this.id = Utils.generateId();
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

    Transaction.signTransaction(transaction, sender);
    return transaction;
  }

  static signTransaction(transaction, sender) {
    transaction.input = {
      timestamp: Date.now(),
      address: sender.publicKey,
      amount: sender.balance,
      signature: sender.sign(Utils.generateHash(transaction.output))
    }
  }

  static verifyTransaction(transaction) {
    return Utils.verifySignature(
      transaction.input.address,
      Utils.generateHash(transaction.output),
      transaction.input.signature,
    );
  }

  update(sender, receiver, amount) {
    const output = this.output.find(output => output.address === sender.publicKey);

    if (amount > sender.amount) {
      console.log("Amount ${amount} exceeds balance");
      return;
    }

    output.amount -= amount;
    this.output.push({amount, address: receiver});
    Transaction.signTransaction(this, sender);

    return this;
  }
}

module.exports = Transaction;