export interface DbTransaction {
    id: string;
    walletId : string;
    amount: number;
    balance: number;
    description: string;
    createdAt : Date;
}
  