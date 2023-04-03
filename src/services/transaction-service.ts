import { v4 as uuid } from 'uuid'
import { pg } from "../database-config";
import { DbTransaction } from "../models/db-transaction";


export async function insertTransaction(
  walletId: string,
  amount: number,
  balance: number,
  description: string
): Promise<DbTransaction> {
  const dbTransaction: DbTransaction = {
    id: uuid(),
    walletId: walletId,
    amount: amount,
    balance: balance,
    description: description,
    createdAt: new Date()
  };
  return (pg
    .table<DbTransaction>('transactions')
    .returning([
      'id',
      'balance'
    ])
    .insert(dbTransaction)
    .then((transactions) => (transactions.length > 0 ? transactions[0] : undefined)) as unknown) as Promise<DbTransaction>;
}


export async function getRecentTransactions(
  walletId: string,
  skip: number,
  limit: number,
  orderBy: string
): Promise<DbTransaction[]> {

  return (pg
    .table<DbTransaction>('transactions')
    .where("walletId", walletId)
    .orderBy(orderBy, 'desc')
    .limit(limit)
    .offset(skip)
    .select([
      'id',
      'walletId',
      'amount',
      'balance',
      'createdAt'
    ]));
}

export async function getTotalTransactionsCount(
  walletId: string
): Promise<number> {

  return await pg
    .table<DbTransaction>('transactions')
    .where("walletId", walletId)
    .select()
    .count()
    .then((data) => data[0].count) as number
}