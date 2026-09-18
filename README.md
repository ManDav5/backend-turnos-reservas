# Sistema Backend de Turnos y Reservas (API inicial con FileSystem)

Primera versión funcional del backend para la gestión de servicios y reservas de turnos, construida con Node.js, Express y persistencia en archivos JSON mediante el módulo nativo FileSystem (`fs/promises`).

---

## 📁 Estructura del Proyecto

```text
mi-proyecto/
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── data/
│   │   ├── bookings.json
│   │   └── services.json
│   ├── managers/
│   │   ├── BookingManager.js
│   │   └── ServiceManager.js
│   ├── routes/
│   │   ├── bookings.router.js
│   │   └── services.router.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
---

## ⚙️ Requisitos e Instalación

1. Clonar el repositorio:

``` bash
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
---

2. Instalar Dependencias:
``` bash
npm install
```
---

3. Variable de entorno: Crear un archivo .env en la raíz tomando como base .env.example:

``` env
PORT=8080
```
---

4. Iniciar el servidor:

```bash
npm start
```

---

## 📌 Endpoints de la API

1. Servicios (/api/services)

| Método | Endpoint | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/services` | Lista todos los servicios registrados. Admite filtros opcionales por query: `?category=` y `?available=` | `200`, `500` |
| **GET** | `/api/services/:sid` | Obtiene el detalle de un servicio por su ID | `200`, `404`, `500` |
| **POST** | `/api/services` | Crea y registra un nuevo servicio con un ID generado automáticamente mediante UUID | `201`, `400`, `500` |
| **PUT** | `/api/services/:sid` | Actualiza las propiedades de un servicio existente sin alterar su ID | `200`, `404`, `500` |
| **DELETE** | `/api/services/:sid` | Elimina un servicio del archivo JSON mediante su ID | `200`, `404`, `500` |

**Formato del cuerpo (POST y PUT de servicio):**

```json
{
  "name": "Corte y peinado",
  "description": "Servicio de peluquería completo",
  "duration": 45,
  "price": 8500,
  "category": "Peluquería",
  "available": true
}

```
---

2. Reservas (/api/bookings)

| Método | Endpoint | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/bookings` | Registra una nueva reserva de turno iniciando con `services: []` y estado `pending` por defecto | `201`, `400`, `500` |
| **GET** | `/api/bookings/:bid` | Obtiene una reserva por su ID con su listado de servicios asociados y sus cantidades | `200`, `404`, `500` |
| **POST** | `/api/bookings/:bid/services/:sid` | Agrega un servicio a la reserva o incrementa su cantidad si ya formaba parte de ella | `200`, `404`, `500` |

**Formato del cuerpo (POST de reserva):**

```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan.perez@example.com",
  "date": "2025-05-15",
  "time": "14:30",
  "status": "pending"
}
```
---

**Estructura del objeto de reserva persistido:**

```json
{
  "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "clientName": "Juan Pérez",
  "clientEmail": "juan.perez@example.com",
  "date": "2025-05-15",
  "time": "14:30",
  "status": "pending",
  "services": [
    {
      "service": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "quantity": 2
    }
  ]
}
```

---

## 💾 Persistencia de Datos

La información se almacena localmente en archivos JSON ubicados dentro del directorio `src/data/`:

* **`services.json`**: Almacena el catálogo completo de servicios disponibles.
* **`bookings.json`**: Almacena el registro de las reservas efectuadas y sus respectivos servicios agregados.