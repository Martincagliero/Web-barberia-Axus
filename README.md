# 💈 Elite Barbershop - Web Premium

Sitio web profesional y elegante para barbería de alto nivel, con sistema de reserva de turnos integrado.

## 🎨 Características de Diseño

### Paleta de Colores
- **Principal**: Negro profundo (`#0a0e1a`)
- **Secundario**: Azul petróleo oscuro (`#1a2332`)
- **Terciario**: Gris profundo (`#2d3e50`)
- **Acento**: Dorado (`#d4a574`)

### Tipografía
- **Display**: Playfair Display (títulos y headlines)
- **Cuerpo**: Inter (texto general)

### Estilo Visual
- Hero con imagen en blanco y negro
- Overlay oscuro con gradiente
- Animaciones sutiles (fade-in, parallax)
- Diseño minimalista y editorial
- Completamente responsive

## 📋 Secciones

1. **Home/Hero**: Imagen impactante con frase de marca
2. **Servicios**: Grid de 6 servicios con precios
3. **Trabajos**: Galería de trabajos destacados
4. **Turnos**: Sistema de reserva integrado y elegante
5. **Contacto**: Información y mapa

## 🚀 Uso

### Abrir la Web
1. Abre el archivo `index.html` en tu navegador
2. O usa un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   ```
3. Navega a `http://localhost:8000`

### Sistema de Turnos
El sistema de turnos funciona completamente en el frontend:
- Muestra los próximos 7 días (excluyendo domingos)
- Horarios de 10:00 a 19:30 en intervalos de 30 minutos
- Algunos horarios aparecen como "no disponibles" aleatoriamente
- El cliente completa: servicio, fecha, hora, nombre y teléfono
- Al confirmar, se muestra un mensaje de confirmación

### Personalización

#### Cambiar Imágenes
Para agregar tus propias imágenes:

1. **Hero Principal** (línea 96 de `styles.css`):
   - Reemplaza la URL de Unsplash con tu imagen
   - Recomendado: 1920x1080px, imagen de barbería o grooming
   - Debe tener buen contraste para el texto blanco

2. **Galería de Trabajos**:
   - Reemplaza los placeholders en `index.html` (líneas 147-176)
   - Formato recomendado:
   ```html
   <div class="gallery-item">
       <img src="ruta/a/tu/imagen.jpg" alt="Descripción">
   </div>
   ```
   - Tamaño recomendado: 800x800px (cuadradas)

#### Modificar Servicios
En `index.html`, sección de servicios (líneas 60-95):
- Cambia nombres, descripciones y precios
- Ajusta los emojis/iconos
- Agrega o elimina servicios según necesites

#### Actualizar Información de Contacto
En `index.html`, sección de contacto (líneas 228-265):
- Dirección
- Horarios de atención
- Teléfono y email
- Links de redes sociales

#### Integrar Google Maps
Reemplaza el placeholder del mapa (línea 268 de `index.html`):
```html
<iframe 
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
    width="100%" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

## 🔧 Personalización Avanzada

### Cambiar Colores
Edita las variables CSS en `styles.css` (líneas 5-18):
```css
:root {
    --color-primary: #0a0e1a;      /* Fondo principal */
    --color-accent: #d4a574;        /* Color de acento */
    /* ... etc */
}
```

### Modificar Horarios Disponibles
En `script.js` (líneas 68-72):
```javascript
const availableSlots = [
    '10:00', '10:30', '11:00', // ... tus horarios
];
```

### Conectar con Backend
Para conectar el sistema de turnos con un servidor:

1. En `script.js`, función `bookingBtn.addEventListener` (línea 220)
2. Reemplaza el `console.log` con una llamada API:

```javascript
// Ejemplo con fetch
fetch('/api/bookings', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingState)
})
.then(response => response.json())
.then(data => {
    console.log('Reserva guardada:', data);
    // Mostrar confirmación
})
.catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al procesar tu reserva');
});
```

## 📱 Responsive

La web es completamente responsive:
- Desktop: 1400px+ (diseño completo)
- Tablet: 768px-1399px (grid adaptativo)
- Mobile: 320px-767px (menú hamburguesa, columna única)

## ⚡ Optimizaciones

### Performance
- Fonts precargadas con `preconnect`
- Animaciones con `transform` y `opacity` (GPU)
- Lazy loading para imágenes (agregar atributo `loading="lazy"`)
- Scroll suave con `requestAnimationFrame`

### SEO
- Meta descripción incluida
- Estructura semántica (nav, section, footer)
- Alt text en imágenes (agregar cuando uses imágenes reales)

### Accesibilidad
- Contraste de colores WCAG AA compliant
- Labels en formularios
- ARIA labels en iconos de redes sociales
- Navegación por teclado funcional

## 🎯 Mejoras Futuras

Para convertir esto en una web completa de producción:

1. **Backend**:
   - API REST para gestión de turnos
   - Base de datos (MySQL, PostgreSQL, MongoDB)
   - Autenticación para panel admin
   - Envío de emails/SMS de confirmación

2. **Funcionalidades**:
   - Panel de administración
   - Cancelación/modificación de turnos
   - Sistema de pagos
   - Historial de clientes
   - Programa de fidelización

3. **Contenido**:
   - Imágenes profesionales propias
   - Testimonios de clientes
   - Blog/noticias
   - Galería ampliada

4. **Optimización**:
   - Minificación de CSS/JS
   - Compresión de imágenes (WebP)
   - CDN para assets
   - PWA (Progressive Web App)

## 📄 Estructura de Archivos

```
web barberia/
├── index.html          # Estructura principal
├── styles.css          # Todos los estilos
├── script.js           # Funcionalidad interactiva
└── README.md           # Este archivo
```

## 🎨 Recursos Recomendados para Imágenes

### Sitios de Imágenes Gratuitas
- **Unsplash** (https://unsplash.com/s/photos/barbershop)
- **Pexels** (https://www.pexels.com/search/barber/)
- **Pixabay** (https://pixabay.com/es/images/search/barbero/)

### Palabras Clave de Búsqueda
- "barbershop interior"
- "barber cutting hair"
- "classic barbershop"
- "male grooming"
- "beard trim"
- "hair styling"

### Especificaciones Técnicas
- **Hero**: 1920x1080px, horizontal, alta calidad
- **Galería**: 800x800px, cuadradas, consistencia visual
- **Formato**: JPG (fotografías), PNG (logos/iconos)
- **Peso**: < 500KB por imagen (optimizadas)

## 🛠️ Soporte

Para modificaciones o dudas sobre el código:
- Los comentarios en el código explican cada sección
- Todas las variables CSS están centralizadas
- El JavaScript está modularizado por funcionalidad

## 📝 Licencia

Proyecto de ejemplo para uso educativo y comercial.

---

**¡Tu barbería premium lista para impresionar!** 💈✨
