const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool');
const Wallet = require('./wallet');

describe('TransactionPool', () => {
  let transaction;
  let transactionPool;
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'address', 100);
    transactionPool = new TransactionPool();
    transactionPool.updateTransaction(transaction);
  });

  test('add a transaction', () => {
    expect(transactionPool.transactions.find(
      t => t.id === transaction.id)).toEqual(transaction);
  });

  test('update a transaction', () => {
    const txn = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, "newAddress", 50);
    transactionPool.updateTransaction(newTransaction);

    expect(JSON.stringify(transactionPool.transactions.find(
      t => t.id === newTransaction.id))).not.toEqual(txn);
  });
});