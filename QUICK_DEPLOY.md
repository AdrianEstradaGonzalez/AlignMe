# ⚡ Guía Rápida de Despliegue

## 🎯 Objetivo
Desplegar backend de control de versiones en Render.com (GRATIS) en 5 minutos.

## 📋 Pre-requisitos
- ✅ Código en GitHub
- ✅ Cuenta en Render.com (gratis, sin tarjeta)

## 🚀 Pasos

### 1. Preparar GitHub
```bash
# Asegúrate de que todo está commiteado
git add .
git commit -m "feat: añadir backend de control de versiones v2.2.0"
git push origin main
```

### 2. Crear Web Service en Render
1. Ve a https://render.com y haz login
2. Click **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona tu repo `AlignMe`

### 3. Configurar Servicio
**Nombre**: `alignme-backend`  
**Region**: `Oregon (US West)` o `Frankfurt (EU Central)`  
**Branch**: `main`  
**Root Directory**: `backend`  
**Runtime**: `Node`  
**Build Command**: `npm install`  
**Start Command**: `npm start`  
**Instance Type**: `Free`

### 4. Deploy
1. Click **"Create Web Service"**
2. Espera 2-3 minutos
3. Render te dará una URL tipo:
   ```
   https://alignme-backend-xyz.onrender.com
   ```

### 5. Actualizar App
Edita `services/versionCheck.ts` línea 4:
```typescript
const BACKEND_URL = 'https://alignme-backend-xyz.onrender.com'; // ← Tu URL aquí
```

### 6. Probar Backend
Abre en el navegador:
```
https://tu-url.onrender.com/api/version
```

Deberías ver:
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

### 7. Build y Publicar App
```bash
# Android
cd android
./gradlew assembleRelease

# iOS
cd ios
pod install
# Luego Xcode → Product → Archive
```

## ✅ ¡Listo!
Tu sistema de actualizaciones forzadas está funcionando.

## 🔄 Gestión de Versiones

### Forzar Actualización
1. Edita `backend/server.js`:
   ```javascript
   const versionConfig = {
     minVersion: '2.3.0',    // ← Aumentar
     currentVersion: '2.3.0',
     forceUpdate: true,      // ← Activar
     // ...
   };
   ```
2. Commit y push a GitHub
3. Render redespliega automáticamente en ~1 minuto
4. Usuarios verán alerta obligatoria

### Recomendar Actualización (no forzar)
```javascript
const versionConfig = {
  minVersion: '2.2.0',      // ← Mantener
  currentVersion: '2.3.0',  // ← Aumentar
  forceUpdate: false,       // ← Desactivar
  // ...
};
```

## 💡 Notas
- **Cold Start**: Primera petición tras 15min de inactividad tarda ~30s
- **Auto-Deploy**: Cada push a main redespliega automáticamente
- **Logs**: Ver en Render dashboard → Logs
- **Gratis**: 750h/mes (más que suficiente)

---

**© 2025 BlueDeBug**
