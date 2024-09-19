import admin from "firebase-admin";
import serviceAccount from "./service-account.json";

//agregar los tipos para inicializar "as admin.ServiceAccount"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://apx-n2-backend-1-default-rtdb.firebaseio.com",
});

console.log("Conexión a Firestore Establecida");

// Exporta conexión con base de datos Firestore
export const firestoreDB = admin.firestore();
