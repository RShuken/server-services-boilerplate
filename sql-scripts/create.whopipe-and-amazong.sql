create table if not exists whopipe_video_views (
    view_id integer primary key generated by default as identity,
    video_name text not null,
    region text not null,
    date_viewed timestamp default now() not null
);


drop type if exists department;
create type department as enum (
    'Electronics',
    'Cleaning',
    'Grocery',
    'Furniture',
    'Stationery',
    'Clothing',
    'DIY',
    'Sports',
    'Homeware',
    'Games',
    'Transport'
);

create table if not exists amazong_products (
    product_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    price decimal(12,2) NOT NULL,
    image TEXT,
    category department NOT NULL
);