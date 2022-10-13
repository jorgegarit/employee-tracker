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
            addDepartmentPrompt();
        } else if (data.selections === 'Add New Role') {
            addRolePrompt();
        } else if (data.selections === 'Add New Employee') {
            addEmployee();
        } else if (data.selections === 'Update Current Employee Role') {
            updateEmployeeRole();
        } else if (data.selections === 'Quit') {
            quitSelections();
        }
    });
};

// This section will contain the fucntion for getting all department data 
// as well as prompt to add new department

const allDepartments = (req) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        initialize();
    });
};

// will prompt user for new department information
const addDepartmentPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department name?',
            validate: inputtedName => {
                if (inputtedName) {
                    return true;
                } else {
                    console.log('Please enter a name for the new department.');
                    return false;
                }
            }
        }
    ])
    .then(addDepartment);
};

const addDepartment = (body) => {
    // validation check
    const errors = inputCheck(body, 'name');
    if (errors) {
        console.log(errors);
        return;
    }
    const sql = `INSERT INTO departments (name)
    VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        initialize();  
    });
};


// This section will contain the fucntion for getting all role data 
// as well as prompt to add new role

const allRoles = (req) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        initialize();
    });
};

// will prompt user for new role information
const addRolePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?',
            validate: inputtedTitle => {
                if (inputtedTitle) {
                    return true;
                } else {
                    console.log('Please enter a title for the role.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: inputtedSalary => {
                if (inputtedSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary for the role.');
                    return false
                }
            }
        },
        {
            type: 'list',
            name: 'departments',
            message: 'Which department will this role be in?',
            choices: [
                {
                    name: 'Products',
                    value: 1
                },
                {
                    name: 'Development',
                    value: 2
                },
                {
                    name: 'Ops',
                    value: 3
                },
                {
                    name: 'Sales',
                    value: 4
                },
                {
                    name: 'Finance',
                    value: 5
                }
            ]
        }
    ])
    .then(addRole);
};

const addRole = (body) => {
    // validation check
    const errors = inputCheck(body, 'title', 'salary', 'departments');
    if (errors) {
        console.log(errors);
        return;
    }
    const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.departments];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        initialize();
    });
};