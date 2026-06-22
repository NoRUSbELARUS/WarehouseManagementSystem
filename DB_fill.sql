BEGIN;

-- 1. 10+ Категорий
INSERT INTO categories (name) VALUES 
('Инструменты'), ('Крепеж'), ('Электрика'), ('Сантехника'), ('СИЗ'), 
('Лакокрасочные'), ('Строительные смеси'), ('Окна и двери'), ('Сад и огород'), ('Освещение'), ('Кровля');

-- 2. 5+ Складов
INSERT INTO warehouses (name, address) VALUES 
('Основной Север', 'Шоссе Энтузиастов, 1'),
('Южный Хаб', 'ул. Южная, 15'),
('Западный Терминал', 'МКАД 92 км'),
('Восточный Экспресс', 'пр. Мира, 202'),
('Резерв-Центр', 'п. Отрадное, стр 4');

-- 3. Поставщики
INSERT INTO suppliers (name, contact_email) VALUES 
('ГлавСнаб', 'info@glavsnab.ru'), ('Инструмент-Плюс', 'sales@inst.ru');

-- 4. 50+ Товаров (Генерация для краткости скрипта)
INSERT INTO products (sku, name, category_id, supplier_id, unit_price)
SELECT 
    'SKU-' || i, 
    'Товар №' || i, 
    (SELECT id FROM categories ORDER BY random() LIMIT 1),
    (SELECT id FROM suppliers ORDER BY random() LIMIT 1),
    (random() * 5000 + 100)::numeric(15,2)
FROM generate_series(1, 55) s(i);

-- 5. Сотрудники
INSERT INTO employees (first_name, last_name, role) VALUES 
('Андрей', 'Соколов', 'Менеджер'), ('Ольга', 'Новикова', 'Кладовщик'), ('Иван', 'Морозов', 'Кладовщик');

-- 6. 20+ Заказов
INSERT INTO orders (employee_id, order_type, status)
SELECT 
    (SELECT id FROM employees ORDER BY random() LIMIT 1),
    (CASE WHEN i % 2 = 0 THEN 'INBOUND' ELSE 'OUTBOUND' END)::varchar,
    'COMPLETED'
FROM generate_series(1, 22) s(i);

-- 7. Наполнение позиций заказов (Связи order_items)
-- Добавляем по 3 случайных товара в каждый заказ
INSERT INTO order_items (order_id, product_id, quantity, price_at_order)
SELECT 
    o.id, 
    p.id, 
    (random() * 10 + 1)::int,
    p.unit_price
FROM orders o
CROSS JOIN LATERAL (
    SELECT id, unit_price FROM products ORDER BY random() LIMIT 3
) p;

COMMIT;