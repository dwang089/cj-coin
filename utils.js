const EC = require('elliptic').ec;
const uuid = require('uuid/v1');

const ec = new EC('secp256k1');

class Utils {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static createId() {
    return uuid();
  }
}

module.exports = Utils;