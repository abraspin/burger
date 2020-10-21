
-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE `burgers` (
  	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured boolean NOT NULL default 0,
    createdAt TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
    );



