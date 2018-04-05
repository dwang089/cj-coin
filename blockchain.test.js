const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  test('genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  test('add new block', () => {
    const data = 'data';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  test('validate blockchain', () => {
    bc2.addBlock('data2');

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  test('invalidate corrupt blockchain', () => {
    bc2.chain[0].data = 'newData';

    expect(bc2.isValidChain(bc2.chain)).toBe(false);
  });

  test('invalidate corrupt blockchain2', () => {
    bc2.addBlock('data2');
    bc2.chain[0].data = 'newData2';

    expect(bc2.isValidChain(bc2.chain)).toBe(false);
  });
});
