'use strict'

const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('./config');

class Block {
  constructor(timestamp, data, hash, previousHash, nonce) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.previousHash = previousHash;
    this.nonce = nonce;
  }

  toString() {
    //this.hash.substring(0, 10)
    return `Block -
      Timestamp   : ${this.timestamp}
      Data        : ${this.data}
      Hash        : ${this.hash}  
      PreviousHash: ${this.previousHash}
      Nonce       : ${this.nonce}`
  }

  static genesis() {
    return new this('genesis', [], '1', '0', 0);
  }

  static newBlock(data, previousBlock) {
    let timestamp;
    let hash;
    let nonce = 0;
    const previousHash = previousBlock.hash;
    
    do {
      timestamp = Date.now();
      nonce += 1;
      hash = Block.createHash(timestamp, data, previousHash, nonce); 
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, data, hash, previousHash, nonce);
  }

  static createHash(timestamp, data, previousHash, nonce) {
    return SHA256(`${timestamp}${data}${previousHash}${nonce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, data, previousHash, nonce } = block;
    return block.createHash(timestamp, data, previousHash, nonce);
  }
}

module.exports = Block;
