const { qualifiedTypeIdentifier } = require('@babel/types');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');

// // connect to the database
// db.connect(error => {
//     if (error) throw error;

//     // start application if conenction is successful
//     console.log(`
//     --------------------------
//     EMPLOYE TRACKER
//     --------------------------
//     `);

//     // initialize menu
//     initialize();
// });

// initialize application and display on console
const initialize = () => {
    inquirer.prompt([
       {
        type: 'list',
        name: 'selections',
        message: "Please select what you would like to do.",
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add New Department', 
                    'Add New Role', 'Add New Employee', 'Update Current Employees Role']
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
            addEmployeePrompt();
        } else if (data.selections === 'Update Current Employees Role') {
            updateEmployeeRolePrompt();
        } else if (data.selection === 'Quit') {
            promptQuit();
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
    const sql = `INSERT INTO roles (title, salary, departments_id)
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

// This section will contain the fucntion for getting all employee data 
// as well as prompt to add new employee and update employee role

const allEmployees = (req) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        initialize();
    });
};

const addEmployeePrompt = () => {
    inquirer.prompt([
        {
            type: 'input', 
            name: 'first_name',
            message: 'Please enter employees first name.',
            validated: inputtedFirstName => {
                if (inputtedFirstName) {
                    return true;
                } else {
                    console.log('Please enter a first name.');
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'last_name',
            message: 'Please enter employees last name.',
            validated: inputtedLastName => {
                if (inputtedLastName) {
                    return true;
                } else {
                    console.log('Please enter a last name.');
                    return false;
                }
            }
        },
        {
            type: 'list', 
            name: 'roles',
            message: 'What is this employees role?',
            choices: [
                {
                    name: 'UX/UI Developer',
                    value: 1
                },
                {
                    name: 'Product Development Engineer',
                    value: 2
                },
                {
                    name: 'Sr. Product Development Engineer',
                    value: 3
                },
                {
                    name: 'Products Manager',
                    value: 4
                },
                {
                    name: 'Front-End Developer',
                    value: 5
                },
                {
                    name: 'Back-End Developer',
                    value: 6
                },
                {
                    name: 'Full-Stack Lead Developer',
                    value: 7
                },
                {
                    name: 'Customer Support Rep',
                    value: 8
                },
                {
                    name: 'Technical Support Rep',
                    value: 9
                },
                {
                    name: 'Customer Support Lead',
                    value: 10
                },
                {
                    name: 'Technical Support Lead',
                    value: 11
                },
                {
                    name: 'Operations Manager',
                    value: 12
                },
                {
                    name: 'Sales Development Rep',
                    value: 13
                },
                {
                    name: 'Sales Development Lead',
                    value: 14
                },
                {
                    name: 'Payment Consultant',
                    value: 15
                },
                {
                    name: 'Lead Payment Consultant',
                    value: 16
                },
                {
                    name: 'Junior Financial Analyst',
                    value: 17
                },
                {
                    name: 'Financial Analyst',
                    value: 18
                },
                {
                    name: 'Finance Manager',
                    value: 19
                }
            ]
        },
        {
            type: 'list', 
            name: 'managers',
            message: 'Who is this employees manager?',
            choices: [
                {
                    name: 'Jordin King',
                    value: 1
                },
                {
                    name: 'Alanna Calderon',
                    value: 6
                },
                {
                    name: 'Dakota Mejia',
                    value: 10
                },
                {
                    name: 'Reece Adkins',
                    value: 11
                },
                {
                    name: 'Dawson Morrison',
                    value: 12
                },
                {
                    name: 'Amir Schaefer',
                    value: 18
                },
                {
                    name: 'Xander Heath',
                    value: 21
                },
                {
                    name: 'Walter White',
                    value: 25
                }
            ]
        }
    ])
    .then(addEmployee);
};

const addEmployee = (body) => {
    // validation check
    const errors = inputCheck(body, 'first_name', 'last_name', 'roles', 'managers');
    if (errors) {
        console.log(errors);
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id )
                VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.roles, body.managers];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        initialize();
    });
};

const updateEmployeeRolePrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeSelect',
            message: 'Who is switching roles?',
            choices: [
                {
                    name: 'Jordin King',
                    value: 1
                },
                {
                    name: 'Ahmad Liu',
                    value: 2
                },
                {
                    name: 'Leandro Erickson',
                    value: 3
                },
                {
                    name: 'Paityn Small',
                    value: 4
                },
                {
                    name: 'Paris Kim',
                    value: 5
                },
                {
                    name: 'Alana Calderon',
                    value: 6
                },
                {
                    name: 'Braxton Hendrix',
                    value: 7
                },
                {
                    name: 'Harrison Ibarra',
                    value: 8
                },
                {
                    name: 'Dangelo Perkins',
                    value: 9
                },
                {
                    name: 'Dakota Mejia',
                    value: 10
                },
                {
                    name: 'Reece Adkins',
                    value: 11
                },
                {
                    name: 'Dawson Morrison',
                    value: 12
                },
                {
                    name: 'Amira Stanley',
                    value: 13
                },
                {
                    name: 'Julianna Diaz',
                    value: 14
                },
                {
                    name: 'Leonardo Owens',
                    value: 15
                },
                {
                    name: 'Dulce Meadows',
                    value: 16
                },
                {
                    name: 'Madilynn Fuentes',
                    value: 17
                },
                {
                    name: 'Amir Schaefer',
                    value: 18
                },
                {
                    name: 'Raina Dalton',
                    value: 19
                },
                {
                    name: 'Yulian Farmer',
                    value: 20
                },
                {
                    name: 'Xander Heath',
                    value: 21
                },
                {
                    name: 'Jaliyah Henry',
                    value: 22
                },
                {
                    name: 'Trevor Weaver',
                    value: 23
                },
                {
                    name: 'Khloe Fry',
                    value: 24
                },
                {
                    name: 'Walter White',
                    value: 25
                },
                {
                    name: 'Saul Villegas',
                    value: 26
                },
                {
                    name: 'Dominick Perkins',
                    value: 27
                },
                {
                    name: 'Benjamin Baley',
                    value: 28
                },
                {
                    name: 'Cameron Mullen',
                    value: 29
                },
                {
                    name: 'Mauricio Gaines',
                    value: 30
                },
            ]
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'What is the new role of the selected employee?',
            choices: [
                {
                    name: 'UX/UI Developer',
                    value: 1
                },
                {
                    name: 'Product Development Engineer',
                    value: 2
                },
                {
                    name: 'Sr. Product Development Engineer',
                    value: 3
                },
                {
                    name: 'Products Manager',
                    value: 4
                },
                {
                    name: 'Front-End Developer',
                    value: 5
                },
                {
                    name: 'Back-End Developer',
                    value: 6
                },
                {
                    name: 'Full-Stack Lead Developer',
                    value: 7
                },
                {
                    name: 'Customer Support Rep',
                    value: 8
                },
                {
                    name: 'Technical Support Rep',
                    value: 9
                },
                {
                    name: 'Customer Support Lead',
                    value: 10
                },
                {
                    name: 'Technical Support Lead',
                    value: 11
                },
                {
                    name: 'Operations Manager',
                    value: 12
                },
                {
                    name: 'Sales Development Rep',
                    value: 13
                },
                {
                    name: 'Sales Development Lead',
                    value: 14
                },
                {
                    name: 'Payment Consultant',
                    value: 15
                },
                {
                    name: 'Lead Payment Consultant',
                    value: 16
                },
                {
                    name: 'Junior Financial Analyst',
                    value: 17
                },
                {
                    name: 'Financial Analyst',
                    value: 18
                },
                {
                    name: 'Finance Manager',
                    value: 19
                }
            ]
        }
    ])
    .then(updateEmployee);
}

const updateEmployee = (body) => {
    const errors = inputCheck(body, 'employeeSelect', 'updateRole');

    if (errors) {
        console.log(errors);
        return;
    }
    
    const sql = `UPDATE employees SET roles_id = ${body.updateRole}
                WHERE id = ${body.employeeSelect}`;
    const params = [body.employeeSelect, body.updateRole];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            // check if a record was found
        } else if (!result.affectedRows) {
            console.log('Employee not found');
        } else {
            console.table(result);
            initialize();
        }
    });
};

initialize();