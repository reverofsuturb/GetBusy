  -- view all department
  SELECT * FROM department;


-- view all roles
  SELECT role.id, title, department.name AS department, salary
  FROM role JOIN department ON role.department_id = department.id;


-- view all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary,
  CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON manager.id = employee.manager_id;

  --view all managers
  SELECT id, first_name, last_name FROM employee WHERE id < 3;
