import { Request, Response, NextFunction } from "express-serve-static-core";
import { updateWalletBalanceAndTransaction } from "../services/wallet-service";

export async function putTransactionController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      if(!req?.params?.walletId || !req?.body?.amount) {
        res.status(400).send({
          message: 'Request parameters are missing'
        });
      }

      const walletId = req.params.walletId;
      const amount = parseFloat(req.body.amount);
      const description = req.body.description ?? '';

    
      const result = await updateWalletBalanceAndTransaction(walletId, amount, description);
      res.status(200).send({
        balance : result.balance,
        transactionId : result.id
      });
    } catch (err) {
      next(err);
    }
  }