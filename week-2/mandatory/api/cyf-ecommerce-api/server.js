const express = require('express');
const app = express();
const secret = require("./secret.json")
const { Pool } = require('pg');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool(secret);

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

// app.get("/products", function(req, res) {
//     pool.query('SELECT * FROM products INNER JOIN suppliers ON supplier_id=suppliers.id', (error, result) => {
//         res.json(result.rows);
//     });
// });

/**WEEK 3 HOMEWORK */
/**1- Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`.
 *  This endpoint should still work even if you don't use the `name` query parameter! */

 app.get("/products", function(req, res) {
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

app.get("/customers/:customerId", function(req, res) {
    const customerId = req.params.customerId;

    pool 
    .query("SELECT * from customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
});

/**Add a new POST endpoint `/customers` to create a new customer. */

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

app.listen(3000, () => console.log("Server is up and running"))