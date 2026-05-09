const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'index.html');
const distDir = path.join(__dirname, '..', 'dist');
const dist = path.join(distDir, 'index.html');

const config = {
  apiKey: process.env.FIREBASE_API_KEY || null,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || null,
  databaseURL: process.env.FIREBASE_DATABASE_URL || null,
  projectId: process.env.FIREBASE_PROJECT_ID || null,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || null,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || null,
  appId: process.env.FIREBASE_APP_ID || null
};

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

let html = fs.readFileSync(src, 'utf8');

const hasAllConfig = Object.values(config).every(v => v !== null);

if (hasAllConfig) {
  const configJSON = JSON.stringify(config, null, 2);
  html = html.replace(
    'const FIREBASE_CONFIG = null;',
    'const FIREBASE_CONFIG = ' + configJSON + ';'
  );
  console.log('Firebase config inyectada desde variables de entorno.');
} else {
  console.log('Variables de entorno de Firebase no configuradas. Modo local.');
}

fs.writeFileSync(dist, html, 'utf8');
console.log('Build completado: dist/index.html');
