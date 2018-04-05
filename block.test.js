const Block = require('./block');

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
});
