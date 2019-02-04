# Week 12 Homework: bamazon-node-app
This application uses Node.js and MySQL to create an Amazon-like storefront, where customers can place orders, managers can manage inventory across departments, and supervisors can supervise product sales. Meet Bamazon.
## User Application Flow
### Customer View
The customer can view all products for sale including information about department and price, and select the product to purchase.
![customer_view_select_products](/images/customer_1.JPG?raw=true)

Once product is selected, the customer enters the quantity to purchase.
![customer_quantity](/images/customer_2.JPG?raw=true)

If quantity is available, customer can successfully place order with details of the purchase, including product, quantity, and total cost of purchase.
![customer_purchase_successful](/images/customer_3.JPG?raw=true)

If quantity is insufficient, customer will receive a message accordingly.
![customer_purchase_unsuccessful](/images/customer_4.JPG?raw=true)

### Manager View
The manager can select the action to perform: View Products for Sale, View Low Inventory, Add to Inventory, or Add New Product.
![manager_view](/images/manager_1.JPG?raw=true)

If 'View Products for Sale' is selected, manager can view all products including department, price, and stock.
![manager_view_products](/images/manager_2.JPG?raw=true)

If 'View Low Inventory' is selected, manager can view all products with stock quantity less than 5.
![manager_low_inventory](/images/manager_3.JPG?raw=true)

If 'Add to Inventory' is selected, manager can select an item to restock...
![manager_restock](/images/manager_4.JPG?raw=true)

And enter the amount to restock.
![manager_restock_amount](/images/manager_5.JPG?raw=true)

If 'Add New Product' is selected, manager can enter name of product, department name, price, and quantity to stock.
![manager_add](/images/manager_6.JPG?raw=true)

### Supervisor View
The supervisor can select the action to perform: View Product Sales by Department, Create New Department.
![supervisor_view](/images/supervisor_1.JPG?raw=true)

If 'Create New Department' is selected, supervisor can enter the department name and overhead cost.
![supervisor_create](/images/supervisor_2.JPG?raw=true)

The 'View Product Sales by Department' portion was not completed.

## Built With
* Node.js
* MySQL

## Versioning
[GitHub](https://github.com/) is used for versioning.

## Authors
* Willa Jin

## License
This project is developed as part of the Coding Bootcamp curriculum.
