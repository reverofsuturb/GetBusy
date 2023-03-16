const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// mysql connect
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "business_db",
  },
  console.log(`Connected to the GetBusy workcenter database.`)
);
// brings up the main menu, made it a function in order to call it back at the end of other sequences


const showMenu = () => {
  inquirer
    .prompt({
      name: "mainmenu",
      type: "list",
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
      }
      if (data.mainmenu === "View all Roles") {
        viewRoles()
      }
      if (data.mainmenu === "View all Employees") {
        viewEmployees()
      }
      if (data.mainmenu === "Add a Department") {
      }
      if (data.mainmenu === "Add a Role") {
      }
      if (data.mainmenu === "Update an Employee") {
      }
      if (data.mainmenu === "Update an Employee Role") {
      }
      if (data === "Quit") {
      }
    });
};

const viewDepartments = () => {
  let sql = `SELECT * FROM department;`;
  db.query(sql, (err, res) => {
    if (err) { 
      throw err;
    }
  console.table(res)
  console.log("Success!");})
};
const viewRoles = () => {
  let sql = `SELECT role.id, title, department.name AS department, salary
  FROM role JOIN department ON role.department_id = department.id;`;
  db.query(sql, (err, res) => {
    if (err) { 
      throw err;
    }
  console.table(res)
  console.log("Success!");})
};
const viewEmployees = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, manager_id as manager, role.title, role.salary, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.id;`;
  db.query(sql, (err, res) => {
    if (err) { 
      throw err;
    }
  console.table(res)
  console.log("Success!");})
};
const addDepartment = () => {
  inquirer
    .prompt({
      name: "departmentname",
      type: "input",
      message: "What would you like to call the new department?",
    })
    .then((departmentname) => {
      let sql = `INSERT INTO department (name) VALUES ("${departmentname}");`;
    });

};
const addRole = () => {
  inquirer
  .prompt({
    name: "roletitle",
    type: "input",
    message: "What would you like to title the new role?",
  },
  {
    name: "rolesalary",
    type: "number",
    message: "What would you like to title the new role?",
  },
  {
    name: "roledepartment",
    type: "list",
    message: "Select which department the role belongs to",
    choices: viewDepartments(),
  })
  .then((newrole) => {
    let sql = `INSERT INTO role(title, salary, department_ID) VALUES ("${newrole.roletitle}", ${newrole.rolesalary}, ${newrole.roledepartment});`;
  });
  
};
const updateEmployee = () => {};
const updateRole = () => {};
const appQuit = () => {};


showMenu();