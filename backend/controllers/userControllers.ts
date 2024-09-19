import { Request, Response } from "express";
import admin from "firebase-admin";
import Users from "../models/usuarios";
import { v4 as uuidv4 } from "uuid";

// Método para mostrar todos los usuarios
const index = async (req: Request, res: Response) => {
  // let listaUsuarios: admin.firestore.DocumentData[] = [];
  // try {
  //   // Obtenemos la lista de usuarios
  //   const snapshot = await Users.get(); // snapshot es un QuerySnapshot
  //   snapshot.forEach((doc) => {
  //     // Iteramos sobre cada documento en el snapshot
  //     listaUsuarios.push(doc.data()); // Añadimos el contenido del documento al array
  //   });
  //   res.json(listaUsuarios);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ msg: "Error al obtener los usuarios" });
  // }
  res.json({ "todo ok usuarios": true });
  console.log("Entre");
};

// Método para crear un nuevo usuario
const store = async (req: Request, res: Response) => {
  // Evita variables vacías
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Datos incompletos" });
  }

  const { nombre } = req.body;
  const id = uuidv4();
  try {
    // Creamos un nuevo usuario
    await Users.doc(id).set({
      nombre,
      id: id,
    });
    res.json({
      id: id,
      msg: "Usuario creado con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear el usuario" });
  }
};

// método que muestra un usuario por su id
const show = async (req: Request, res: Response) => {
  try {
    const userDoc = await Users.doc(req.params.id).get();
    res.send(userDoc.data());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};

// Método para eliminar un usuario por su id
const destroy = async (req: Request, res: Response) => {
  try {
    const userDoc = await Users.doc(req.params.id).delete();
    res.json({ msg: "El usurio se eliminó correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};

// Método para actualizar un usuario por su id
const update = async (req: Request, res: Response) => {
  try {
    const userDoc = await Users.doc(req.params.id).update(req.body);
    res.json({ msg: "El usurio se actualizó correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

// Exportamos los métodos
export { index, store, show, destroy, update };
