import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import userRoutes from "./router/userRoutes";
import messagesRoutes from "./router/messagesRoutes";
import { rtdb } from "./configuracion/rtdb";
import { ref, update, onValue, push } from "firebase/database";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Rutas de usuario definidas aquí
// app.use("/api/users", userRoutes);
app.use("/api", messagesRoutes);

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
