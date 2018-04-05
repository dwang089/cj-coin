const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.newBlock(data, lastBlock);

    this.chain.push(block);
    return block;
  }

  isValidChain(blockchain) {
    if (JSON.stringify(this.chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (block.previousHash !== previousBlock.hash) {
        return false;
      }

      if (block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('new chain is not longer than the current chain');
    } else if (!this.isValidChain(newChain)) {
      console.log('the new chain is invalid');
    } else {
      this.chain = newChain; 
      console.log('there is a new chain');
    }
  }
}

module.exports = Blockchain;
