const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de versiones
const versionConfig = {
  minVersion: '2.2.0',      // Versión mínima requerida
  currentVersion: '2.2.0',  // Versión actual recomendada
  forceUpdate: false,       // Si es true, obliga a actualizar
  storeLinks: {
    android: 'https://play.google.com/store/apps/details?id=com.alignme',
    ios: 'https://apps.apple.com/app/id6753316011'
  }
};

// Endpoint de verificación de versión
app.get('/api/version', (req, res) => {
  res.json(versionConfig);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'AlignMe Backend API',
    version: '1.0.0',
    endpoints: {
      version: '/api/version',
      health: '/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AlignMe Backend corriendo en puerto ${PORT}`);
  console.log(`📱 Versión actual: ${versionConfig.currentVersion}`);
  console.log(`⚠️  Versión mínima: ${versionConfig.minVersion}`);
  console.log(`🔒 Actualización forzada: ${versionConfig.forceUpdate ? 'SÍ' : 'NO'}`);
});
