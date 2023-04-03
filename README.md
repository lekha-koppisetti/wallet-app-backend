## Wallet App Service

- `Implements endpoints to setup wallet and perform transactions on the wallet`

-  `Hosted UI Application Url - https://ui-wallet-service-txho7xwdwq-el.a.run.app/` 
- `Hosted Backend Services url - https://wallet-service-txho7xwdwq-el.a.run.app/` 

### Prerequistes to locally setup the project

Approach 1: Using Docker

- `Install Docker`

- `Uncomment docker-compose.yml`

- `docker-compose up`

- `with the docker-compose up command wallet-app will be running in port http://localhost:8080 and database client pgadmin will be running at http://localhost:9693/browser/ through which schema and data can be verified`

Approach 2: 

- `Install node v16.13.0, postgres and update dbconfig`

- `npm i`

- `npm run dev:start`

- `project will be running in http://localhost:8080`

## Endpoints

 - POST `/setup` -- endpoint to setup wallet 

    `https://wallet-service-txho7xwdwq-el.a.run.app/setup`

    ```json Request

        {
            "balance" : 1000.5431,
            "name" : "walletB-123"
        }

    ```

    ```json Response

        {
            "id": "538ed448-bf55-457d-a9aa-29e2d9e7b8aa",
            "name": "walletB-123",
            "balance": 1000.5431,
            "createdAt": "2023-03-28T06:13:55.108Z",
            "updatedAt": "2023-03-28T06:13:55.108Z"
        }

    ```



 - POST `/transact/:walletId` -- endpoint to perform transactions on wallet

    `https://wallet-service-txho7xwdwq-el.a.run.app/transact/538ed448-bf55-457d-a9aa-29e2d9e7b8aa`

    ```json Request

        {
            "amount": 1000,
            "description": "Recharge"
        }

    ```

    ```json Response

        {
            "balance": "2000.5431",
            "transactionId": "1b4c0f52-69b5-4ca7-8434-9b8fe8e1b602"
        }

    ```

 - GET `/transactions/:walletId` -- endpoint to get all the transactions of wallet
      
    `https://wallet-service-txho7xwdwq-el.a.run.app/transactions/538ed448-bf55-457d-a9aa-29e2d9e7b8aa?skip=0&limit=100&orderBy=amount`


    ```json Response

        {
            "total": "3",
            "transactions": [
                {
                    "id": "1b4c0f52-69b5-4ca7-8434-9b8fe8e1b602",
                    "walletId": "538ed448-bf55-457d-a9aa-29e2d9e7b8aa",
                    "amount": "1000.0000",
                    "balance": "2000.5431",
                    "createdAt": "2023-03-28T07:52:31.964Z"
                },
                {
                    "id": "5725b539-bbca-4bb3-8c39-78c1e2fce5e6",
                    "walletId": "538ed448-bf55-457d-a9aa-29e2d9e7b8aa",
                    "amount": "100.0000",
                    "balance": "1000.5431",
                    "createdAt": "2023-03-28T07:52:25.087Z"
                },
                {
                    "id": "31714f8a-af44-4531-a95c-56a374f932b9",
                    "walletId": "538ed448-bf55-457d-a9aa-29e2d9e7b8aa",
                    "amount": "-100.0000",
                    "balance": "900.5431",
                    "createdAt": "2023-03-28T07:52:19.043Z"
                }
            ],
            "pageSize": 10,
            "offset": 3
        }

    ```

 - GET `/wallet/:id` -- endpoint to get wallet information

   `https://wallet-service-txho7xwdwq-el.a.run.app/wallet/538ed448-bf55-457d-a9aa-29e2d9e7b8aa`

    ```json Response

        {
            "id": "538ed448-bf55-457d-a9aa-29e2d9e7b8aa",
            "name": "walletB-123",
            "balance": 1000.5431,
            "createdAt": "2023-03-28T06:13:55.108Z",
            "updatedAt": "2023-03-28T06:13:55.108Z"
       }

    ```
 


## Dependencies:

- `Express` - `A server-side JavaScript framework for building web applications and APIs`

- `Postgres` - `Using Google cloud postgres instance`

- `Knex` - `Knex is a JavaScript library that provides a SQL query builder and an ORM (Object-Relational Mapping) for Node.js. It is used for interfacing with SQL databases such as PostgreSQL. Using Knex, we can do the migrations as well.`


## Deployment  - Using Google Cloud Run

- `Using docker to build images`

- `Using Google Cloud to publish images`

- `gcloud auth login`

- `docker build -t backend-wallet-app .`

- `docker run -p 3000:3000 backend-wallet-app`

- `docker tag backend-wallet-app:latest gcr.io/original-voyage-381915/wallet-service:1`

- `docker push gcr.io/original-voyage-381915/wallet-service:1` 

- `gcloud run deploy wallet-service --image gcr.io/original-voyage-381915/wallet-service:1 --platform managed --region asia-south1 --project original-voyage-381915`



