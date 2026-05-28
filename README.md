# ProviEmplea — Plataforma de Búsqueda Inversa de Talento Local

Aplicación web desarrollada con **React + Vite** como Evaluación de la Unidad 3 del curso de Desarrollo Frontend en el **Instituto San Sebastián (CIISA)**. El objetivo del proyecto es simular una plataforma de reclutamiento donde las empresas encuentran talento local de Providencia de manera proactiva, sin esperar que los candidatos postulen.

---

## Instalación y puesta en marcha

### Prerrequisitos

- Node.js v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/proviemplea.git
cd proviemplea

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El servidor levanta en `http://localhost:5173` por defecto.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR (Hot Module Replacement) |
| `npm run build` | Genera el bundle de producción optimizado en `/dist` |
| `npm run preview` | Sirve el build de producción localmente para verificarlo |
| `npm run lint` | Ejecuta ESLint sobre todos los archivos del proyecto |

---

## Estructura del proyecto

```
proviemplea/
├── public/
│   └── data/
│       └── testimonios.json        # Fuente de datos externa (simula un endpoint)
├── src/
│   ├── components/
│   │   ├── Navegacion.jsx          # Barra de navegación sticky con Flexbox
│   │   ├── Navegacion.css
│   │   ├── TarjetaCandidato.jsx    # Tarjeta reutilizable de perfil profesional
│   │   ├── TarjetaCandidato.css
│   │   ├── CarruselTestimonios.jsx # Carrusel con fetch asíncrono y estados de carga
│   │   ├── CarruselTestimonios.css
│   │   ├── FormularioContacto.jsx  # Formulario con validación y protección Honeypot
│   │   └── FormularioContacto.css
│   ├── App.jsx                     # Componente raíz — orquesta la página completa
│   ├── App.css                     # CSS Grid responsivo para la grilla de candidatos
│   ├── index.css                   # Variables CSS globales y estilos base
│   └── main.jsx                    # Punto de entrada de React
├── index.html
├── vite.config.js
└── package.json
```

---

## Decisiones técnicas

### Componentes reutilizables

Se optó por descomponer la interfaz en componentes independientes (`TarjetaCandidato`, `Navegacion`, `CarruselTestimonios`, `FormularioContacto`) siguiendo el principio de **responsabilidad única**. Esto permite:

- **Reutilización**: `TarjetaCandidato` acepta `nombre` y `profesion` como props, lo que permite renderizar cualquier cantidad de perfiles sin duplicar código.
- **Mantenibilidad**: un cambio de diseño en la tarjeta solo se hace en un lugar y se propaga a todas las instancias.
- **Escalabilidad**: agregar un nuevo bloque (por ejemplo, un footer o una sección de estadísticas) no requiere modificar componentes existentes.

### CSS Grid para la grilla responsiva

La grilla de candidatos usa la declaración:

```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

Esta única línea reemplaza múltiples media queries manuales: el navegador calcula automáticamente cuántas columnas caben según el ancho disponible. En pantallas grandes se muestran 4 columnas; en tablet, 2; en móvil, 1. Se eligió **CSS Grid** sobre Flexbox para este bloque porque Grid opera en **dos dimensiones** (filas y columnas), que es exactamente lo que requiere una grilla de tarjetas.

### Flexbox en la navegación

La barra de navegación usa `display: flex` con `justify-content: space-between` porque solo necesita alinear elementos en **una dimensión** (fila horizontal). Flexbox es la herramienta correcta para componentes lineales como headers, barras de herramientas o grupos de botones.

### Consumo de datos asíncrono con `useEffect` + `fetch`

Los datos de testimonios se almacenan en `public/data/testimonios.json` y se cargan de forma asíncrona mediante `fetch` dentro de un `useEffect`. Este patrón demuestra:

1. **Separación de datos y presentación**: el componente no sabe de dónde vienen los datos, solo los renderiza.
2. **Manejo explícito de estados**: el componente diferencia entre *cargando*, *error* y *datos listos*, ofreciendo feedback visual al usuario en cada caso.
3. **Portabilidad hacia APIs reales**: para conectar una API de producción, solo se cambia la URL del `fetch`; el componente no necesita modificaciones.

### Formulario con validación y Honeypot

El formulario implementa dos capas de protección ante envíos inválidos:

1. **Validación del cliente**: verifica que los campos obligatorios no estén vacíos y que el correo tenga formato válido antes de procesar el envío.
2. **Honeypot**: un campo de texto (`apellidoOculto`) invisible para el usuario —oculto con `display: none` y excluido del teclado con `tabIndex="-1"`— actúa como trampa. Un bot que rellena formularios automáticamente detecta el campo en el DOM y lo completa, delatándose. La aplicación lo detecta y descarta el envío silenciosamente sin alertar al atacante.

---

## Retrospectiva — Resolución de problemas

### Permisos de ejecución en PowerShell (Windows)

Al ejecutar `npm run dev` por primera vez en Windows, PowerShell puede bloquear la ejecución de scripts con el error:

```
cannot be loaded because running scripts is disabled on this system.
```

**Solución aplicada**: abrir PowerShell como Administrador y ejecutar:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Esto habilita los scripts locales firmados sin comprometer la seguridad global del sistema.

### Protección contra bots en formularios web

Los formularios de contacto públicos son objetivo frecuente de bots de spam que envían solicitudes automáticas. La técnica Honeypot implementada es transparente para usuarios reales (no ven el campo ni pueden alcanzarlo con Tab), pero los bots lo detectan en el HTML y lo rellenan. La lógica en `manejarEnvio` detecta esto y corta la ejecución sin mostrar ningún mensaje de error, evitando que el bot sepa que fue bloqueado.

### Bug: reset incompleto del formulario tras envío exitoso

Durante el desarrollo se detectó que el objeto de reset del formulario no incluía el campo `apellidoOculto`, lo que provocaba una advertencia de React:

```
Warning: A component is changing a controlled input to be uncontrolled.
```

**Solución**: incluir `apellidoOculto: ''` en el estado de reset, asegurando que todos los inputs controlados mantengan su valor sincronizado con el estado en todo momento.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Librería de UI basada en componentes |
| Vite | 8 | Bundler ultrarrápido con HMR |
| CSS Grid | — | Layout responsivo bidimensional |
| CSS Flexbox | — | Layout lineal (navegación, formularios) |
| ESLint | 10 | Análisis estático y calidad de código |

---

## Autor

**Diego Abaroa** — Estudiante de Desarrollo Frontend  
Instituto San Sebastián (CIISA) · Evaluación Unidad 3 · 2026
