/* =====================================================================
 *  CONFIGURACIÓN DE LA APP MÓVIL — es el ÚNICO archivo que debe editar
 * ===================================================================== */
self.CONFIG = {

  // 1) URL de la aplicación web de Apps Script (termina en /exec)
  APP_URL: 'https://script.google.com/macros/s/AKfycbwzHeM86H3V768A5GbVBHXZernvznYxflvL9vsfvgo29tOK0fuJ7UhaFPM6MFxteVOnQQ/exec',

  // 2) Notificaciones con la app cerrada (Firebase). Déjelo en null si aún no lo configura.
  FIREBASE: {
    apiKey: 'AIzaSyCnkC19VLAfO7CGmaUsjQNcyJpgi1BiWFM',
    authDomain: 'docs-chinito.firebaseapp.com',
    projectId: 'docs-chinito',
    storageBucket: 'docs-chinito.firebasestorage.app',
    messagingSenderId: '990449460463',
    appId: '1:990449460463:web:f3b45b6439dcd4d5dae71a'
  },

  // 3) Clave pública VAPID (Firebase > Cloud Messaging > Certificados push web)
  VAPID_KEY: 'BNNPGGAYL4oLCGimekMNLLgrNK4sMLbPB2rXMd3pcjmh9kgfcUmr6Uo0IrHENfzGbdAYS-NdA6jIZ2WcDag9sCY'
};
