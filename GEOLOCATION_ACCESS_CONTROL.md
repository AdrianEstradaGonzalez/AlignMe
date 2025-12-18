# 🔐 Sistema de Control de Acceso por Geolocalización

Este documento describe cómo funciona el sistema de control de acceso basado en la ubicación geográfica para AlignMe.

## 📋 Resumen

La aplicación ahora verifica automáticamente la ubicación del usuario y solo permite el acceso a las federaciones que tienen los derechos de AlignMe (actualmente Asturias e Islas Baleares).

## 🎯 Funcionalidades Implementadas

### 1. **Detección Automática de Comunidad**
- Al abrir la app, se solicitan permisos de ubicación
- Se obtiene la ubicación GPS del usuario
- Se determina automáticamente la comunidad autónoma basándose en las coordenadas
- Si la comunidad está permitida, se establece automáticamente

### 2. **Validación de Acceso**
- Verifica si la comunidad detectada tiene derechos de AlignMe
- Lista de comunidades permitidas fácilmente configurable
- Bloquea el acceso a federaciones no autorizadas

### 3. **Alerta de Acceso Denegado**
- Muestra un modal informativo si la federación no tiene acceso
- Mensaje claro y profesional
- Opción para cerrar y contactar con la federación

### 4. **Configuración Flexible**
- Sistema modular y fácil de mantener
- Añadir/quitar comunidades es simple y directo

## 📁 Estructura de Archivos

```
AlignMe/
├── config/
│   └── allowedCommunities.ts      # Lista de comunidades permitidas
├── services/
│   └── geolocation.ts             # Servicio de geolocalización
├── components/
│   └── AccessDeniedAlert.tsx      # Alerta de acceso denegado
└── App.tsx                         # Lógica de validación integrada
```

## 🔧 Cómo Añadir una Nueva Comunidad

### Paso 1: Actualizar la lista de comunidades permitidas

En `config/allowedCommunities.ts`:

```typescript
export const ALLOWED_COMMUNITIES: CommunityId[] = [
  'asturias',
  'baleares',
  'cataluña',  // ← Nueva comunidad
];
```

### Paso 2: Agregar coordenadas geográficas

En `services/geolocation.ts`, añadir las coordenadas de la nueva comunidad:

```typescript
const COMMUNITY_BOUNDS: Record<CommunityId, CommunityBounds> = {
  asturias: { /* ... */ },
  baleares: { /* ... */ },
  cataluña: {
    name: 'Cataluña',
    latMin: 40.5,    // Límite sur
    latMax: 42.9,    // Límite norte
    lonMin: 0.2,     // Límite oeste
    lonMax: 3.3,     // Límite este
  },
};
```

### Paso 3: Crear el tema y assets

Seguir las instrucciones existentes en:
- `config/themes.ts` - Definir colores y estilo
- `config/assets.ts` - Añadir logos e imágenes

## 🔧 Cómo Quitar una Comunidad

Simplemente eliminarla de `ALLOWED_COMMUNITIES` en `config/allowedCommunities.ts`:

```typescript
export const ALLOWED_COMMUNITIES: CommunityId[] = [
  'asturias',
  // 'baleares',  // ← Comentada o eliminada
];
```

## 📍 Permisos de Ubicación

### Android
Los permisos se configuran en `android/app/src/main/AndroidManifest.xml`:
- `ACCESS_FINE_LOCATION` - Ubicación precisa
- `ACCESS_COARSE_LOCATION` - Ubicación aproximada

### iOS
Los permisos se configuran en `ios/AlignMe/Info.plist`:
- `NSLocationWhenInUseUsageDescription` - Descripción del uso de ubicación

## 🔍 Flujo de la Aplicación

1. **Inicio de la app**
   - Se muestra pantalla de carga
   - Se verifica si hay una comunidad guardada

2. **Sin comunidad guardada**
   - Se solicitan permisos de ubicación
   - Se detecta la comunidad automáticamente
   - Se valida si está permitida

3. **Comunidad permitida**
   - Se guarda automáticamente
   - Se carga la app normalmente

4. **Comunidad NO permitida**
   - Se muestra `AccessDeniedAlert`
   - Mensaje: "Tu federación no tiene los derechos de AlignMe"
   - Opción de cerrar el modal

5. **Sin permisos o fuera de área**
   - Se muestra el selector manual de comunidad
   - Usuario puede elegir manualmente

## 🛡️ Seguridad

- Validación doble: al detectar y al cargar la app
- No se puede bypasear fácilmente
- Las comunidades permitidas están definidas en código
- Verificación en cada inicio de la app

## 📦 Dependencias Añadidas

- `@react-native-community/geolocation@^3.4.0` - Para obtener ubicación GPS
- `react-native-permissions@^5.4.2` - Ya existía para permisos

## 🧪 Testing

Para probar diferentes ubicaciones en desarrollo:

### Android Emulator
```bash
# Usando adb
adb emu geo fix <longitude> <latitude>

# Ejemplo: Asturias
adb emu geo fix -6.0 43.3

# Ejemplo: Baleares
adb emu geo fix 2.6 39.6
```

### iOS Simulator
- Features > Location > Custom Location
- Introducir coordenadas manualmente

## 🌍 Coordenadas de Referencia

**Asturias:**
- Oviedo: 43.3614, -5.8493
- Gijón: 43.5322, -5.6611

**Islas Baleares:**
- Palma: 39.5696, 2.6502
- Ibiza: 38.9067, 1.4206

## ⚙️ Instalación

Para que funcione correctamente, ejecuta:

```bash
# Instalar dependencias
npm install

# iOS - Instalar pods
cd ios && pod install && cd ..

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
```

## 📝 Notas Importantes

1. Los permisos de ubicación se solicitan al inicio de la app
2. Si el usuario rechaza los permisos, verá el selector manual
3. La ubicación se verifica solo al inicio, no constantemente
4. Las coordenadas son aproximadas y pueden ajustarse según necesidad
5. El sistema es completamente modular y extensible

## 🤝 Soporte

Para cualquier duda o problema:
- Revisar los comentarios en cada archivo
- Consultar la documentación de React Native Geolocation
- Verificar que los permisos estén correctamente configurados

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
