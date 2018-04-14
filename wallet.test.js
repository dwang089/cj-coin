const Wallet = require('./wallet');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
  let wallet;
  let transactionPool;
  
  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
  });

  describe('create transaction', () => {
    let receiver;
    let amount;
    let transaction;

    beforeEach(() => {
      receiver = 'address';
      amount = 50;
      transaction = wallet.newTransaction(receiver, amount, transactionPool);
    });

    describe('same transaction', () => {
      beforeEach(() => {
        transaction = wallet.newTransaction(receiver, amount, transactionPool);
      });

      test('doubles the amount', () => {
        expect(transaction.output.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - 2 * amount);
      });

      test('copies the amount', () => {
        expect(transaction.output.filter(output => output.adress === receiver)
          .map(output => output.amount)).toEqual([amount, amount]);
      });
    });  
  });
})