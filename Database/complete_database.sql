SET search_path TO rms;
SHOW search_path;

CREATE TYPE staff_role AS ENUM (
    'ADMIN',
    'WAITER',
    'CHEF'
);

CREATE TYPE staff_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


CREATE TABLE staff (
    staff_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role staff_role NOT NULL,
    status staff_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM rms.staff;

INSERT INTO rms.staff (
    full_name,
    phone,
    email,
    password_hash,
    role
)
VALUES (
    'Pavan Goud',
    '9876543210',
    'admin@rms.com',
    'hashed_password',
    'ADMIN'
);

SELECT *
FROM rms.staff;

CREATE TYPE table_status AS ENUM (
    'AVAILABLE',
    'OCCUPIED'
);

CREATE TABLE rms.restaurant_tables (
    table_id BIGSERIAL PRIMARY KEY,
    table_number INTEGER UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    status table_status DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE food_type AS ENUM (
    'VEG',
    'NON_VEG',
    'EGG'
);


CREATE TABLE rms.categories (
    category_id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO rms.categories
(category_name, description)
VALUES
('Biryani','All biryani dishes'),
('Starter','Starters and appetizers'),
('Soup','Veg and Non-Veg soups'),
('Curry','Veg and Non-Veg curries'),
('Roti & Naan','Indian breads'),
('Rice & Noodles','Rice and noodle dishes'),
('Drinks','Water and soft drinks'),
('Party Orders','Bulk catering orders');

SELECT * FROM rms.categories;


CREATE TABLE rms.menu_items (

    item_id BIGSERIAL PRIMARY KEY,

    category_id BIGINT NOT NULL,

    item_name VARCHAR(150) NOT NULL,

    food_type food_type NOT NULL,

    description TEXT,

    image_url TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_menu_category
        FOREIGN KEY(category_id)
        REFERENCES rms.categories(category_id)

);

INSERT INTO rms.menu_items
(category_id,item_name,food_type,description)

VALUES

(1,'Chicken Biryani','NON_VEG','Hyderabadi Chicken Dum Biryani'),

(1,'Mutton Biryani','NON_VEG','Hyderabadi Mutton Dum Biryani'),

(1,'Paneer Biryani','VEG','Paneer Dum Biryani'),

(1,'Egg Biryani','EGG','Egg Dum Biryani'),

(2,'Chicken 65','NON_VEG','Spicy Chicken Starter'),

(2,'Veg Manchuria','VEG','Crispy Veg Starter'),

(3,'Tomato Soup','VEG','Fresh Tomato Soup'),

(4,'Butter Chicken','NON_VEG','Butter Chicken Curry'),

(5,'Butter Naan','VEG','Indian Bread'),

(6,'Chicken Fried Rice','NON_VEG','Fried Rice'),

(7,'Thumbs Up','VEG','Cold Drink');

select * from menu_items;


CREATE TABLE rms.menu_variants (

    variant_id BIGSERIAL PRIMARY KEY,

    item_id BIGINT NOT NULL,

    variant_name VARCHAR(100) NOT NULL,

    price NUMERIC(10,2) NOT NULL,

    is_available BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_variant_item
        FOREIGN KEY(item_id)
        REFERENCES rms.menu_items(item_id),

    CONSTRAINT unique_variant
        UNIQUE(item_id, variant_name)

);







INSERT INTO rms.menu_variants
(item_id, variant_name, price)

VALUES
(1,'Mini',180),
(1,'Plate',250),
(1,'Handi',420),
(1,'Family',700),
(1,'Jumbo',950);


INSERT INTO rms.menu_variants
(item_id, variant_name, price)

VALUES
(2,'Mini',250),
(2,'Plate',340),
(2,'Handi',550),
(2,'Family',900),
(2,'Jumbo',1200);


INSERT INTO rms.menu_variants
(item_id, variant_name, price)

VALUES
(3,'Plate',220),
(3,'Family',600);

INSERT INTO rms.menu_variants
(item_id, variant_name, price)

VALUES
(5,'Regular',260);

SELECT *
FROM rms.menu_variants;



SELECT
    mi.item_name,
    mv.variant_name,
    mv.price
FROM rms.menu_items mi
JOIN rms.menu_variants mv
ON mi.item_id = mv.item_id
ORDER BY mi.item_name, mv.price;




CREATE TYPE session_status AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'CANCELLED'
);

CREATE TABLE rms.customer_sessions (

    session_id BIGSERIAL PRIMARY KEY,

    table_id BIGINT NOT NULL,

    customer_name VARCHAR(100),

    mobile_number VARCHAR(15),

    session_status session_status
        DEFAULT 'ACTIVE',

    started_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    ended_at TIMESTAMP,

    CONSTRAINT fk_session_table
        FOREIGN KEY(table_id)
        REFERENCES rms.restaurant_tables(table_id)

);





CREATE TYPE order_status AS ENUM (

    'PLACED',

    'ACCEPTED',

    'PREPARING',

    'READY',

    'SERVED',

    'CANCELLED'

);


CREATE TABLE rms.orders (

    order_id BIGSERIAL PRIMARY KEY,

    session_id BIGINT NOT NULL,

    waiter_id BIGINT,

    chef_id BIGINT,

    order_status order_status
        DEFAULT 'PLACED',

    order_notes TEXT,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_session
        FOREIGN KEY(session_id)
        REFERENCES rms.customer_sessions(session_id),

    CONSTRAINT fk_order_waiter
        FOREIGN KEY(waiter_id)
        REFERENCES rms.staff(staff_id),

    CONSTRAINT fk_order_chef
        FOREIGN KEY(chef_id)
        REFERENCES rms.staff(staff_id)

);





CREATE TABLE rms.order_items (

    order_item_id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL,

    variant_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    price_at_order NUMERIC(10,2) NOT NULL,

    special_instruction TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order
        FOREIGN KEY(order_id)
        REFERENCES rms.orders(order_id),

    CONSTRAINT fk_variant
        FOREIGN KEY(variant_id)
        REFERENCES rms.menu_variants(variant_id)

);



CREATE TYPE bill_status AS ENUM (

    'PENDING',

    'PAID'

);


CREATE TABLE rms.bills (

    bill_id BIGSERIAL PRIMARY KEY,

    session_id BIGINT UNIQUE NOT NULL,

    subtotal NUMERIC(10,2) NOT NULL,

    gst NUMERIC(10,2) DEFAULT 0,

    discount NUMERIC(10,2) DEFAULT 0,

    grand_total NUMERIC(10,2) NOT NULL,

    bill_status bill_status DEFAULT 'PENDING',

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bill_session
        FOREIGN KEY(session_id)
        REFERENCES rms.customer_sessions(session_id)

);







CREATE TYPE payment_status AS ENUM (

    'SUCCESS',

    'FAILED',

    'PENDING'

);


CREATE TABLE rms.payments (

    payment_id BIGSERIAL PRIMARY KEY,

    bill_id BIGINT UNIQUE NOT NULL,

    payment_method VARCHAR(30) NOT NULL,

    amount NUMERIC(10,2) NOT NULL,

    payment_status payment_status DEFAULT 'PENDING',

    transaction_reference VARCHAR(100),

    paid_at TIMESTAMP,

    CONSTRAINT fk_payment_bill
        FOREIGN KEY(bill_id)
        REFERENCES rms.bills(bill_id)

);