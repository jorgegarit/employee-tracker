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

// initialize application and display on console
const initialize = () => {
    inquirer.prompt([
       {
        type: 'list',
        name: 'selections',
        message: "Please select what you would like to do.",
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add New Department', 
                    'Add New Role', 'Add New Employee', 'Update Current Employees Role', 'Quit']
       } 
    ])
    .then(data => {
        if (data.selections === 'View Departments') {
            allDepartments();
        } else if (data.selections === 'View Roles') {
            allRoles();
        } else if  (data.selections === 'View Employees') {
            allEmployees();
        } else if (data.selections === 'Add New Department') {
            addDepartment();
        } else if (data.selections === 'Add New Role') {
            addRole();
        } else if (data.selections === 'Add New Employee') {
            addEmployee();
        } else if (data.selections === 'Update Current Employee Role') {
            updateEmployeeRole();
        } else if (data.selections === 'Quit') {
            quitSelections();
        }
    });
};



// // all departments will be displayed
// const sql = `SELECT * FROM departments`;

// db.query(sql, (err, rows) => {
//     if (error) throw error;
//     console.table(res);
//     // return back to main menu
//     initialize();
    
// });