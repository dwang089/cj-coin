'use strict'

const { DIFFICULTY, RATE } = require('./config');
const Utils = require('./utils');

class Block {
  constructor(timestamp, data, hash, previousHash, nonce, difficulty) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  toString() {
    //this.hash.substring(0, 10)
    return `Block -
      Timestamp   : ${this.timestamp}
      Data        : ${this.data}
      Hash        : ${this.hash}  
      PreviousHash: ${this.previousHash}
      Nonce       : ${this.nonce}
      Difficulty  : ${this.difficulty}`
  }

  static genesis() {
    return new this('genesis', [], '1', '0', 0, DIFFICULTY);
  }

  static newBlock(data, previousBlock) {
    let timestamp;
    let hash;
    let nonce = 0;
    let difficulty  = previousBlock.difficulty;
    const previousHash = previousBlock.hash;
    const previousTime = previousBlock.timestamp;
    
    do {
      timestamp = Date.now();
      nonce += 1;
      difficulty = Block.updateDifficulty(difficulty, timestamp, previousTime);
      hash = Block.createHash(timestamp, data, previousHash, nonce, difficulty); 
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, data, hash, previousHash, nonce, difficulty);
  }

  static createHash(timestamp, data, previousHash, nonce, difficulty) {
    return Utils.generateHash(`${timestamp}${data}${previousHash}${nonce}${difficulty}`).toString();
  }

  static blockHash(block) {
    const { timestamp, data, previousHash, nonce, difficulty } = block;
    return block.createHash(timestamp, data, previousHash, nonce, difficulty);
  }

  static updateDifficulty(difficulty, time, previousTime) {
    let newDifficulty = difficulty;

    if (time < previousTime + RATE) {
      newDifficulty += 1;
    } else {
      newDifficulty -= 1;
    }
   
    return newDifficulty;
  }
}

module.exports = Block;
