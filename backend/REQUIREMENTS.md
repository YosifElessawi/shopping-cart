# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : get
- Show : get(/:id)
- Create [token required] : post
- Update [token required] : put(/:id)
- Delete [token required] : delete(/:id)

#### Users
- Index :  get
- Show :  get(/:id)
- Create [token required] : post
- Update [token required] : put(/:id)
- Delete [token required] : delete(/:id)

#### Orders
- Index :  get
- Show :  get(/:id)
- Create [token required] : post
- Update [token required] : put(/:id)
- Delete [token required] : delete(/:id)

#### Prouducts_Orders
- Index :  get
- Show :  get(/:id)
- Create [token required] : post
- Update [token required] : put(/:id)
- Delete [token required] : delete(/:id)

## Data Shapes
#### Product
CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    pname VARCHAR(100),
    price numeric
);

#### User
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255)
):

#### Orders
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id BIGINT REFERENCES users(id),
    order_status VARCHAR(50)
);

#### Prouducts_Orders

CREATE TABLE products_orders(
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    order_id BIGINT REFERENCES orders(id),
    quantity INTEGER
);

