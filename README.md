# EcoGlow

Plataforma web para el Festival Internacional de las Luciérnagas 2026.
Permite a los visitantes explorar parques oficiales, consultar disponibilidad
y realizar reservaciones de forma sencilla y centralizada.

---

## Equipo

**Los Iluminados** — Diseño de Interfaces de Usuario 2026-2, Facultad de Ciencias, UNAM

| Nombre | Rol |
|---|---|
| Fernanda Ixchel Velazquez Vilchis | Líder del Proyecto |
| Hazel Torres Nava | Diseñador UX/UI |
| José Eduardo Cruz Campos | Desarrollador Frontend |
| Zianya Nenetzi Trujillo Beltrán | Tester |
| Daniel Flores Doniz | Apoyo Frontend |

---

## Requisitos previos

Antes de correr el proyecto necesitas tener instalado:

### 1. Node.js

Node.js es el entorno que permite ejecutar JavaScript fuera del navegador.
npm (el gestor de paquetes) viene incluido con Node.js.

1. Ve a [https://nodejs.org]
2. Descarga la versión **LTS** (la recomendada)
3. Instala siguiendo el asistente
4. Verifica la instalación abriendo una terminal y ejecutando:

```bash
node --version
npm --version
```

Deberías ver algo como `v20.x.x` y `10.x.x`.

### 2. Git (opcional pero recomendado)

1. Ve a [https://git-scm.com]
2. Descarga e instala para tu sistema operativo
3. Verifica con:

```bash
git --version
```

---

## Instalación

### 1. Clona o descarga el proyecto

Si tienes Git:
```bash
git clone https://github.com/EduardoCruz0324/Luciernagas-UI.git
cd Luciernagas-UI
```

Si no tienes Git, descarga el ZIP del repositorio y descomprímelo.

### 2. Instala las dependencias

Desde la raíz del proyecto ejecuta:

```bash
npm install
```

Esto instalará todas las librerías necesarias listadas en `package.json`.

### 3. Corre el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en [http://localhost:5173]

---

## Credenciales de prueba

Para iniciar sesión en la plataforma usa cualquiera de estos usuarios del mockdata:

| Email | Contraseña |
|---|---|
| alan@gmail.com | 1234 |
| maria@gmail.com | 1234 |

También puedes usar los botones de **Continuar con Google** o **Continuar con Apple**
que simulan un inicio de sesión social.

---

## Estructura del proyecto

```
LUCIERNAGAS/
├── public/                         # Archivos estáticos públicos
│   ├── logo.png                    # Logo de EcoGlow
│   ├── Festival.png                # Imagen del festival para Home
│   └── parques/                    # Imágenes de los parques
│       ├── bosque-esmeralda/
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       ├── canto-del-bosque/
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       ├── bosque-magico/
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       ├── eco-reino-aventura/
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       └── bosque-arboles-navidad/
│           ├── foto1.jpg
│           ├── foto2.jpg
│           └── foto3.jpg
│
├── src/
│   ├── assets/                     # Recursos internos de Vite
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── Navbar.jsx              # Barra de navegación principal
│   │   ├── Navbar.css
│   │   ├── ModalPago.jsx           # Modal de proceso de pago
│   │   ├── ModalPago.css
│   │   └── ProtectedRoute.jsx      # Protección de rutas privadas
│   │
│   ├── context/
│   │   └── AuthContext.jsx         # Contexto global de autenticación
│   │
│   ├── data/                       # Mockdata (simula base de datos)
│   │   ├── parques.js              # Información de los 5 parques
│   │   └── usuarios.js             # Usuarios de prueba con reservaciones
│   │
│   ├── pages/                      # Páginas de la aplicación
│   │   ├── Login.jsx               # Página de autenticación (2 pasos)
│   │   ├── Login.css
│   │   ├── Home.jsx                # Página principal del festival
│   │   ├── Home.css
│   │   ├── Explorar.jsx            # Explorador de parques con mapa
│   │   ├── Explorar.css
│   │   ├── DetalleParque.jsx       # Detalle + reservación + pago
│   │   ├── DetalleParque.css
│   │   ├── Perfil.jsx              # Perfil + historial + QR
│   │   ├── Perfil.css
│   │   ├── Acerca.jsx              # Info del festival + FAQ
│   │   └── Acerca.css
│   │
│   ├── styles/
│   │   └── variables.css           # Variables CSS (paleta, tipografía)
│   │
│   ├── App.jsx                     # Configuración de rutas
│   ├── index.css                   # Estilos globales + importación de fuentes
│   └── main.jsx                    # Punto de entrada de React
│
├── index.html                      # HTML base de Vite
├── vite.config.js                  # Configuración de Vite
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo
```

---

## Rutas de la aplicación

| Ruta | Página | Protegida |
|---|---|---|
| `/` | Login | No |
| `/home` | Home — Festival | Sí |
| `/explorar` | Explorar parques + mapa | Sí |
| `/parque/:slug` | Detalle del parque + reserva | Sí |
| `/perfil` | Mi Perfil + historial + QR | Sí |
| `/acerca` | Acerca del festival + FAQ | Sí |

Las rutas protegidas redirigen al Login si no hay sesión activa.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | Framework de UI |
| Vite | 5 | Bundler y servidor de desarrollo |
| React Router DOM | 6 | Navegación entre páginas |
| React Leaflet | 4 | Mapa interactivo de parques |
| Leaflet | 1 | Motor del mapa |
| Lucide React | 0.383 | Íconos |
| QRCode React | 3 | Generación de códigos QR |

---

## Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Azul Medianoche | `#0D1B2A` | Fondo principal |
| Verde Bosque | `#1A3A2A` | Fondos secundarios |
| Ámbar Luciérnaga | `#F5C842` | Acento / botones CTA |
| Verde Bioluminiscente | `#7FFF9E` | Highlights / estados activos |
| Púrpura Crepúsculo | `#2D1B5E` | Tarjetas / secciones especiales |
| Crema Suave | `#E8E1C7` | Texto principal |

---

## Scripts disponibles

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview

# Linter
npm run lint
```

---

## Notas de desarrollo

- Los datos de parques y usuarios son simulados, esto quiere decir que
  no hay backend real.
  Para migrar a backend real, solo hay que reemplazar las importaciones
  de `src/data/` por llamadas a una API.

- La autenticación es tambén simulada con `localStorage`. En producción
  se reemplazaría por JWT o un servicio como Firebase Auth.

- El proceso de pago es simulado, no se insertan datos reales, solo se verifica 
  que cumplan con especificacioens de pago real (digitos, nombre, etc.).

- Los mapas usan OpenStreetMap a través de Leaflet, sin necesidad
  de alguna API key.
