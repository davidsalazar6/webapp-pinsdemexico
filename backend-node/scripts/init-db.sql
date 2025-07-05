-- Script para inicializar la base de datos PostgreSQL
-- Ejecutar después de crear la base de datos pins_mexico

-- Crear tabla de estados
CREATE TABLE IF NOT EXISTS status (
    key VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Crear tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    status_key VARCHAR(50) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    pay_in_advance DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date_time TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255),
    invoice_number VARCHAR(100),
    payment_date TIMESTAMP,
    tracking_number VARCHAR(100),
    FOREIGN KEY (status_key) REFERENCES status(key)
);

-- Crear tabla de métricas
CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sub_title VARCHAR(255),
    svg TEXT,
    value VARCHAR(255)
);

-- Insertar datos iniciales para estados
INSERT INTO status (key, name) VALUES 
('Pending', 'Pendiente'),
('Completed', 'Completado'),
('Canceled', 'Cancelado'),
('Shipped', 'Enviado'),
('Paid', 'Pagado')
ON CONFLICT (key) DO NOTHING;

-- Insertar métricas iniciales
INSERT INTO metrics (title, sub_title, svg, value) VALUES 
('Pedidos completados', 'Últimos 30 días', 'done', '0'),
('Pedidos pendientes', 'Últimos 30 días', 'pending', '0'),
('Pedidos cancelados', 'Últimos 30 días', 'cancel', '0'),
('Total Facturado', 'Últimos 30 días', 'moneyWings', '0'),
('Total IVA', 'Últimos 30 días', 'tax', 'Pendiente...'),
('Total por pagar', 'Últimos 30 días', 'moneyMouth', 'Pendiente...')
ON CONFLICT DO NOTHING;