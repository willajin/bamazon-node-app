var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mySQL with ID: " + connection.threadId);
    start();
});

// function to display supervisor actions
function start() {
    inquirer
        .prompt([
            {
                // supervisor actions
                name: "action",
                type: "list",
                choices: ["View Product Sales by Department", "Create New Department"],
                message: "Select an action:"
            }
        ])
        .then(function (answer) {
            // run functions depending on action selected
            if (answer.action === "View Product Sales by Department") {
                viewSales();
            }

            else if (answer.action === "Create New Department") {
                createDpt();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

// function to create new department
function createDpt() {
    inquirer
        .prompt([
            {
                name: "dptName",
                type: "input",
                message: "Enter the new department name:"
            },
            {
                name: "overCost",
                type: "input",
                message: "Enter the overhead cost:"
            }
        ])
        .then(function (answer) {
            // insert into mySQL table
            connection.query('INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)', [answer.dptName, answer.overCost], function (err, res) {
                if (err) throw err;
                console.log("Department added to the store.")
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}

// DID NOT COMPLETE //
// function to view product sales by department
function viewSales() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        
        // calculate product_sales across departments

        // display department sales table
        console.log("")
    })
}