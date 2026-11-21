/* =====================================================================
 *  CONFIGURACIÓN DE LA APP MÓVIL — es el ÚNICO archivo que debe editar
 * ===================================================================== */
self.CONFIG = {

  // 1) URL de la aplicación web de Apps Script (termina en /exec)
  APP_URL: 'https://script.google.com/macros/s/AKfycbwzHeM86H3V768A5GbVBHXZernvznYxflvL9vsfvgo29tOK0fuJ7UhaFPM6MFxteVOnQQ/exec',

  // 2) Notificaciones con la app cerrada (Firebase). Déjelo en null si aún no lo configura:
  //    Firebase Console > Configuración del proyecto > General > Tus apps > App web > "firebaseConfig"
  FIREBASE: null,
  /* Ejemplo:
  FIREBASE: {
    apiKey: 'AIza...',
    authDomain: 'docs-chinito.firebaseapp.com',
    projectId: 'docs-chinito',
    storageBucket: 'docs-chinito.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abc123'
  },
  */

  // 3) Firebase Console > Configuración del proyecto > Cloud Messaging > Certificados push web > "Par de claves"
  VAPID_KEY: ''
};
