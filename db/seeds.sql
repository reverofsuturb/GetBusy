INSERT INTO department (name)
VALUES
("pastry"),
("cheese"),
("sauce"),
("deli"),
("operations");

INSERT INTO role (title, salary, department_id)
VALUES
("baker", 60000, 1),
("cheese maker", 60000, 2),
("saucier", 60000, 3),
("butcher", 60000, 4),
("floor manager", 72000, 5),
("department head", 72000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Georgina", "Elezarra", 5, null),
("Alucard", "Dynamite", 6, null),
("Gribsly", "Slabano", 1, 1),
("Gerald", "Francis", 3, 2),
("Jones", "Grimoire", 4, 1),
("Bethanovka", "Duceault", 2, 2),
("Meats", "Classic", 4, 2);