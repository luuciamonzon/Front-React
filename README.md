# CRUD React + Vite - Frontend

Este proyecto corresponde al *frontend de una aplicación CRUD* de productos y usuarios, desarrollado con *React* y *Vite*.

---

## Requisitos Previos

- *Node.js* instalado  
- *Git* para clonar el repositorio  

---

## Instalación y Ejecución

1. *Clonar el repositorio:*  
```bash
git clone https://github.com/luuciamonzon/FRONT-REACT.git
cd FRONT-REACT

2. *Instalar dependencias:* 
```bash
npm install

3. *Ejecutar en modo desarrollo:* 
```bash
npm run dev

## Funcionalidades Principales

Autenticación y Autorización
	•	Login y logout con JWT
	•	Protección de rutas privadas
	•	Control de acceso según roles (admin, moderador, cliente)

Gestión de Productos
	•	CRUD completo de productos
	•	Búsqueda y filtrado
	•	Restricciones de acceso según rol

Gestión de Usuarios
	•	CRUD completo de usuarios
	•	Asignación y cambio de roles (solo admin)
	•	Búsqueda y filtrado

Interfaz de Usuario
	•	Navbar condicional según sesión
	•	Diseño responsive
	•	Confirmación en eliminaciones
	•	Notificaciones con toasts

⸻

## Tecnologías Utilizadas
	•	React 18 + Vite
	•	PrimeReact (componentes UI)
	•	Context API (gestión de estado)
	•	Formik + Yup (validaciones de formularios)
	•	CSS personalizado + PrimeReact
	•	JWT (autenticación)

## Estructura del proyecto

src/
├── components/          # Componentes reutilizables
├── context/             # Contextos de React (Auth, Products, Users)
├── layouts/             # Vistas principales
│   ├── auth/            # Login y registro
│   ├── home/            # Página principal
│   ├── products/        # Gestión de productos
│   └── users/           # Gestión de usuarios
├── utils/               # Funciones auxiliares
└── App.jsx              # Componente raíz

## Ejemplo de datos
Producto:
{
  "id": 1,
  "nombre": "Monitor",
  "precio": 48000
}
Usuario:
{
  "id": 1,
  "nombre": "Usuario Test",
  "email": "usuario@test.com",
  "password": "password123",
  "edad": 25,
  "rol": "cliente"
}

## Contribución
	1.	Haz un fork del proyecto
	2.	Crea una rama para tu feature (git checkout -b feature/NuevaFeature)
	3.	Haz commit de tus cambios (git commit -m 'Agrego nueva funcionalidad')
	4.	Haz push a la rama (git push origin feature/NuevaFeature)
	5.	Abre un Pull Request

⸻

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y compartirlo libremente.
