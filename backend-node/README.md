# Pins México - Node.js Backend

API REST desarrollada con Node.js y Express para reemplazar el backend de .NET.

## Requisitos

- Node.js 18+ 
- PostgreSQL 12+
- npm o yarn

## Instalación

1. **Instalar dependencias**:
```bash
cd backend-node
npm install
```

2. **Configurar PostgreSQL**:
```bash
# En Mac con Homebrew
brew install postgresql
brew services start postgresql

# Crear base de datos
psql postgres
CREATE DATABASE pins_mexico;
CREATE USER pins_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pins_mexico TO pins_user;
\q
```

3. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pins_mexico
DB_USERNAME=pins_user
DB_PASSWORD=your_password
```

4. **Ejecutar el servidor**:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Estructura del Proyecto

```
backend-node/
├── src/
│   ├── config/
│   │   └── database.js       # Configuración de Sequelize
│   ├── models/
│   │   ├── Order.js          # Modelo de órdenes
│   │   ├── Status.js         # Modelo de estados
│   │   └── Metric.js         # Modelo de métricas
│   ├── routes/
│   │   ├── orders.js         # Rutas de órdenes
│   │   ├── status.js         # Rutas de estados
│   │   └── metrics.js        # Rutas de métricas
│   └── server.js             # Servidor principal
├── .env.example              # Ejemplo de variables de entorno
├── package.json
└── README.md
```

## API Endpoints

### Órdenes
- `GET /api/orders/SelectOrders` - Obtener todas las órdenes
- `GET /api/orders/SelectOrder/:id` - Obtener una orden específica
- `POST /api/orders/CreateOrder` - Crear nueva orden
- `PUT /api/orders/UpdateOrder/:id` - Actualizar orden
- `DELETE /api/orders/DeleteOrder/:id` - Eliminar orden

### Estados
- `GET /api/status` - Obtener todos los estados
- `GET /api/status/:key` - Obtener estado específico
- `POST /api/status` - Crear nuevo estado
- `PUT /api/status/:key` - Actualizar estado
- `DELETE /api/status/:key` - Eliminar estado

### Métricas
- `GET /api/metrics` - Obtener métricas del dashboard
- `GET /api/metrics/dashboard` - Obtener métricas detalladas

## Migración de Datos

Para migrar datos desde SQL Server a PostgreSQL:

1. Exportar datos de SQL Server
2. Importar a PostgreSQL usando las mismas estructuras de tabla
3. Sequelize creará las tablas automáticamente al iniciar

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo con auto-reload
npm run dev

# Ejecutar en producción
npm start

# Ejecutar tests
npm test
```

## Diferencias con .NET Backend

- **ORM**: Entity Framework → Sequelize
- **Base de datos**: SQL Server → PostgreSQL
- **Lenguaje**: C# → JavaScript (ES6+)
- **Rutas**: Mantiene las mismas rutas para compatibilidad
- **Funcionalidad**: Equivalente al backend original