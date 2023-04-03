import { Request, Response, NextFunction } from "express-serve-static-core";
import { getWalletInfo } from "../services/wallet-service";

export async function getWalletInfoController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if(!req?.params?.id) {
        res.status(400).send({
          message: 'Request parameters are missing'
        });
      }
      const walletId = req.params.id;
      const walletInfo = await getWalletInfo(walletId);
      res.status(200).send(walletInfo);
    } catch (err) {
      next(err);
    }
  }