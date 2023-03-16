INSERT INTO department (name)
VALUES
("pastry"),
("cheese"),
("sauce"),
("deli"),
("operations");

INSERT INTO role (title, salary, department_id)
VALUES
("Baker", 60000, 1),
("Cheese Maker", 60000, 2),
("Saucier", 60000, 3),
("Butcher", 60000, 4),
("Floor Manager", 72000, 5),
("Department Head", 72000, 5);

-- SET FOREIGN_KEY_CHECKS=0;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Georgina", "Elezarra", 2, 3),
("Alucard", "Dynamite", 1, 3),
("Gribsly", "Slabano", 5, null),
("Gerald", "Francis", 3, 3),
("Jones", "Grimoire", 4, 5),
("Bethanovka", "Duceault", 6, null),
("Meats", "Classic", 4, 5);

-- SELECT * 
-- FROM role join department ON role.department_id = department.id;

-- SELECT *
-- FROM employee join role ON employee.role_id = role.id

-- SELECT role.id AS RoleID, role.title AS Position, role.salary AS Salary, role.department_id AS DepartmentID, department.name as Department FROM role JOIN department ON role.department_id = department.id;
