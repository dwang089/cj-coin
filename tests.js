const Block = require('./block');

const block = new Block('4/3/2018', 'block1', '1', '0');
console.log(block.toString());

console.log(Block.genesis().toString());

const newBlock = Block.newBlock('newBlock', Block.genesis());
console.log(newBlock.toString());


