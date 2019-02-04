DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (item_id),
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT default 0,
    stock_quantity INT default 0,
    product_sales INT default 0
);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Echo Dot (1st generation)", "Electronics", 50, 25);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Tree", "Pet Supplies", 38, 15);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Weighted Fleece Blanket", "Home", 14.95, 76);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Matcha Green Tea Powder", "Food", 23.99, 100);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Black Sweatshirt", "Clothing", 19.99, 112);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Fresh Watermelon", "Food", 5.89, 97);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon 96-inch 4K Ultra HD TV", "Electronics", 1497.99, 3);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Rare Collector Blue Vase", "Home", 7.85, 1);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("House Slippers (One Size Fits All)", "Clothing", 9.99, 20);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Sack of Potatoes", "Food", 4.99, 23);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Ultra-Soft Toilet Paper", "Home", 16.50, 582);

SELECT * FROM products;
describe products;
show tables;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (department_id),
    department_name VARCHAR(100),
    over_head_costs INT default 0
);

INSERT into departments (department_name, over_head_costs)
VALUES ("Electronics", 50);

INSERT into departments (department_name, over_head_costs)
VALUES ("Pet Supplies", 20);

INSERT into departments (department_name, over_head_costs)
VALUES ("Home", 15);

INSERT into departments (department_name, over_head_costs)
VALUES ("Food", 10);

INSERT into departments (department_name, over_head_costs)
VALUES ("Clothing", 10);

SELECT * FROM departments; 
describe departments;