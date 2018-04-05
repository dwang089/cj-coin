const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
  let bc;

  beforeEach(() => {
    bc = new Blockchain();
  });

  test('genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  test('add new block', () => {
    const data = 'data';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
});
