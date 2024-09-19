import { Request, Response } from "express";
import { rtdb } from "../configuracion/rtdb";
import { ref, push } from "firebase/database";

// Método para mostrar todos los usuarios
const index = async (req: Request, res: Response) => {
  console.log("Entre");
  const db = rtdb;
  function writeUserData() {
    console.log(req.body);
    const refChatroom = ref(db, "chatroom/chat/");
    push(refChatroom, req.body);
  }
  writeUserData();
  res.status(200).json({ msg: "ok" });
};

// Store a new message by userId
// const store = async(req: Request, res: Response) {

// }

// Exportamos los métodos
export { index };
