const Block = require('./block');
const { DIFFICULTY, RATE } = require('./config');

describe('Block', () => {
  let data;
  let genesis;
  let block;

  beforeEach(() => {
    data = 'data';
    firstBlock = Block.genesis();
    block = Block.newBlock(data, firstBlock);
  });

  test('check data', () => {
    expect(block.data).toEqual(data);
  });

  test('check previous hash', () => {
    expect(block.previousHash).toEqual(firstBlock.hash);
  });

  test('create hash for proof of work', () => {
    expect(block.hash.substring(0, block.difficulty))
      .toEqual('0'.repeat(block.difficulty));
    
    console.log(block.toString()); 
  });

  test('change difficulty dynamically', () => {
    expect(Block.updateDifficulty(block, block.timestamp + 5000))
      .toEqual(block.difficulty + 1);
    
    console.log(block.toString()); 
  });
});
