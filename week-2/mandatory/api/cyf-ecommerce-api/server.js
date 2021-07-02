const express = require('express');
const app = express();
const secret = require("./secret.json")
const { Pool } = require('pg');

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

app.get("/products", function(req, res) {
    pool.query('SELECT * FROM products INNER JOIN suppliers ON supplier_id=suppliers.id', (error, result) => {
        res.json(result.rows);
    });
});

app.listen(3000, () => console.log("Server is up and running"))