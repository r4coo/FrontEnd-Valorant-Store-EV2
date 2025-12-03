# Scripts SQL - Valorant Store

Este directorio contiene los scripts SQL necesarios para crear y configurar la base de datos del proyecto Valorant Store.

## Archivos

### MySQL
- `01-create-tables.sql` - Crea las tablas para MySQL
- `02-seed-data.sql` - Inserta datos de prueba para MySQL

### PostgreSQL (Railway)
- `03-postgresql-tables.sql` - Crea las tablas para PostgreSQL
- `04-postgresql-seed.sql` - Inserta datos de prueba para PostgreSQL

## Uso

### En desarrollo local con MySQL
\`\`\`bash
mysql -u root -p < scripts/01-create-tables.sql
mysql -u root -p < scripts/02-seed-data.sql
\`\`\`

### En Railway con PostgreSQL
Railway ejecutará automáticamente los scripts si los subes, o puedes ejecutarlos manualmente desde el panel de Railway:

1. Ve a tu proyecto en Railway
2. Selecciona tu servicio de PostgreSQL
3. Ve a la pestaña "Data"
4. Copia y pega el contenido de los archivos PostgreSQL

### Desde v0
Puedes ejecutar estos scripts directamente desde v0 si tienes una integración de base de datos configurada.

## Estructura de la Base de Datos

### Tabla `users`
- `id` - ID único del usuario
- `username` - Nombre de usuario único
- `email` - Email único
- `password` - Contraseña encriptada con BCrypt
- `created_at` - Fecha de creación
- `updated_at` - Fecha de última actualización

### Tabla `orders`
- `id` - ID único de la orden
- `user_id` - Referencia al usuario
- `total_amount` - Monto total de la orden
- `status` - Estado de la orden (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- `created_at` - Fecha de creación
- `updated_at` - Fecha de última actualización

### Tabla `order_items`
- `id` - ID único del item
- `order_id` - Referencia a la orden
- `agent_id` - UUID del agente de Valorant
- `agent_name` - Nombre del agente
- `quantity` - Cantidad del item
- `price` - Precio unitario
- `subtotal` - Subtotal del item

## Datos de Prueba

Los scripts de seed crean 3 usuarios de prueba:
- **admin** (admin@valorant.com) - Usuario administrador
- **testuser** (test@valorant.com) - Usuario de prueba
- **jett_fan** (jett@valorant.com) - Usuario fanático de Jett

Todos los usuarios tienen la misma contraseña encriptada. En producción, asegúrate de cambiar estas credenciales.

## Notas

- Los scripts de PostgreSQL incluyen triggers automáticos para actualizar `updated_at`
- Todos los scripts usan `IF NOT EXISTS` para evitar errores si las tablas ya existen
- Los índices están optimizados para búsquedas frecuentes
- Las relaciones usan `ON DELETE CASCADE` para mantener integridad referencial
