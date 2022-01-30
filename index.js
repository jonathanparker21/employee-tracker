const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')
const connection = require('./config/connection')

connection.connect(function (err) {
    if (err) { console.log(err) }
    displayEmployees()
});

function displayEmployees() {

    inquirer.prompt({

        type: 'list',
        name: 'questionList',
        message: 'What would you like to do?',
        choices: ['View all departments.', 'View all roles.', 'View all employees.', 'Add a department.', 'Add a role.', 'Add an employee.', 'Update an employee role.']

    })
        .then((response) => {
            if (response.questionList === 'View all departments.') {
                allDepartments();
            } else if (response.questionList === 'View all roles.') {
                allRoles();
            } else if (response.questionList === 'View all employees.') {
                allEmployees();
            } else if (response.questionList === 'Add a department.') {
                addDepartment();
            } else if (response.questionList === 'Add a role.') {
                addRole();
            } else if (response.questionList === 'Add an employee.') {
                addEmployee();
            } else if (response.questionList === 'Update an employee role.') {
                updateRole();
            }
        })
}

function allDepartments() {

    connection.query('SELECT * FROM department;',
        function (err, result) {
            if (err) { console.log(err) }
            console.table(result)
            displayEmployees();
        })

};

function allRoles() {

    connection.query('SELECT * FROM role;',
        function (err, result) {
            if (err) { console.log(err) }
            console.table(result)
            displayEmployees();
        })

};

function allEmployees() {

    connection.query('SELECT * FROM employee;',
        function (err, result) {
            if (err) { console.log(err) }
            console.table(result)
            displayEmployees();
        })

};

function addDepartment() {

    inquirer.prompt({

        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department?',

    })
        .then((response) => {
            connection.query('INSERT INTO department SET ?;',
                {
                    name: response.addDepartment,
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    displayEmployees();
                })
        })

};

function addRole() {

    var addRoleQuestions = [
        {

            type: 'input',
            name: 'nameRole',
            message: 'What is the name of the role?',

        },
        {

            type: 'input',
            name: 'salaryRole',
            message: 'What is the salary of the role?',

        },
        {

            type: 'input',
            name: 'departmentRole',
            message: 'Which department id does the role belong to?',

        },
    ]

    inquirer.prompt(addRoleQuestions)
        .then((response) => {
            connection.query('INSERT INTO role SET ?;',
                {
                    title: response.nameRole,
                    salary: response.salaryRole,
                    department_id: response.departmentRole
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    displayEmployees();
                })
        })

};

function addEmployee() {

    var addEmployeeQuestions = [
        {

            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",

        },
        {

            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",

        },
        {

            type: 'input',
            name: 'employeeRole',
            message: "What is the employee's role id?",

        },
        {

            type: 'input',
            name: 'employeeManager',
            message: "What is the employee's manager id?",

        },
    ]

    inquirer.prompt(addEmployeeQuestions)
        .then((response) => {
            connection.query('INSERT INTO employee SET ?;',
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.employeeRole,
                    manager_id: response.employeeManager
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    displayEmployees();
                })
        })

};

function updateRole() {

    var updateRoleQuestions = [
        {

            type: 'input',
            name: 'whichEmployee',
            message: "Enter the employee's id that needs their role updated."

        },
        {

            type: 'input',
            name: 'newRole',
            message: "Which new role id do you want to assign to the selected employee?",

        },
    ]

    inquirer.prompt(updateRoleQuestions)
        .then((response) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?',
                [response.newRole, response.whichEmployee],
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    displayEmployees();
                })
        })

};