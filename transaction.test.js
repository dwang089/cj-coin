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
});