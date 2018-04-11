const Transaction = require('./transaction');
const Wallet = require('./wallet');

describe('Transaction', () => {
  let transaction;
  let sender;
  let receiver;
  let amount;
  
  beforeEach(() => {
    sender = new Wallet();
    amount = 10;
    receiver = 'receiver';
    transaction = Transaction.newTransaction(sender, receiver, amount);
  });

  test('sender output', () => {
    expect(transaction.output.find(output => 
        output.address === sender.publicKey).amount)
        .toEqual(sender.balance - amount);
  });

  test('receiver output', () => {
    expect(transaction.output.find(output => 
        output.address === receiver).amount)
        .toEqual(amount);
  });

  test('input balance', () => {
    expect(transaction.input.amount).toEqual(sender.balance);
  });

  test('verify transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  test('not verify invalid transaction', () => {
    transaction.output[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });
});

describe('Invalid Transaction', () => {
  let transaction;
  let sender;
  let receiver;
  let amount;
    
  beforeEach(() => {
    sender = new Wallet();
    receiver = 'receiver2';
    amonut = 1000;
    transaction = Transaction.newTransaction(sender, receiver, amount);
  });

  test('invalid amount', () => {
    expect(transaction).toEqual(undefined);
  });

  describe('Update transaction', () => {
    let newAmount;
    let receiver;

    beforeEach(() => {
      newAmount = 50;
      receiver = 'receiver';
      transaction = transaction.update(sender, receiver, newAmount);
    });

    test('update amount', () => {
      expect(transaction.output.find(output => output.address === sender.publicKey))
        .toEqual(sender.balance - amount - newAmount);
    });

    test('update receiver amount', () => {
      expect(transaction.output.find(output => output.address === receiver).amount)
        .toEqual(newAmount);
    });
  });
});