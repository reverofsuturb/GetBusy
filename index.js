// required modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet");
const chalk = require("chalk")
require('dotenv').config();

// mysql connect
const db = mysql.createConnection(
  {
    host: "localhost",
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the GetBusy workcenter database.`)
);

// brings up the main menu, made it a function in order to call it back at the end of other sequences, menu options are clear and on strict equality within an if statement to trigger their respective functions
const showMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "mainmenu",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Quit",
      ],
    })
    .then((data) => {
      if (data.mainmenu === "View all Departments") {
        viewDepartments();
        MenuDelay();
      }
      if (data.mainmenu === "View all Roles") {
        viewRoles();
        MenuDelay();
      }
      if (data.mainmenu === "View all Employees") {
        viewEmployees();
        MenuDelay();
      }
      if (data.mainmenu === "Add a Department") {
        addDepartment();
      }
      if (data.mainmenu === "Add a Role") {
        addRole();
      }
      if (data.mainmenu === "Add an Employee") {
        addEmployee();
      }
      if (data.mainmenu === "Update an Employee Role") {
        updateRole();
      }
      if (data.mainmenu === "Quit") {
        process.exit();
      }
    });
};
// select query to grab all from the department table, added a console log divider for readability, console.table displays everything in a table format
const viewDepartments = () => {
  let sql = `SELECT * FROM department;`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(res);
  });
};
//select query to grab id, role title, department names, and salaries, added a console log divider for readability, console.table displays everything in a table format
const viewRoles = () => {
  let sql = `SELECT role.id, title, department.name AS department, salary
  FROM role JOIN department ON role.department_id = department.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(res);
  });
};
//select query to grab id, first and last name, role title, department names, salaries, and manager names, added a console log divider for readability, console.table displays everything in a table format
const viewEmployees = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary,
  CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(res);
  });
};
// select query to grab manager names for the add employee function
const viewManagers = () => {
  let sql = `SELECT id, first_name, last_name FROM employee WHERE id < 3;`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(res);
  });
};
// uses inquirer to ascertain correct data for template literal injections sent to the sql database, adds department and shows updated table
const addDepartment = () => {
  inquirer
    .prompt({
      name: "departmentname",
      type: "input",
      message: "What would you like to call the new department?",
    })
    .then((data) => {
      let sql = `INSERT INTO department (name) VALUES ("${data.departmentname}");`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        viewDepartments();
        console.log(chalk.green("Success! Department added!"));
      });
    })
    .then(() => MenuDelay());
};
// uses inquirer to ascertain correct data for template literal injections sent to the sql database, adds role and shows updated table
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "roletitle",
        type: "input",
        message: "What would you like to title the new role?",
      },
      {
        name: "rolesalary",
        type: "number",
        message: "Enter in the salary of this role",
      },
      {
        name: "selectDepartmentbyID",
        type: "number",
        message: () => viewDepartments(),
      },
    ])
    .then((data) => {
      let sql = `INSERT INTO role (title, salary, department_ID) VALUES ("${data.roletitle}", ${data.rolesalary}, ${data.selectDepartmentbyID});`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        viewRoles();
        console.log(chalk.green("Success! Role added!"));
      });
    })
    .then(() => MenuDelay());
};
// uses inquirer to ascertain correct data for template literal injections sent to the sql database, adds employee and shows updated table
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        type: "number",
        message: () => viewRoles(),
        name: "selectRolebyID",
      },
      {
        type: "number",
        message: () => viewManagers(),
        name: "selectManagerbyID",
      },
    ])
    .then((data) => {
      let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstname}", "${data.lastname}", ${data.selectRolebyID}, ${data.selectManagerbyID});`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        viewEmployees();
        console.log(chalk.green("Success! Employee added!"));
      });
    })
    .then(() => MenuDelay());
};
// uses inquirer to ascertain correct data for template literal injections sent to the sql database, adds updated role and shows updated table
const updateRole = () => {
  inquirer
    .prompt([
      {
        name: "UpdateEmployeeRolebyID",
        type: "number",
        message: () => viewEmployees(),
      },
      {
        name: "NewRolebyID",
        type: "number",
        message: () => viewRoles(),
      },
    ])
    .then((data) => {
      let sql = `UPDATE employee SET role_id = ${data.NewRolebyID} WHERE id = ${data.UpdateEmployeeRolebyID};`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        viewEmployees();
        console.log(chalk.green("Success! Role updated!"));
      });
    })
    .then(() => MenuDelay());
};
// used to get back to the start menu after finishing tasks
const MenuDelay = () => {
  setTimeout(() => showMenu(), 3000);
  return;
};

// used to show the title and begin the app, used figlet here for a fancy ascii title
const Start = () => {
    figlet.text('Get Busy', {
      font: 'Doom',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
  }, function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data);
  });
  setTimeout(() => showMenu(), 2000);
};

Start();
