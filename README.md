# La Estación Licorera

> **Licores nacionales e importados al detal y al por mayor.**  
> Catálogo digital premium con atención personalizada y cotización inmediata a través de WhatsApp.

---

## 🥃 Sobre La Estación Licorera

**La Estación Licorera** es una empresa especializada en la comercialización y distribución de bebidas alcohólicas nacionales e importadas de las marcas más reconocidas del mercado. Ofrecemos atención al detal para clientes particulares y soluciones integrales de venta al por mayor para negocios, eventos, bares, restaurantes y distribuidores.

Nos distinguimos por:

- **Garantía de originalidad**: 100% productos originales y estampillados.
- **Precios competitivos**: Tarifas preferenciales para compras al detal y volumen mayorista.
- **Atención personalizada**: Asesoría inmediata para seleccionar los mejores licores según cada ocasión.
- **Envíos y entregas coordinadas**: Despachos eficientes en zona urbana y envíos nacionales.

---

## 🚀 Características del Sitio Web

Esta plataforma web actúa como un **catálogo digital interactivo y canal de ventas**, diseñado con una estética elegante y moderna en tonos oscuros y dorados para brindar una experiencia de usuario de nivel premium.

### Funcionalidades Clave

- **Hero Interactivo**: Presentación de la marca con acceso rápido al catálogo y cotización en un clic.
- **Catálogo Organizado por Categorías**: Navegación intuitiva entre Whisky, Ron, Tequila, Vodka, Vinos, Champañas, Cervezas, Aguardientes y Licores Importados.
- **Búsqueda y Filtros Dinámicos**: Filtrado instantáneo por nombre, marca, categoría y rango de precios.
- **Fichas de Producto Detalladas**: Información clara sobre marcas, presentaciones, notas de cata y precios sugeridos.
- **Integración Directa con WhatsApp**: Todos los botones de acción ("Consultar producto", "Solicitar cotización", "Hablar con asesor") generan un mensaje estructurado directo al canal de atención de WhatsApp.
- **Sección Especial para Mayoristas**: Espacio enfocado en beneficios comerciales para clientes corporativos y compras a gran escala.
- **Preguntas Frecuentes (FAQ)**: Respuestas rápidas en formato acordeón sobre envíos, pagos y compras mayoristas.
- **Diseño 100% Adaptativo (Responsive)**: Optimizado minuciosamente para smartphones, tablets y pantallas de escritorio.
- **Arquitectura Desacoplada**: Capa de servicios (`catalogService`) preparada para integrarse en el futuro con una API REST (ej. Spring Boot / PostgreSQL).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Enrutamiento**: [TanStack Router](https://tanstack.com/router)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones e Interacción**: Framer Motion / Lucide Icons
- **Servidor & Build**: Vite / Node.js
- **Formateo y Calidad**: Prettier + ESLint

---

## 📁 Estructura del Proyecto

```text
├── public/                  # Archivos estáticos e imágenes públicas
├── src/
│   ├── assets/              # Logos, imágenes de productos e ilustraciones
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, WhatsApp Flotante
│   │   ├── sections/        # Secciones de la landing (Hero, Productos, Mayoristas, FAQ, etc.)
│   │   └── ui/              # Componentes de interfaz reutilizables (Botones, Tarjetas, Modales)
│   ├── config/              # Configuración global del sitio (Teléfonos, Redes, Mensajes)
│   ├── data/                # Datos del catálogo de productos (Mock para API)
│   ├── hooks/               # Hooks personalizados de React (Scroll, Revelación, Movil)
│   ├── routes/              # Rutas principales de la aplicación
│   ├── services/            # Capa de servicio de productos (CatalogService)
│   ├── types/               # Definiciones y tipos TypeScript
│   └── styles.css           # Configuración global de CSS y Tailwind
├── package.json             # Dependencias y scripts del proyecto
└── tsconfig.json            # Configuración de TypeScript
```

---

## 💻 Instalación y Ejecución Local

### Requisitos Previos

- **Node.js** v18.0.0 o superior
- **npm** v9.0.0 o superior

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd la-estacion-licorera
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

---

## 📜 Scripts Disponibles

- `npm run dev`: Ejecuta la aplicación en modo desarrollo.
- `npm run build`: Compila y optimiza la aplicación para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Analiza el código en busca de errores o advertencias.
- `npm run format`: Aplica el formato automático de código con Prettier.

---

## ⚙️ Configuración del Sitio

Los datos de contacto, enlace de WhatsApp, eslogan y redes sociales de **La Estación Licorera** se pueden personalizar en el archivo:
`src/config/site.ts`

```typescript
export const SITE = {
  nombre: "La Estación",
  eslogan: "La mejor selección de licores nacionales e importados",
  whatsapp: "+573000000000",
  // ...
};
```

---

## 📄 Licencia

© 2026 **La Estación Licorera**. Todos los derechos reservados.
