import { DbWallet } from "../models/db-wallet";
import { v4 as uuid } from 'uuid'
import { pg } from "../database-config";
import { DbTransaction } from "../models/db-transaction";


export async function insertWallet(
  name: string,
  balance: number
): Promise<DbWallet> {
  const dbWllet: DbWallet = {
    id: uuid(),
    name: name,
    balance: balance,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return (pg
    .table<DbWallet>('wallets')
    .returning([
      'id',
      'name',
      'balance',
      'createdAt',
      'updatedAt'
    ])
    .insert(dbWllet)
    .then((wallets) => (wallets.length > 0 ? wallets[0] : undefined)) as unknown) as Promise<DbWallet>;
}


export async function getWalletInfo(
  walletId: string,
): Promise<DbWallet> {

  return (pg
    .table<DbWallet>('wallets')
    .where("id", walletId)
    .returning([
      'id',
      'name',
      'balance',
      'createdAt',
      'updatedAt'
    ])
    .then((wallets) => (wallets.length > 0 ? wallets[0] : undefined)) as unknown) as Promise<DbWallet>;
}

export async function updateWalletBalance(
  walletId: string,
  amount: number
): Promise<DbWallet> {
  const trx = await pg.transaction();
  try {
    const walletInfo: DbWallet = await getWalletInfo(walletId);
    const wb = walletInfo.balance + amount;
    const result =  await pg
      .table<DbWallet>('wallets')
      .where('id', walletId)
      .update({ balance: wb, updatedAt: new Date() }, ["id","name","balance","createdAt","updatedAt"])
      .then((wallets) => (wallets.length > 0 ? wallets[0] : undefined)) as unknown as Promise<DbWallet>;
    
    
    trx.commit();
    return result;
  } catch (error) {
    trx.rollback();
    throw error;
  }
}

export async function updateWalletBalanceAndTransaction(
  walletId: string,
  amount: number,
  description : string
): Promise<DbTransaction> {
  const trx = await pg.transaction();
  try {
    const walletInfo: DbWallet = await getWalletInfo(walletId);
    const wb = walletInfo.balance + amount;
    const result =  await pg
      .table<DbWallet>('wallets')
      .where('id', walletId)
      .update({ balance: wb, updatedAt: new Date() }, ["id","name","balance","createdAt","updatedAt"])
      .then((wallets) => (wallets.length > 0 ? wallets[0] : undefined)) as unknown as Promise<DbWallet>;
    
      // update Transaction

      const dbTransaction: DbTransaction = {
        id: uuid(),
        walletId: walletId,
        amount: amount,
        balance: (await result).balance,
        description: description,
        createdAt: new Date()
      };

      
      const transactionResult = await pg
        .table<DbTransaction>('transactions')
        .returning([
          'id',
          'balance'
        ])
        .insert(dbTransaction)
        .then((transactions) => 
        (transactions.length > 0 ? 
        transactions[0] : undefined)) as unknown as
        Promise<DbTransaction>;

    trx.commit();
    return transactionResult;
  } catch (error) {
    trx.rollback();
    throw error;
  }
}