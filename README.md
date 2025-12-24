# 🛒 Workify - E-commerce Full Stack

Plataforma de comercio electrónico desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js). Incluye gestión completa de usuarios, productos, carrito de compras y panel de administración avanzado.

> 🔗 **Demo Desplegada:** [Hacé clic acá para ver el proyecto en vivo](https://workifytienda.netlify.app/)

## 🚀 Características Principales

### 👤 Usuarios
* Registro e Inicio de Sesión seguro (JWT).
* Navegación por categorías y búsqueda inteligente.
* Carrito de compras persistente.

### 🛠️ Panel de Administración (Backoffice)
* **Gestión de Usuarios:** Listado paginado, bloqueo/desbloqueo de usuarios (Soft Delete) y protección contra autobloqueo.
* **Gestión de Productos:** CRUD completo (Crear, Leer, Actualizar, Borrar).
* **Productos Destacados:** Sistema de "estrellita" ⭐ para destacar productos manualmente y visualizarlos en el Slider del Home.
* **Buscador en Vivo:** Autocompletado en tiempo real en la barra de búsqueda.

### 🎨 Frontend
* Diseño responsivo con **React Bootstrap**.
* Sistema de notificaciones y alertas modales.
* Carrusel de imágenes dinámico.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
* React.js (Vite)
* React Bootstrap & Bootstrap 5
* React Router DOM
* Context API (Manejo de estado global y Autenticación)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose
* JWT (JSON Web Tokens) para seguridad
* Bcryptjs (Encriptación de contraseñas)

## 📦 Instalación y Despliegue

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/rodrigo420malabares/workify.git](https://github.com/rodrigo420malabares/workify.git)
    ```

2.  **Instalar dependencias:**
    ```bash
    # En carpeta backend
    cd backend
    npm install
    
    # En carpeta frontend
    cd ../frontend
    npm install
    ```

3.  **Variables de Entorno (.env):**
    
    * **Backend:** Crear un archivo `.env` en la carpeta `/backend` y completar con tus datos:
        ```env
        PORT=3000
        MONGODB_CNN=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_bd
        SECRETORPRIVATEKEY=palabra_secreta_para_jwt
        
        # Configuración de Cloudinary (Imágenes)
        CLOUDINARY_CLOUD_NAME=tu_cloud_name
        API_KEY_CLOUDINARY=tu_api_key
        API_SECRET_CLOUDINARY=tu_api_secret

        # Configuración de Email (Nodemailer)
        EMAIL_USER=tu_email@gmail.com
        EMAIL_PASS=tu_app_password_de_google
        ```

    * **Frontend:** Crear un archivo `.env` en la carpeta `/frontend`:
        ```env
        VITE_CLOUDINARY_URL=[https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload](https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload)
        VITE_CLOUDINARY_PRESET=tu_upload_preset
        ```
        ```


4.  **Ejecutar:**
    ```bash
    # Backend
    npm run dev
    
    # Frontend
    npm run dev
    ```

## 📸 Capturas

--

---
Desarrollado por **[Rodrigo Oscar Galarza]** - 2025
GitHub - https://github.com/rodrigo420malabares