// import admin from "firebase-admin";
// import serviceAccount from "./service-account.json";
// import { getFirestore } from "firebase/firestore";

//agregar los tipos para inicializar "as admin.ServiceAccount"
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   databaseURL: "https://apx-n2-backend-1-default-rtdb.firebaseio.com",
// });

// Exporta conexión con base de datos Firestore
// export const firestoreDB = admin.firestore();
// export const firestoreDB = getFirestore(admin);

// import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// Inicializa la aplicación con la cuenta de servicio
// const app = initializeApp({
//   credential: cert(serviceAccount as ServiceAccount),
// });

// export const firestoreDB = getFirestore(app);
// console.log("Conexión a Firestore Establecida");

// import { initializeApp as adminInitializeApp } from "firebase-admin/app";
// import { getFirestore as adminGetFirestore } from "firebase-admin/firestore";

import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import serviceAccount from "./service-account.json";

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://apx-n2-backend-1-default-rtdb.firebaseio.com", // Reemplaza con tu URL de Realtime Database
});

export const realtimeDB = getDatabase(app);
export const firestoreDB = getFirestore(app);

console.log("Conexion a RealtimeDB y FirestoreDB establecidas");
