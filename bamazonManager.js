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
    console.log("\nConnected to mySQL with ID: " + connection.threadId);
    start();
});

// function to display manager actions
function start() {
    inquirer
        .prompt([
            {
                // manager actions
                name: "action",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "Select an action:"
            }
        ])
        .then(function (answer) {
            // run functions depending on action selected
            if (answer.action === "View Products for Sale") {
                viewProd();
            }

            else if (answer.action === "View Low Inventory") {
                viewLowInv();
            }

            else if (answer.action === "Add to Inventory") {
                addInv();
            }

            else if (answer.action === "Add New Product") {
                addProd();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

// function to view products for sale
function viewProd() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("ID | Product Name | Department | Price | Stock");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("---------------------------------------------");
    })

    connection.end();
}

// function to view low inventory
function viewLowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // display items with stock < 5
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(res[i].product_name);
            }
        }
    })

    connection.end();
}

// function to add to inventory
function addInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    // choose product to restock
                    name: "item",
                    type: "rawlist",
                    choices: function () {
                        var stockArray = [];
                        for (var i = 0; i < res.length; i++) {
                            stockArray.push(res[i].product_name);
                        }
                        return stockArray;
                    },
                    message: "Select the item to restock:"
                },
                {
                    // enter amount to restock
                    name: "amount",
                    type: "input",
                    message: "Enter the amount to restock:"
                }
            ])
            .then(function (answer) {
                // store information of chosen product
                var prodInput;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.item) {
                        prodInput = res[i];
                    }
                }

                // add amount to restock to product
                var restockQty = prodInput.stock_quantity + parseInt(answer.amount);

                // update in mySQL database
                connection.query("UPDATE products SET ? WHERE?",
                    [
                        {
                            stock_quantity: restockQty
                        },
                        {
                            product_name: answer.item
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Item restocked. " + answer.item + " has quantity of " + restockQty + ".");
                    }
                )
            })
            .catch(function (err) {
                console.log(err);
            })
    });
}

// function to add new product
function addProd() {
    inquirer
        .prompt([
            {
                name: "newProd",
                type: "input",
                message: "Enter the name of the new product:"
            },
            {
                name: "newDptName",
                type: "input",
                message: "Enter the department name:"
            },
            {
                name: "newPrice",
                type: "input",
                message: "Enter the price:"
            },
            {
                name: "newQty",
                type: "input",
                message: "Enter the quantity to stock:"
            }
        ])
        .then(function (answer) {
            // insert into mySQL table
            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)', [answer.newProd, answer.newDptName, answer.newPrice, answer.newQty], function (err, res) {
                if (err) throw err;
                console.log("Product added to the store!");
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}