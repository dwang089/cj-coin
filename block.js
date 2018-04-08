'use strict'

const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, data, hash, previousHash) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.previousHash = previousHash;
  }

  toString() {
    //this.hash.substring(0, 10)
    return `Block -
      Timestamp   : ${this.timestamp}
      Data        : ${this.data}
      Hash        : ${this.hash}  
      PreviousHash: ${this.previousHash}`
  }

  static genesis() {
    return new this('genesis', [], '1', '0');
  }

  static newBlock(data, previousBlock) {
    const timestamp = Date.now();
    const previousHash = previousBlock.hash;
    const hash = Block.createHash(timestamp, data, previousHash); 

    return new this(timestamp, data, hash, previousHash);
  }

  static createHash(timestamp, data, previousHash) {
    return SHA256(`${timestamp}${data}${previousHash}`).toString();
  }

  static blockHash(block) {
    const { timestamp, data, previousHash } = block;
    return block.createHash(timestamp, data, previousHash);
  }
}

module.exports = Block;
