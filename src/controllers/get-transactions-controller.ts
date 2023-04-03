import { Request, Response, NextFunction } from "express-serve-static-core";
import { getRecentTransactions, getTotalTransactionsCount } from "../services/transaction-service";

export async function getTransactionsController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if(!req?.params?.walletId) {
        res.status(400).send({
          message: 'Request parameters are missing'
        });
      }
      const walletId = req.params.walletId as string;
      let skip =  req.query?.skip ? parseInt(req.query?.skip as string) : 0;
      const limit = req.query?.limit ? parseInt(req.query.limit as string) : 10;
      const orderBy = req.query?.orderBy ? req.query.orderBy as string : 'createdAt';
      const transactions = await getRecentTransactions(walletId,skip,limit, orderBy);
      skip = skip + transactions.length;
      const response = {
        total: await getTotalTransactionsCount(walletId),
        transactions :transactions,
        pageSize: 10,
        offset : skip
      }
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }