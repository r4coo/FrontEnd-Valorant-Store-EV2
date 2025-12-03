-- Insertar usuarios de prueba
INSERT INTO users (username, email, password, created_at, updated_at) VALUES
('admin', 'admin@valorant.com', '$2a$10$Xmh7d8P1VKM0pqPYXY8pqOMJYqN3.KCZXvqVLdVLNXVYXYXYXYXYX', NOW(), NOW()),
('testuser', 'test@valorant.com', '$2a$10$Xmh7d8P1VKM0pqPYXY8pqOMJYqN3.KCZXvqVLdVLNXVYXYXYXYXYX', NOW(), NOW()),
('jett_fan', 'jett@valorant.com', '$2a$10$Xmh7d8P1VKM0pqPYXY8pqOMJYqN3.KCZXvqVLdVLNXVYXYXYXYXYX', NOW(), NOW());

-- Insertar órdenes de prueba
INSERT INTO orders (user_id, total_amount, status, created_at, updated_at) VALUES
(1, 149.99, 'DELIVERED', DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
(2, 99.99, 'PROCESSING', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
(3, 199.98, 'PENDING', NOW(), NOW());

-- Insertar items de orden de prueba
INSERT INTO order_items (order_id, agent_id, agent_name, quantity, price, subtotal) VALUES
-- Orden 1
(1, 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Jett', 1, 149.99, 149.99),
-- Orden 2
(2, '5f8d3a7f-467b-97f3-062c-13acf203c006', 'Phoenix', 1, 99.99, 99.99),
-- Orden 3
(3, '707eab51-4836-f488-046a-cda6bf494859', 'Reyna', 1, 99.99, 99.99),
(3, 'eb93336a-449b-9c1b-0a54-a891f7921d69', 'Sage', 1, 99.99, 99.99);
