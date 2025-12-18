# 🚀 AlignMe Backend - Despliegue en Render

Backend mínimo para control de versiones de AlignMe.

## 📋 Características

- ✅ Verificación de versión de app
- ✅ Control de actualizaciones forzadas
- ✅ Enlaces directos a tiendas (Google Play / App Store)
- ✅ API REST simple y ligera

## 🔧 Configuración Local

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Ejecutar servidor
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🌐 Desplegar en Render (GRATIS)

### Paso 1: Crear repositorio en GitHub
1. Asegúrate de que el código esté en GitHub
2. La carpeta `backend/` debe estar en la raíz del proyecto

### Paso 2: Crear Web Service en Render
1. Ve a [https://render.com](https://render.com) y crea cuenta (gratis)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

**Configuración:**
```
Name: alignme-backend
Region: Oregon (US West) o Frankfurt (EU Central)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Paso 3: Variables de entorno (opcional)
Si quieres usar variables de entorno en el futuro:
- En el dashboard de Render, ve a "Environment"
- Añade: `PORT=3000` (aunque Render asigna automáticamente)

### Paso 4: Deploy
1. Click en **"Create Web Service"**
2. Render automáticamente:
   - Detectará Node.js
   - Instalará dependencias
   - Ejecutará el servidor
3. En 2-3 minutos tendrás una URL tipo:
   ```
   https://alignme-backend.onrender.com
   ```

## 🔗 Actualizar URL en la App

Una vez desplegado, actualiza la URL del backend en `services/versionCheck.ts`:

```typescript
const BACKEND_URL = 'https://alignme-backend.onrender.com';
```

## 📡 Endpoints

### GET /api/version
Devuelve configuración de versión actual:
```json
{
  "minVersion": "2.2.0",
  "currentVersion": "2.2.0",
  "forceUpdate": false,
  "storeLinks": {
    "android": "https://play.google.com/store/apps/details?id=com.alignme",
    "ios": "https://apps.apple.com/app/id6753316011"
  }
}
```

### GET /health
Health check del servidor:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## 🎯 Gestionar Actualizaciones

### Para forzar actualización a todos los usuarios:
1. Edita `backend/server.js`:
```javascript
const versionConfig = {
  minVersion: '2.3.0',      // Aumenta esto
  currentVersion: '2.3.0',
  forceUpdate: true,        // Cambia a true
  // ...
};
```

2. Haz commit y push a GitHub
3. Render redesplegará automáticamente
4. Usuarios con versión < 2.3.0 verán alerta obligatoria

### Para recomendar actualización (no forzar):
```javascript
const versionConfig = {
  minVersion: '2.2.0',      // Mantén versión antigua
  currentVersion: '2.3.0',  // Sube versión recomendada
  forceUpdate: false,       // NO forzar
  // ...
};
```

## 💡 Notas Importantes

- **Plan FREE de Render**: 
  - ✅ 750 horas/mes gratis
  - ✅ Se duerme tras 15 min de inactividad
  - ✅ Primer request tras dormir tarda ~30 seg
  - ✅ Perfecto para este caso de uso

- **Cold starts**: Primera petición puede tardar. La app tiene timeout de 10s.

- **Auto-deploy**: Cada push a `main` redespliega automáticamente

## 🔄 Mantenimiento

El backend NO requiere mantenimiento regular. Solo edita cuando:
1. Lanzas nueva versión de la app
2. Quieres forzar actualización
3. Cambias enlaces de tiendas

---

**© 2025 BlueDeBug - AlignMe**
