import express from "express";
import cors from "cors";
import { firestoreDB, realtimeDB } from "./db/database";

// Referencias DB
const usersRef = firestoreDB.collection("users");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Rutas de usuario definidas aquí
// app.use("/api/users", userRoutes);

// TODO: POST /signup: con este endpoint vamos a dar de alta en Firestore a un user pidiéndole solo el email (por ahora).
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  // Evita variables vacías o nulas
  if (
    Object.values(req.body).includes("") ||
    Object.keys(req.body).length === 0 ||
    email.replaceAll(" ", "") == ""
  ) {
    return res.status(400).json({ msg: "Datos incompletos" });
  }

  try {
    // TODO: verificar si existe un usuario con ese email
    // Creamos un nuevo usuario
    const newUser = await usersRef.doc().set({
      email,
    });
    console.log(newUser);
    res.status(200).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear el usuario" });
  }
});
// TODO: POST /auth: con este endpoint vamos a chequear el email que nos envíen en el body y a devolver el id interno (el id de Firestore) de ese user. En el futuro vamos a pedir adicionalmente una contraseña.
app.post("/signup", (req, res) => {});
// TODO: POST /rooms: este endpoint va a crear un room en Firestore y en la Realtime Database. En la primera va a guardar el id corto (AAFF, por ejemplo) y lo va a asociar a un id complejo que estará en la Realtime DB.
app.post("/signup", (req, res) => {});
// TODO: GET /rooms/:roomId?userid=1234
app.post("/signup", (req, res) => {});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
