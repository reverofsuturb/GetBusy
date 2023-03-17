DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
id int not null auto_increment,
name varchar(30) NOT NULL,
primary key (id)
);
-- role's department_id referenced to department's id, role's id key made primary
DROP TABLE IF EXISTS role;
CREATE TABLE role (
id int not null auto_increment,
title varchar(30) not null,
salary decimal not null,
department_id int,
primary key (id),
CONSTRAINT fk_department foreign key (department_id) references department(id)
);
-- employee's role_id key referenced to role's id key, manager_id self referenced to employee id 
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int,
manager_id int,
primary key (id),
foreign key (role_id) references role(id),
CONSTRAINT fk_manager foreign key (manager_id) references employee(id)
);
