# Sistema de Turnos y Reservas - Administrador de Servicios

Base inicial del backend para la gestión de servicios en un sistema de turnos y reservas, desarrollado con Node.js en módulos ECMAScript (ESM) y persistencia en archivos JSON.

---

## Estructura del Proyecto

```text
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── data/
│   │   └── services.json
│   ├── managers/
│   │   └── ServiceManager.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

```

---

## Requisitos y Variables de Entorno

El proyecto requiere las siguientes variables de entorno para su configuración:

- `PORT`: Puerto en el que corre la aplicación.
- `NODE_ENV`: Entorno de ejecución (`development`, `production`, etc.).

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PORT=8080
NODE_ENV=development

```

---

## Instalación y Ejecución
1. Clonar el repositorio.
2. Instalar dependencias con: npm install
3. Ejecutar el proyecto con: npm start
---
## Modelo de Datos (services)
- id: String (identificador único UUID)
- name: String (nombre del servicio)
- description: String (descripción del servicio)
- duration: Number (duración en minutos)
- price: Number (precio del servicio)
- category: String (categoría)
- available: Boolean (disponibilidad)
---
## Métodos de ServiceManager
La clase ServiceManager gestiona la persistencia en src/data/services.json:
1. getServices(): Obtiene la lista completa de servicios desde el archivo JSON.
2. getServiceById(id): Busca un servicio por su ID único; devuelve null si no existe.
3. addService(serviceData): Valida campos obligatorios, genera el ID con UUID y agrega el servicio.
4. updateService(id, updatedData): Actualiza las propiedades recibidas manteniendo el ID intacto.
5. deleteService(id): Elimina el servicio por su ID y devuelve el registro removido.