drop table if exists order_items;
drop table if exists orders;
drop table if exists customers;
drop table if exists products;
drop table if exists suppliers;

CREATE TABLE customers (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  address  VARCHAR(120),
  city     VARCHAR(30),
  country  VARCHAR(20)
);

CREATE TABLE suppliers (
    id              SERIAL PRIMARY KEY,
    supplier_name   VARCHAR(100) NOT NULL,
    country         VARCHAR(20) NOT NULL
);

CREATE TABLE products (
    id             SERIAL PRIMARY KEY,
    product_name   VARCHAR(100) NOT NULL,
    unit_price     INT NOT NULL,
    supplier_id    INT REFERENCES suppliers(id)
);

CREATE TABLE orders (
    id              SERIAL PRIMARY KEY,
    order_date      DATE NOT NULL,
    order_reference VARCHAR(10) NOT NULL,
    customer_id     INT REFERENCES customers(id)
);

CREATE TABLE order_items (
    id          SERIAL PRIMARY KEY,
    order_id    INT REFERENCES orders(id),
    product_id  INT REFERENCES products(id),
    quantity    INT NOT NULL
);

INSERT INTO customers (name, address, city, country) VALUES ('Guy Crawford','770-2839 Ligula Road','Paris','France');
INSERT INTO customers (name, address, city, country) VALUES ('Hope Crosby','P.O. Box 276, 4976 Sit Rd.','Steyr','United Kingdom');
INSERT INTO customers (name, address, city, country) VALUES ('Britanney Kirkland','P.O. Box 577, 5601 Sem, St.','Little Rock','United Kingdom');
INSERT INTO customers (name, address, city, country) VALUES ('Amber Tran','6967 Ac Road','Villafranca Asti','United States');
INSERT INTO customers (name, address, city, country) VALUES ('Edan Higgins','Ap #840-3255 Tincidunt St.','Arles','United States');
INSERT INTO customers (name, address, city, country) VALUES ('Quintessa Austin','597-2737 Nunc Rd.','Saint-Marc','United Kingdom');

INSERT INTO suppliers (supplier_name, country) VALUES ('Amazon', 'United States');
INSERT INTO suppliers (supplier_name, country) VALUES ('Taobao', 'China');
INSERT INTO suppliers (supplier_name, country) VALUES ('Argos', 'United Kingdom');
INSERT INTO suppliers (supplier_name, country) VALUES ('Sainsburys', 'United Kingdom');

INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Tee Shirt Olympic Games', 20, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Tee Shirt Olympic Games', 18, 2);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Tee Shirt Olympic Games', 21, 3);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Mobile Phone X', 299, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Mobile Phone X', 249, 4);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Super warm socks', 10, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Super warm socks', 5, 2);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Super warm socks', 8, 3);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Super warm socks', 10, 4);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Le Petit Prince', 10, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Le Petit Prince', 10, 4);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Ball', 14, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Ball', 15, 4);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Ball', 20, 2);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Javascript Book', 40, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Javascript Book', 39, 3);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Javascript Book', 41, 2);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Coffee Cup', 3, 1);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Coffee Cup', 4, 2);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Coffee Cup', 4, 3);
INSERT INTO products (product_name, unit_price, supplier_id) VALUES ('Coffee Cup', 5, 4);

INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-06-01', 'ORD001', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-15', 'ORD002', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-11', 'ORD003', 1);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-24', 'ORD004', 2);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-30', 'ORD005', 3);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-05', 'ORD006', 4);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-04-05', 'ORD007', 4);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-23', 'ORD008', 5);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-07-24', 'ORD009', 5);
INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('2019-05-10', 'ORD010', 5);

INSERT INTO order_items (order_id, product_id, quantity) VALUES(1, 2, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(1, 7, 5);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(2, 8, 4);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(2, 11, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(3, 20, 10);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(3, 14, 2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(4, 4, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(5, 16, 2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(5, 10, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(6, 19, 3);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(6, 17, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(6, 11, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(6, 9, 3);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(7, 8, 15);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(8, 1, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(8, 5, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(9, 13, 2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(10, 14, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES(10, 6, 5);

--1 Retrieve all the customers names and addresses who lives in United States
select "name", address from customers where country = 'United States';
--2 Retrieve all the customers ordered by ascending name
select * from customers order by name asc; 
select * from customers order by name desc; 
-- 3 Retrieve all the products which cost more than 100
select * from products where unit_price > 100;
-- 4 Retrieve all the products whose name contains the word `socks`
select * from products where product_name LIKE 'socks';
-- 5 Retrieve the 5 most expensive products
select * from products order by unit_price desc limit 5;
--7 Retrieve all the products with their corresponding suppliers. The result should only contain the columns 
--`product_name`, `unit_price` and `supplier_name`
select product_name, unit_price, supplier_name from products p inner join suppliers s on p.supplier_id=s.id;
-- 8 Retrieve all the products sold by suppliers based in the United Kingdom. The result should
--only contain the columns `product_name` and `supplier_name`.
select product_name, supplier_name from products p inner join suppliers s on p.supplier_id=s.id where country = 'United Kingdom';
--9 Retrieve all orders from customer ID `1`
select * from orders o inner join customers c on o.id=c.id where customer_id = 1;
--10 Retrieve all orders from customer named `Hope Crosby`
select * from orders o inner join customers c on o.id=c.id where c."name" = 'Hope Crosby';

--Retrieve all the products in the order `ORD006`. The result should only contain 
--the columns `product_name`, `unit_price` and `quantity`.
select product_name, unit_price, quantity from products p 
inner join orders o on p.id=o.id 
inner join order_items oi on o.id=oi.order_id where order_reference = 'ORD006';
--Retrieve all the products with their supplier for all orders of all customers. The result should only
-- contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
select "name", order_reference, order_date, product_name, supplier_name, quantity from customers c 
inner join orders o on o.customer_id=c.id
inner join order_items oi on o.id=oi.order_id 
inner join products p on oi.product_id=p.id 
inner join suppliers s on p.supplier_id=s.id; 
--Retrieve the names of all customers who bought a product from a supplier from China.
select "name" from customers c 
inner join orders o on o.customer_id=c.id
inner join order_items oi on o.id=oi.order_id 
inner join products p on oi.product_id=p.id 
inner join suppliers s on p.supplier_id=s.id where s.country = 'China'; 

--Extra 1: get the top 5 suppliers who sell the most.
select * from suppliers s 
inner join products p on s.id=p.supplier_id 
inner join order_items oi on oi.product_id=p.id 
group by c."name"
;
--
select supplier_name , sum(quantity) as total
from suppliers s join products p on p.supplier_id = s.id 
join order_items oi on p.id  = oi.product_id  
group by supplier_name
order by total desc
limit 3

--Extra 2 get top 3 customers that are buying more.
SELECT * FROM order_items oi 
INNER JOIN products p ON p.id=product_id
INNER JOIN orders o ON oi.id=oi.order_id
INNER JOIN customers c ON c.id=o.customer_id
ORDER BY oi.quantity desc limit 3;

select * from customers c 
inner join orders o on c.id=o.customer_id
inner join order_items oi on o.id=oi.order_id order by c."name", oi.quantity desc limit 3;

-- get the top 2 products that are bought most times. Who is selling those products?
select * from products p 
inner join order_items oi on p.id=oi.product_id 
inner join suppliers s on p.supplier_id=s.id 
order by oi.quantity desc limit 3;

--WEEK 3 HOMEWORK ---

--Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example
-- `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!

