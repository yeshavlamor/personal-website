const script = ` CREATE TABLE tbluser (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    contact VARCHAR(15),
    accounts TEXT[],
    password TEXT,
    country TEXT,
    currency VARCHAR(5) NOT NULL DEFAULT 'CAD',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE tblaccount (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbluser(id),
    account_name VARCHAR(50) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_balance NUMERIC(10, 2) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbltransaction (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbluser(id),
    description TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'Pending',
    source VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL
); `


package.json 
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.13.1"
  }
}