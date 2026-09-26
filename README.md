# Shanghai Business Consulting S.R.L — Frontend V5

## Vista previa
Abrir esta carpeta en VS Code. En su terminal: `python3 -m http.server 5500`. Abrir `http://localhost:5500`. Si el puerto está ocupado, detener el servidor anterior o usar `python3 -m http.server 5501` y abrir 5501.

## Qué se cambió
- Identidad textual de SHANGHAI BUSINESS CONSULTING S.R.L / SOURCING AND TRADE CONECTOR en encabezados y pies de página. `assets/escudo.png` es un recorte del escudo **del logo anterior**, no una sustitución oficial del logo nuevo. Cambiar por archivo aprobado cuando esté disponible.
- Íconos SVG locales en `assets/icons.svg`: tarjetas de asesorías, ventajas, valores y Facebook/WhatsApp/TikTok/Instagram/Correo. Funcionan SIN CDN. Los de redes son iconos visuales; los enlaces oficiales están pendientes y no se inventaron.
- Resumen corto en `index.html`. **Texto ampliado solo en `asesorias-detalles.js`**: editar allí párrafos e ítems de cada asesoría, sin alargar tarjetas. Los textos ampliados son borradores para aprobación comercial.
- Botón Ver detalle abre ventana de desplazamiento interno y Solicitar más información abre `reserva.html` con asesoría elegida.
- Destacados de confianza: checks dorados, texto negro en negrita y titular dorado con espaciado compacto.

## Atención antes de publicar
1. La disponibilidad del calendario es DEMOSTRATIVA, no sincronizada con Supabase/Google; en esta versión se ha deshabilitado el envío real del formulario para evitar generar reservas con fechas ficticias o eventos incompletos. Integrar endpoint real de disponibilidad y completar Asana/Resend antes de habilitar envío.
2. Reemplazar contactos y URL oficiales. Redes sociales aparecen visualmente sin enlaces hasta recibir los reales.
3. Sustituir `assets/escudo.png` por el escudo corporativo actualizado y las fotos de `assets/` por las imágenes aprobadas; el logo anterior completo queda en `assets/logo.png` solo como respaldo y no se muestra.
4. Selector ES/EN/PT/RU/ZH todavía traduce solamente navegación y acciones principales; revisión de contenido completo pendiente.
5. Imágenes y textos de la maqueta son referencia. Verificar permisos de publicación, datos estadísticos y afirmaciones empresariales.

## Ajustes V5
- Se eliminó el selector de idiomas de todas las páginas y la traducción de JavaScript. El sitio queda solo en español.
- Se redujeron los íconos SVG (no imágenes) de asesorías, características, valores y redes; se mantiene la paleta corporativa.
