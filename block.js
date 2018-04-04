'use strict'

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
    const hash = 'hash';
    const previousHash = previousBlock.hash;

    return new this(timestamp, data, hash, previousHash);
  }
}

module.exports = Block;
