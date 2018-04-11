const EC = require('elliptic').ec;
const uuid = require('uuid/v1');
const SHA256 = require('crypto-js/sha256');

const ec = new EC('secp256k1');

class Utils {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static generateId() {
    return uuid();
  }

  static generateHash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = Utils;