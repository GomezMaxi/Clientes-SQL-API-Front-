# Gestor de Clientes

Aplicación Full Stack orientada a la gestión de clientes que permite realizar operaciones CRUD, búsquedas y visualización de información detallada.  
El proyecto simula una solución real de gestión, integrando frontend, backend y base de datos.

---

## 🚀 Funcionalidades
- Alta, baja y modificación de clientes
- Listado general
- Búsqueda por criterios
- Visualización de detalles
- Validaciones en formularios
- Comunicación frontend ↔ API REST

---

## 🧩 Arquitectura
El sistema está compuesto por:

- **Frontend:** Aplicación web desarrollada en React
- **Backend:** API REST desarrollada con ASP.NET Core Web API
- **Base de datos:** SQL Server

La comunicación entre el frontend y el backend se realiza mediante solicitudes HTTP a endpoints REST, con persistencia de datos en una base relacional.

---

## 🛠 Tecnologías utilizadas
- React
- Axios
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server
- HTML / CSS / JavaScript

---

## ▶️ Ejecución del proyecto (entorno local)

### Backend
1. Configurar la cadena de conexión en `appsettings.json`
2. Ejecutar el proyecto para levantar la API

### Frontend
1. Instalar dependencias
   ```bash
   npm install
   npm install axios wouter react-hook-form zod @hookform/resolvers
   npm install sonner
   npm install sweetalert2
   

2. Ejecutar el proyecto
   ```bash
   npm run dev
