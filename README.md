# LISTADO DE CLIENTES  
## TRABAJO PRÁCTICO Nº2

Este proyecto consiste en la creación de un gestor de clientes, dentro del cual se permite listar, buscar, crear, eliminar, modificar y ver detalles de clientes registrados.

---

## CREACIÓN DEL PROYECTO

### SQL

1. Se crea la tabla CLIENTE con id único y secuencial, DNI, Apellido, Nombre, Dirección y Teléfono. Solo Teléfono permite NULL.  
2. Se insertan 3 datos a la tabla para poder ejecutar pruebas.

### C#

1. Se usa ASP.NET Core Web API para el proyecto y se crea desde consola con el comando:  
   `dotnet new webapi -n ClientesAPI`  

2. Dentro de la carpeta `Controllers` se crea la clase `ClientesController.cs`.  
3. Se crean las carpetas `Models` (con la clase `Cliente.cs` dentro) y `Data` (con la clase `AppDbContext.cs` dentro).  

**Propósito de cada archivo:**  
- `Models/Cliente.cs` se usa para mapear la tabla de SQL. Define qué datos se manejan.  
- `Data/AppDbContext.cs` se usa como “puente” entre SQL y la API. Se configura la conexión por medio del `appsettings.json`.  
- `Controllers/ClientesController.cs` controla el flujo de datos por medio de los endpoints (GET, SET, POST, etc).  

4. En `appsettings.json` se agrega:  
   `"ConnectionStrings": { "DefaultConnection": "ACA VA LA CADENA DE CONEXIÓN" }`

### REACT

1. Se crea el proyecto con los comandos:  
   `npm create vite@latest clientes-frontend -- --template react`  
   `cd clientes-frontend`

2. Se agregan las dependencias:  
   `npm install`  
   `npm install axios wouter react-hook-form zod @hookform/resolvers`  
   `npm install sonner`  
   `npm install sweetalert2`

Se crean las carpetas `components`, `pages` y `services` dentro de `src` y los archivos `.jsx` de cada una:  
- `src/components/ClienteForm.jsx`  
- `src/components/Footer.jsx`  
- `src/components/Navbar.jsx`  
- `src/pages/Home.jsx`  
- `src/pages/CrearCliente.jsx`  
- `src/pages/EditarCliente.jsx`  
- `src/pages/DetalleCliente.jsx`  
- `src/services/api.jsx`  

(También se crean los `.css` de cada una y la carpeta `IMG` dentro de `public` para las imágenes y favicons)

---

## EJECUCIÓN DEL PROYECTO

1. Abrir C# y conectar con la cadena de conexión correspondiente del SQL (en `appsettings.json`).  
2. Ejecutar con Ctrl+F5 para abrir Swagger. **CAMBIAR HTTPS POR HTTP ANTES DE EJECUTAR.** Esto es en caso de que el navegador no confíe en los certificados, como nos pasó a nosotros.  
3. Abrir el front, instalar dependencias y en terminal ejecutar:  
   `npm run dev`  
4. **VERIFICAR LOS PUERTOS DE LOCALHOST** (asegura que el front conecte con la API):  
   En C#:  
   - `program.cs`  
   - `Properties/launchSettings.json`  
   En React:  
   - `src/services/api.js`
