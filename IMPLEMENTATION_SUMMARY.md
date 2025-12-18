# 📱 AlignMe v2.2.0 - Sistema de Actualizaciones Forzadas

## ✅ Implementación Completada

### Archivos Creados/Modificados

#### 1. Backend (Nuevo)
- **`backend/package.json`**: Configuración Node.js con Express y CORS
- **`backend/server.js`**: API REST con endpoint `/api/version`
- **`backend/.gitignore`**: Exclusión de node_modules
- **`backend/README.md`**: Guía completa de despliegue en Render

#### 2. App (Modificado)
- **`App.tsx`**: 
  - ✅ Import de `Linking` y `CustomAlert`
  - ✅ Import del servicio `checkAppVersion`
  - ✅ Hook `useEffect` para verificar versión al iniciar
  - ✅ Estado `showUpdateAlert` y `updateInfo`
  - ✅ Handlers para actualizar/descartar alerta
  - ✅ Renderizado de `CustomAlert` con mensaje personalizado

- **`services/versionCheck.ts`**: 
  - ✅ Lógica de comparación de versiones
  - ✅ Caché de 24h en AsyncStorage
  - ✅ Timeout de 10s para cold starts de Render
  - ✅ Soporte iOS/Android para enlaces de tiendas

- **`package.json`**: 
  - ✅ Versión actualizada de `0.0.1` → `2.2.0`

### Flujo de Funcionamiento

```
1. Usuario abre AlignMe
   ↓
2. App ejecuta checkAppVersion()
   ↓
3. Petición GET a https://alignme-backend.onrender.com/api/version
   ↓
4. Backend responde con:
   {
     minVersion: "2.2.0",
     currentVersion: "2.2.0",
     forceUpdate: false,
     storeLinks: {...}
   }
   ↓
5. App compara versión local con respuesta
   ↓
6. Si necesita actualizar:
   - Muestra CustomAlert con bandera de la comunidad
   - Botón "Aceptar" → Abre tienda (Google Play / App Store)
   - Si forceUpdate=true → No se puede cancelar
   ↓
7. Guarda timestamp en AsyncStorage (no vuelve a verificar en 24h)
```

### Características Implementadas

✅ **Actualización Opcional**: Si `forceUpdate=false`, usuario puede cerrar alerta  
✅ **Actualización Forzada**: Si `forceUpdate=true`, alerta no se puede cerrar  
✅ **Caché Inteligente**: Solo verifica 1 vez cada 24 horas  
✅ **Cold Start Resiliente**: Timeout de 10s para despertar backend de Render  
✅ **Multiplataforma**: Enlaces automáticos a Google Play (Android) o App Store (iOS)  
✅ **Branded Alert**: Usa `CustomAlert` existente con bandera de comunidad  

### Configuración del Backend

**Versión Actual**: `2.2.0`  
**Versión Mínima**: `2.2.0`  
**Forzar Actualización**: `false`

Para cambiar comportamiento, edita `backend/server.js`:

```javascript
const versionConfig = {
  minVersion: '2.3.0',      // ← Usuarios < 2.3.0 DEBEN actualizar
  currentVersion: '2.3.0',  // ← Última versión disponible
  forceUpdate: true,        // ← true = actualización obligatoria
  storeLinks: {
    android: 'https://play.google.com/store/apps/details?id=com.alignme',
    ios: 'https://apps.apple.com/app/id6753316011'
  }
};
```

## 🚀 Próximos Pasos

### 1. Desplegar Backend en Render
Sigue la guía en [`backend/README.md`](backend/README.md):
1. Haz commit de todos los cambios
2. Push a GitHub
3. Crea Web Service en Render.com (gratis)
4. Configura:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Copia la URL generada (ej: `https://alignme-backend-xyz.onrender.com`)

### 2. Actualizar URL del Backend
En [`services/versionCheck.ts`](services/versionCheck.ts), línea 4:
```typescript
const BACKEND_URL = 'https://tu-url-de-render.onrender.com'; // ← Actualiza aquí
```

### 3. Probar Localmente (Opcional)
```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: App
# Cambia BACKEND_URL a 'http://localhost:3000'
npm start
```

### 4. Build para Producción
```bash
# Android
cd android
./gradlew assembleRelease

# iOS
cd ios
pod install
# Luego abrir Xcode y archivar
```

### 5. Subir a Tiendas
- **Google Play Console**: APK/AAB de `android/app/build/outputs/`
- **App Store Connect**: Archivar desde Xcode

## 📊 Escenarios de Uso

### Escenario 1: Actualización Opcional
```javascript
// backend/server.js
minVersion: '2.2.0',
currentVersion: '2.3.0',
forceUpdate: false
```
→ Usuarios con 2.2.0 ven alerta, pueden cerrarla

### Escenario 2: Actualización Obligatoria
```javascript
minVersion: '2.3.0',
currentVersion: '2.3.0',
forceUpdate: true
```
→ Usuarios con < 2.3.0 NO pueden cerrar alerta

### Escenario 3: Bloqueo Total
```javascript
minVersion: '2.4.0',
currentVersion: '2.4.0',
forceUpdate: true
```
→ Cualquier versión < 2.4.0 bloqueada hasta actualizar

## 🔧 Troubleshooting

**Problema**: Backend tarda mucho en responder  
**Solución**: Es normal en Render Free (cold start). El timeout es de 10s.

**Problema**: Alerta no aparece  
**Solución**: 
1. Verifica que backend está desplegado
2. Verifica URL en `versionCheck.ts`
3. Limpia caché: elimina app y reinstala

**Problema**: Alerta aparece siempre  
**Solución**: AsyncStorage puede tener problemas. Código debería guardar timestamp correctamente.

## 📝 Notas Técnicas

- **CustomAlert**: Reutiliza componente existente (no se creó `UpdateAlert`)
- **Linking**: Nativo de React Native, no requiere instalación
- **AsyncStorage**: Ya instalado (`@react-native-async-storage/async-storage@2.1.0`)
- **Express**: Backend ultra-ligero, ~2MB instalado
- **Render Free**: 750h/mes gratis, auto-deploy desde GitHub

---

**🎯 Estado**: Listo para desplegar  
**📅 Fecha**: 2025-01-15  
**👨‍💻 Autor**: BlueDeBug  
**📱 App**: AlignMe v2.2.0
