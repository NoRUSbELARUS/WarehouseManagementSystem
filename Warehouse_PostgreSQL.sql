CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Категории
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);

-- Поставщики
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255)
);

-- Товары
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id),
    supplier_id UUID REFERENCES suppliers(id),
    unit_price NUMERIC(15, 2) NOT NULL CHECK (unit_price > 0)
);

-- Склады
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address TEXT
);

-- Ячейки
CREATE TABLE storage_bins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    bin_code VARCHAR(20) NOT NULL,
    zone VARCHAR(50),
    UNIQUE(warehouse_id, bin_code)
);

-- Сотрудники
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Заказы
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('INBOUND', 'OUTBOUND')),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Позиции заказа (Many-to-Many)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_order NUMERIC(15, 2) NOT NULL CHECK (price_at_order >= 0)
);

-- Инвентаризация (Текущие остатки в ячейках)
CREATE TABLE inventory_balances (
    bin_id UUID NOT NULL REFERENCES storage_bins(id),
    product_id UUID NOT NULL REFERENCES products(id),
    total_quantity INTEGER NOT NULL CHECK (total_quantity >= 0),
    PRIMARY KEY (bin_id, product_id)
);

-- Посмотреть список всех созданных таблиц
SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';