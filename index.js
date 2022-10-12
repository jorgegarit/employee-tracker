const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');

// connect to the database
db.connect(error => {
    if (error) throw error;

    // start application if conenction is successful
    console.log(`
    --------------------------
    EMPLOYE TRACKER
    --------------------------
    `);

    // initialize menu
    initialize();
});