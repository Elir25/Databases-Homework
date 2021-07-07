const express = require('express');
const app = express();
const secret = require("./secret.json")
const { Pool } = require('pg');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool(secret);

app.get("/customers", function (req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function (req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

/**WEEK 3 HOMEWORK */
/**1- Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`.
 *  This endpoint should still work even if you don't use the `name` query parameter! */

app.get("/products", function (req, res) {
    const productNameQuery = req.query.productNameQuery;
    let query = `SELECT * FROM products ORDER BY product_name`;

    if (productNameQuery) {
        query = `SELECT * from products WHERE product_name LIKE '%${productNameQuery}%' ORDER BY product_name`;
    }

    pool
        .query(query)
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e))
});

/**2 - Add a new GET endpoint `/customers/:customerId` to load a single customer by ID. */

app.get("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;

    pool
        .query("SELECT * from customers WHERE id=$1", [customerId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e))
});

/** 3 - Add a new POST endpoint `/customers` to create a new customer. */

app.post("/customers", function (req, res) {
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    const query =
        "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) returning id as customerId";

    pool
        .query(query, [newCustomerName, newCustomerAddress, newCustomerCity, newCustomerCountry])
        .then((result) => res.json(result.rows[0]))
        .catch((e) => console.error(e));
});

/** 4 - Add a new POST endpoint `/products` to create a new product 
 * (with a product name, a price and a supplier id). 
 * Check that the price is a positive integer and that the supplier ID exists in the database, 
 * otherwise return an error. */

app.post("/products", function (req, res) {
    const newProductName = req.body.product_name;
    const newProductUnitPrice = req.body.unit_price;
    const newProductSupplierID = req.body.supplier_id;

    if (!Number.isInteger(newProductUnitPrice) || newProductUnitPrice <= 0) {
        return res
            .status(400)
            .send("The unit price should be a positive Integer.");
    };

    pool
        .query('SELECT * FROM suppliers WHERE id=$1', [newProductSupplierID])
        .then((result) => {
            if (result.rows.length === 0) {
                res
                    .status(400)
                    .send("A product suplier with that id is not in the database!");
            } else {
                const query =
                    'INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3 ) returning id as productId';

                pool
                    .query(query, [newProductName, newProductUnitPrice, newProductSupplierID])
                    .then((result) => res.json(result.rows[0]))
                    .catch((e) => console.error(e));
            }
        });

});

/**-5 Add a new POST endpoint `/customers/:customerId/orders` to create a new order
 *  (including an order date, and an order reference) for a customer. 
 * Check that the customerId corresponds to an existing customer or return an error. */
app.post("/customers/:customerId/orders", function (req, res) {
    const customerId = req.params.customerId;

    const newOrderDate = req.body.order_date;
    const newOrderRef = req.body.order_reference;
    const newOrderCustomerId = req.body.customer_id;

    pool
        .query('SELECT * FROM orders WHERE customer_id=$1', [customerId])
        .then((result) => {
            if (result.rows.length === 0) {
                res
                    .status(400)
                    .send("The customer doesn't exist in the database")
            } else {
                const query = 'INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)';

                pool
                    .query(query, [newOrderDate, newOrderRef, newOrderCustomerId])
                    .then(() => res.send(`Order for customer ${customerId} created!!`))
                    .catch((e) => console.error(e));
            }
        });





});

//-6 Add a new PUT endpoint `/customers/:customerId` to update an existing customer 
//(name, address, city and country).done
app.put("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;

    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    const query = 'UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5';

    pool
        .query(query, [newCustomerName, newCustomerAddress, newCustomerCity, newCustomerCountry, customerId])
        .then(() => res.send(`Customer ${customerId} updated!`))
        .catch((e) => console.error(e));
});

/**-7 Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items. */
app.delete("/orders/:orderId", function (req, res) { //done
    const orderId = req.params.orderId;

    pool
        .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
        .then(() => {
            pool
                .query("DELETE FROM orders WHERE id=$1", [orderId])
                .then(() => res.send(`Order ${orderId} deleted!`))
                .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
});

/**-8 Add a new DELETE endpoint `/customers/:customerId` to 
 * delete an existing customer only if this customer doesn't have orders. */
app.delete("/customers/:customerId", function (req, res) { //done
    const customerId = req.params.customerId;

    pool
        .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
        .then((result) => {
            if (result.rows.length > 0) {
                res
                    .status(400)
                    .send("cant delete customer because has orders in the database!");
            } else {
                pool
                    .query("DELETE FROM customers WHERE id=$1", [customerId])
                    .then(() => res.send(`Customer ${customerId} deleted!`))
                    .catch((e) => console.error(e));
            }
        })

});

/** 9 Add a new GET endpoint `/customers/:customerId/orders` to load all the 
 * orders along the items in the orders of a specific customer. 
 * Especially, the following information should be returned: order references, 
 * order dates, product names, unit prices, suppliers and quantities. */
 app.get("/customers/:customerId/orders", function (req, res) {
    const customerId = req.params.customerId;
  
    const query = "SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, oi.quantity FROM customers c INNER JOIN orders o ON c.id=o.customer_id INNER JOIN order_items oi ON o.id=oi.order_id INNER JOIN products p ON p.id=oi.product_id WHERE c.id = $1"
    pool
      .query(query, [customerId])
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });

app.listen(3000, () => console.log("Server is up and running"))