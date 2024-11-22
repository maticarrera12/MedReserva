// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRoute.js";


// // app config
// const app = express();
// const port = process.env.PORT || 4000;
// connectDB();
// connectCloudinary();

// // middlewares
// app.use(express.json());
// app.use(cors());

// // api endpoint
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter)
// app.use("/api/user", userRouter)

// // localhost:4000/api/admin/agregar-doctor
// app.get("/", (req, res) => {
//   res.send("API FUNCIONANDO");
// });

// app.listen(port, () => console.log("Server Iniciado", port));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// Cargar variables de entorno
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// Conectar a la base de datos y a Cloudinary de manera asíncrona
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    // middlewares
    app.use(express.json());
    app.use(cors());

    // api endpoint
    app.use("/api/admin", adminRouter);
    app.use("/api/doctor", doctorRouter);
    app.use("/api/user", userRouter);

    // Ruta por defecto
    app.get("/", (req, res) => {
      res.send("API FUNCIONANDO");
    });

    // Iniciar servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
  }
};

startServer();

