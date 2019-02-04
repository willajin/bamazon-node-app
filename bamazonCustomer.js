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
    displayProducts();
});

// function to place order
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // display items for sale from mySQL table
        console.log("ID | Product Name | Department | Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        }
        console.log("--------------------------------");

        placeOrder();
    });
}

// function to prompt user to place order
function placeOrder() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    // ID of product
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var idArray = [];
                        for (var i = 0; i < res.length; i++) {
                            idArray.push(res[i].product_name);
                        }
                        return idArray;
                    },
                    message: "Select the product you would like to purchase:"
                },
                {
                    name: "units",
                    type: "input",
                    message: "Enter the quantity you would like to purchase:"
                }
            ])
            .then(function (answer) {
                // store information of chosen product
                var prodInput;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        prodInput = res[i];
                    }
                }

                // check if store has enough quantity of product
                // prevent order if not enough stock available
                if (parseInt(answer.units) > prodInput.stock_quantity) {
                    console.log("Insufficient stock available. Please select another product or quantity.");
                    connection.end();
                }
                
                // fulfill order if enough stock available
                else {
                    // calculate remaining quantity
                    var remainQty = prodInput.stock_quantity - answer.units;

                    // calculate total cost of purchase
                    var totalCost = answer.units * prodInput.price;

                    // calculate total product sales
                    var totalSales = prodInput.product_sales + totalCost;
                    //console.log(totalSales);

                    //update SQL database if available
                    connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?", [remainQty, totalSales, prodInput.item_id],
                        function (err) {
                            if (err) throw err;
                            console.log("Item purchased! Your order of " + "[" + answer.units + "] " + answer.choice + " is on its way.");
                            console.log("The total cost of your purchase is $" + totalCost);
                            connection.end();
                        }
                    )
                }
            })
            .catch(function(err) {
                console.log(err);
            })
    });
}