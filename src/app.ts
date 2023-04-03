
import { Request, Response } from 'express';
import { getTransactionsController } from './controllers/get-transactions-controller';
import { getWalletInfoController } from './controllers/get-wallet-controller';
import { putTransactionController } from './controllers/put-transaction-controller';
import { putwalletController } from './controllers/put-wallet-controller';


const express=require("express"); 
const cors = require('cors');

const app= express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));

app.get("/", function(req: Request,res: Response){
    console.log(req);
    res.send("Welcome to the world of science fiction, conflicting theories, fantasies and some eccentric nerds!")
});

app.post("/setup", putwalletController);

app.post("/transact/:walletId", putTransactionController); 

app.get("/transactions/:walletId", getTransactionsController);

app.get("/wallet/:id", getWalletInfoController);


app.listen(8080, function(){
  console.log("SERVER STARTED ON localhost:8080");     
})