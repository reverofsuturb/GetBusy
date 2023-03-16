DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
id int not null auto_increment,
name varchar(30),
primary key (id)
);

CREATE TABLE role (
id int not null auto_increment,
title varchar(30) not null,
salary decimal not null,
department_id int not null,
primary key (id),
foreign key (department_id)
references department(id)
);

CREATE TABLE employee (
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int,
primary key (id),
foreign key (role_id)
references role(id),
foreign key (manager_id)
references employee(id)
);
