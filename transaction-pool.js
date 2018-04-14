class TransactionPool {
  constructor() {
    this.transactions = []
  }

  updateTransaction(transaction) {
    let txn = this.transactions.find(
      t => t.id === transaction.id
    );
    
    if (txn) {
      const index = this.transactions.indexOf(txn);
      this.transactions[index] = transaction;
    } else {
      this.transactions.push(transaction);  
    }
  }

  hasTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }
}

module.exports = TransactionPool;