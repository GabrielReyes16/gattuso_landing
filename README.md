# 🍗 La Brasería del Sabor - Landing Page

Landing page moderna para pollería peruana, desarrollada con Next.js 15, Tailwind CSS y Framer Motion.

## 🚀 Cómo Correr el Proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 3. Abrir en el navegador
Visita: **http://localhost:3000**

---

## 🔌 Configuración de Supabase

### Paso 1: Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice

### Paso 2: Configurar variables de entorno
1. Copia `.env.example` a `.env.local`:
   ```bash
   copy .env.example .env.local
   ```
2. En Supabase, ve a **Settings > API**
3. Copia la **URL** y **anon public key** a `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

### Paso 3: Crear tabla de productos
En el **SQL Editor** de Supabase, ejecuta:

```sql
-- Tabla de productos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category VARCHAR(50) CHECK (category IN ('brasas', 'combos', 'bebidas')),
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Productos visibles para todos" 
ON products FOR SELECT 
USING (true);

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, image_url, category, is_popular) VALUES
('1/4 Pollo a la Brasa', 'Jugoso cuarto de pollo con papas fritas, ensalada y cremas.', 18.90, '', 'brasas', true),
('1/2 Pollo a la Brasa', 'Medio pollo dorado al carbón con papas, ensalada y ají.', 32.90, '', 'brasas', true),
('Pollo Entero a la Brasa', 'Pollo entero para compartir con papas, ensalada y salsas.', 59.90, '', 'brasas', true),
('Combo Familiar', 'Pollo entero + 2 porciones de papas + bebida 1.5L + ensalada.', 79.90, '', 'combos', true),
('Chicha Morada', 'Refrescante chicha morada casera. Jarra 1L.', 12.90, '', 'bebidas', false);
```

### Paso 4: Configurar Storage para imágenes
1. En Supabase, ve a **Storage**
2. Crea un **nuevo bucket** llamado `products`
3. Hazlo **público** (Public bucket)
4. Sube tus imágenes de productos
5. Copia la URL pública de cada imagen y actualízala en la tabla `products`

**Ejemplo de URL de imagen:**
```
https://tu-proyecto.supabase.co/storage/v1/object/public/products/pollo-entero.webp
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css      # Estilos globales y paleta de colores
│   ├── layout.tsx       # Layout con SEO y fuente Outfit
│   └── page.tsx         # Página principal
├── components/
│   ├── Navbar.tsx       # Barra de navegación sticky
│   ├── Hero.tsx         # Sección principal con CTA
│   ├── Menu.tsx         # Carta con filtros por categoría
│   ├── ProductCard.tsx  # Tarjeta de producto
│   ├── Contact.tsx      # Mapa, horarios y delivery
│   ├── Footer.tsx       # Pie de página
│   └── WhatsAppFAB.tsx  # Botón flotante de WhatsApp
├── lib/
│   ├── mock-data.ts     # Datos de prueba
│   └── supabase.ts      # Cliente y funciones de Supabase
└── types/
    └── index.ts         # Interfaces TypeScript
```

---

## 🎨 Personalización

### Cambiar colores
Edita `src/app/globals.css`:
```css
:root {
  --brasa-red: #e11d48;      /* Color principal */
  --warm-orange: #f97316;    /* Acento cálido */
  --golden-yellow: #eab308;  /* Dorado */
}
```

### Cambiar información del negocio
Edita `src/lib/mock-data.ts`:
```typescript
export const businessInfo = {
  name: 'Tu Pollería',
  phone: '+51999999999',
  address: 'Tu dirección',
  // ...
};
```

---

## 📦 Build para Producción

```bash
npm run build
npm start
```

## 🚀 Deploy en Vercel

1. Sube tu código a GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Agrega las variables de entorno en Vercel
4. ¡Deploy automático!
