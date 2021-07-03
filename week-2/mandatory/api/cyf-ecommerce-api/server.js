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

// app.get("/products", function(req, res) {
//     pool.query('SELECT * FROM products INNER JOIN suppliers ON supplier_id=suppliers.id', (error, result) => {
//         res.json(result.rows);
//     });
// });

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




app.listen(3000, () => console.log("Server is up and running"))