const { INITIAL_BALANCE } = require('./config');
const Utils = require('./utils');

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
}

module.exports = Wallet;
