const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const cTable = require("console.table");

// mysql connect
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db",
  },
  console.log(`Connected to the GetBusy workcenter database.`)
);

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
    .then((userselect) => {
      if (userselect === "View all Departments") {
      }
      if (userselect === "View all Roles") {
      }
      if (userselect === "View all Employees") {
      }
      if (userselect === "Add a Department") {
      }
      if (userselect === "Add a Role") {
      }
      if (userselect === "Update an Employee") {
      }
      if (userselect === "Update an Employee Role") {
      }
      if (userselect === "Quit") {
      }
    });
};

const viewDepartments = () => {
  let sql = `SELECT department.id AS DepartmentID, department.name AS Department FROM department;`;
  db.query(sql);
};
const viewRoles = () => {
  let sql = `SELECT role.id AS RoleID, role.title AS Position, role.salary AS Salary, role.department_id AS DepartmentID, department.name as Department FROM role JOIN department ON role.department_id = department.id;`;
  db.query(sql);
};
const viewEmployees = () => {
  let sql = `SELECT `;
};
const addDepartment = () => {};
const addRole = () => {};
const updateEmployee = () => {};
const updateRole = () => {};
const appQuit = () => {};
