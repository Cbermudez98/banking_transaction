### REST API Project for Bank Account Management

**Getting Started:**

To get started with this project, follow these steps:

1. Clone the project repository:
   ```shell
   git clone https://github.com/Cbermudez98/banking_transaction.git
   ```

2. Install project dependencies:
   ```shell
   npm i
   ```

3. Create the necessary database tables:
   ```shell
   npm run migration:run
   ```

4. Execute the project:
   ```shell
   npm run start:dev
   ```

**See Documentation:**

To access the API documentation, open a web browser and go to the following URL after starting the project:

[http://localhost:{port}/api-docs](http://localhost:{port}/api-docs)

Replace `{port}` with the actual port number on which the project is running.

#### Project Description:

The objective of this project is to develop a REST API for managing bank accounts and transactions. The API should be capable of creating bank accounts, making deposits and withdrawals, as well as providing a transaction history for each account.

#### Project Requirements:

1. **Creation of Bank Accounts**:
   - It should be possible to create a bank account by providing an account holder's name and an initial balance.
   - Each account should have a unique account number generated automatically.

2. **Deposits**:
   - Users should be able to make deposits into their accounts.
   - Each deposit transaction should be recorded in the database.

3. **Withdrawals**:
   - Users should be able to make withdrawals from their accounts.
   - Ensure that withdrawals are not allowed if the account balance is insufficient.
   - Each withdrawal transaction should be recorded in the database.

4. **Balance Inquiry**:
   - Users should be able to inquire about the current balance of their accounts.

5. **Transaction History**:
   - It should be possible to retrieve the transaction history for a specific account.

6. **Secure Transactions**:
   - All transactions (deposits and withdrawals) should be carried out within a database transaction to ensure data consistency.
   - In the event of a failure during a transaction, the database should revert any changes made during the transaction.

#### Required Technologies:

- Node.js and Express.js for creating the REST API.
- A relational database such as PostgreSQL or MySQL for storing bank accounts and transactions.
- Use an Object-Relational Mapping (ORM) like Sequelize to interact with the database.
- Implement transaction management in the database to ensure data integrity.

#### Deliverables:

- A fully functional REST API that meets the mentioned requirements.
- API documentation explaining how to use it, including routes, methods, and examples of requests and responses.
