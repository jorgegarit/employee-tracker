const mysql = require('mysql2');

// connect server to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee'
    },
    console.log('You have connected to the employee database')
);

module.exports = db;