const Block = require('./block');
const Wallet = require('./wallet');

const block = new Block('4/3/2018', 'block1', '1', '0');
console.log(block.toString());

console.log(Block.genesis().toString());

const newBlock = Block.newBlock('newBlock', Block.genesis());
console.log(newBlock.toString());

const wallet = new Wallet();
console.log(wallet.toString());
