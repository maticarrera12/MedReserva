import express from "express";
import {
  addDoctor,
  allDoctors,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// Ruta para agregar un doctor, protegida con autenticación de administrador
adminRouter.post("/agregar-doctor", authAdmin, upload.single("image"), addDoctor);

// Ruta de login para el administrador
adminRouter.post("/login", loginAdmin);

// Ruta para ver la lista de doctores, protegida con autenticación de administrador
adminRouter.post("/lista-doctores", authAdmin, allDoctors);

// Ruta para cambiar la disponibilidad de los doctores, protegida
adminRouter.post("/cambiar-disponibilidad", authAdmin, changeAvailability);

export default adminRouter;

