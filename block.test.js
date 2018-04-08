const Block = require('./block');
const { DIFFICULTY } = require('./config');

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
    expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
    console.log(block.toString()); 
  });
});
