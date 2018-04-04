"use strict"

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
}

module.exports = Block;
