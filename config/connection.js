const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password1',
    database: 'employees_db'
  }
);

module.exports = connection;
