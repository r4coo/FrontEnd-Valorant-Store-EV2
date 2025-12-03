-- Datos de prueba para PostgreSQL

-- Insertar usuarios de prueba (password: "password123" encriptada con BCrypt)
INSERT INTO users (username, email, password, created_at, updated_at) VALUES
('admin', 'admin@valorant.com', '$2a$10$rqN3p8YJyp.HQGRHqkYQCeU.EyGJkVJ3p8YJyp.HQGRHqkYQCeU.Ey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('testuser', 'test@valorant.com', '$2a$10$rqN3p8YJyp.HQGRHqkYQCeU.EyGJkVJ3p8YJyp.HQGRHqkYQCeU.Ey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('jett_fan', 'jett@valorant.com', '$2a$10$rqN3p8YJyp.HQGRHqkYQCeU.EyGJkVJ3p8YJyp.HQGRHqkYQCeU.Ey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (username) DO NOTHING;

-- Insertar órdenes de prueba
INSERT INTO orders (user_id, total_amount, status, created_at, updated_at)
SELECT 
    u.id,
    149.99,
    'DELIVERED',
    CURRENT_TIMESTAMP - INTERVAL '10 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
FROM users u WHERE u.username = 'admin'
UNION ALL
SELECT 
    u.id,
    99.99,
    'PROCESSING',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    CURRENT_TIMESTAMP
FROM users u WHERE u.username = 'testuser'
UNION ALL
SELECT 
    u.id,
    199.98,
    'PENDING',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM users u WHERE u.username = 'jett_fan';

-- Insertar items de orden de prueba
INSERT INTO order_items (order_id, agent_id, agent_name, quantity, price, subtotal)
SELECT o.id, 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Jett', 1, 149.99, 149.99
FROM orders o 
JOIN users u ON o.user_id = u.id 
WHERE u.username = 'admin'
LIMIT 1;

INSERT INTO order_items (order_id, agent_id, agent_name, quantity, price, subtotal)
SELECT o.id, '5f8d3a7f-467b-97f3-062c-13acf203c006', 'Phoenix', 1, 99.99, 99.99
FROM orders o 
JOIN users u ON o.user_id = u.id 
WHERE u.username = 'testuser'
LIMIT 1;

INSERT INTO order_items (order_id, agent_id, agent_name, quantity, price, subtotal)
SELECT o.id, '707eab51-4836-f488-046a-cda6bf494859', 'Reyna', 1, 99.99, 99.99
FROM orders o 
JOIN users u ON o.user_id = u.id 
WHERE u.username = 'jett_fan'
LIMIT 1;

INSERT INTO order_items (order_id, agent_id, agent_name, quantity, price, subtotal)
SELECT o.id, 'eb93336a-449b-9c1b-0a54-a891f7921d69', 'Sage', 1, 99.99, 99.99
FROM orders o 
JOIN users u ON o.user_id = u.id 
WHERE u.username = 'jett_fan'
LIMIT 1;
