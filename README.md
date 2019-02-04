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
