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

adminRouter.post(
  "/agregar-doctor",
  authAdmin,
  upload.single("image"),
  addDoctor
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/lista-doctores", authAdmin, allDoctors);
adminRouter.post("/cambiar-disponibilidad", authAdmin, changeAvailability);

export default adminRouter;

