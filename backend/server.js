const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración CORS para permitir peticiones desde la app
app.use(cors());
app.use(express.json());

// Configuración de versiones
const versionConfig = {
  minVersion: '5.1',        // Versión mínima requerida (por debajo: actualización obligatoria)
  currentVersion: '5.1',    // Versión actual en tiendas
  storeLinks: {
    android: 'https://play.google.com/store/apps/details?id=com.alignme',
    ios: 'https://apps.apple.com/us/app/alignme/id6753316011'
  },
  updateRequired: true,    // Cambiar a true cuando subas v3.0
  message: {
    es: 'Hay una nueva versión disponible con nuevas funcionalidades. ¡Actualiza ahora!'
  }
};

// Endpoint principal de versiones
app.get('/api/version', (req, res) => {
  res.json(versionConfig);
});

// Health check para Render
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    service: 'AlignMe Version Control Server',
    version: '1.0.0',
    endpoints: {
      version: '/api/version',
      health: '/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AlignMe Version Server running on port ${PORT}`);
  console.log(`📱 Min version: ${versionConfig.minVersion}`);
  console.log(`📱 Current version: ${versionConfig.currentVersion}`);
});
