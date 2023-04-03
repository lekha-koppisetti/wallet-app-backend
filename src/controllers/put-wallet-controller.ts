import { Request, Response, NextFunction } from "express-serve-static-core";
import { insertWallet } from "../services/wallet-service";

export async function putwalletController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const walletName = req.body.name;
      const walletBalance = req.body.balance ?? 0;

      if(!walletName) {
        res.status(400).send({
          message: 'Request parameters are missing'
        });
      }

      const wallet = await insertWallet(walletName, walletBalance)
      res.status(200).send(wallet);
    } catch (err) {
      next(err);
    }
  }