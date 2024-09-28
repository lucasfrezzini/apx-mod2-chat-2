import express from "express";
import cors from "cors";
import { firestoreDB, realtimeDB } from "./db/database";
import { generateRandomString } from "./src/utils/utils";
import { v4 as uuidv4 } from "uuid";

// Referencias DB
const usersRef = firestoreDB.collection("users");
const roomsRef = firestoreDB.collection("rooms");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//* POST /signup: Alta de user con email.
app.post("/signup", async (req, res) => {
  const email = req.body.email || "";
  // Evita variables vacías o nulas
  if (
    Object.values(req.body).includes("") ||
    Object.keys(req.body).length === 0 ||
    email.replaceAll(" ", "") == ""
  ) {
    return res.status(400).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          fieldName: "email",
          issue: "El campo está vacío",
        },
      },
    });
  }

  try {
    // Verificar si existe un usuario con ese email
    const user = await usersRef.where("email", "==", email).get();
    if (user.docs.length > 0) {
      return res.status(401).json({
        type: "error",
        data: {
          messageKey: "Error",
          messageDescription: "Error con la validación de datos",
          errorDetails: {
            fieldName: "email",
            issue: "Email no válido",
          },
        },
      });
    }

    // Creamos un nuevo usuario
    const newUser = await usersRef.doc().set({
      email,
    });
    res.status(200).json({
      type: "success",
      data: {
        messageKey: "Éxito",
        messageDescription: "Se creo correctamente el usuario",
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error al crear el usuario en la BD",
        errorDetails: {
          issue: error.message,
        },
      },
    });
  }
});
//* POST /auth: buscamos el usuario por email y devolvemos su ID en Firestore.
app.post("/auth", async (req, res) => {
  const email = req.body.email || "";
  // Evita variables vacías o nulas
  if (
    Object.values(req.body).includes("") ||
    Object.keys(req.body).length === 0 ||
    email.replaceAll(" ", "") == ""
  ) {
    return res.status(400).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          fieldName: "email",
          issue: "El campo está vacío",
        },
      },
    });
  }

  // Busca el usuario y devuelve el ID en Firestore
  try {
    const user = await usersRef.where("email", "==", email).get();
    res.status(200).json({
      type: "success",
      data: {
        messageKey: "Éxito",
        messageDescription: "Se encontró el usuario",
        successDetails: {
          userFirestoreID: user.docs[0].id,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error al buscar el usuario en la BD",
        errorDetails: {
          issue: error.message,
        },
      },
    });
  }
});

//* POST /rooms: creamos las rooms en ambas BD y las asociamos
app.post("/rooms", async (req, res) => {
  const userID = req.body.userID || "";
  // Evita variables vacías o nulas
  if (
    Object.values(req.body).includes("") ||
    Object.keys(req.body).length === 0 ||
    userID.replaceAll(" ", "") == ""
  ) {
    return res.status(400).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "No se envió un ID válido",
        },
      },
    });
  }

  // Verificar si existe un usuario con ese ID
  const user = await usersRef.doc(userID).get();
  if (!user.exists) {
    return res.status(401).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "El ID no existe",
        },
      },
    });
  }

  // Verificar que el usuario no tenga un room creado (llamar a la ref y filtrar manualmente)
  const rooms = realtimeDB.ref(`chatrooms`);
  const snapshot = await rooms.get();
  const ownerRoom = Object.values(snapshot.val()).find((room: any) => {
    return room.owner === userID;
  });
  if (ownerRoom) {
    return res.status(401).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "El usuario ya tiene un Room creado",
        },
      },
    });
  }

  try {
    const shortRoomID = generateRandomString(5);
    const longRoomID = uuidv4();
    // Crear el Room en la RTDB con el longRoomID y declarar un owner de ese room
    const roomRTDBRef = await realtimeDB.ref(`chatrooms/${longRoomID}`);
    await roomRTDBRef.set({
      messages: [],
      owner: userID,
    });

    // Crear el Room en Firestore asociando el longRoomID con el shortRoomID para ubicarlo fácil
    await roomsRef.doc(shortRoomID).set({
      rtdbRoomID: longRoomID,
    });
    res.status(200).json({
      type: "success",
      data: {
        messageKey: "Éxito",
        messageDescription: "Se creo correctamente el Room",
        successDetails: {
          roomID: shortRoomID,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error al buscar el usuario en la BD",
        errorDetails: {
          issue: error.message,
        },
      },
    });
  }
});

//* GET /rooms/:roomId?userid=1234 devuelve el room de realtimeDB asociado a ese userID y roomID
app.get("/rooms/:roomID", async (req, res) => {
  const roomID = req.params.roomID || "";
  const userID: any = req.query.userID || "";

  // Evita variables vacías o nulas
  if (
    Object.values(req.params).includes("") ||
    req.params.roomID.length === 0 ||
    roomID.replaceAll(" ", "") == ""
  ) {
    return res.status(400).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "No se envió un ID válido",
        },
      },
    });
  }

  // Verificar si existe un usuario con ese ID
  const user = await usersRef.doc(userID).get();
  if (!user.exists) {
    return res.status(401).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "El ID de usuario no existe",
        },
      },
    });
  }

  // Verificar el roomID corto que sea válido
  const room = await roomsRef.doc(roomID).get();
  if (!room.exists) {
    return res.status(401).json({
      type: "error",
      data: {
        messageKey: "Error",
        messageDescription: "Error con la validación de datos",
        errorDetails: {
          issue: "El RoomID no existe",
        },
      },
    });
  } else {
    const { rtdbRoomID } = room.data()!;
    res.status(200).json({
      type: "success",
      data: {
        messageKey: "Éxito",
        messageDescription: "Se encontró el Room",
        successDetails: {
          roomID,
          rtdbRoomID,
        },
      },
    });
  }
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
