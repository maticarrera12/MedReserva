import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/registrarse", registerUser);
userRouter.post("/iniciar-sesion", loginUser);
userRouter.get("/get-perfil", authUser, getProfile);
userRouter.post("/actualizar-perfil",upload.single("image"),authUser,updateProfile);

export default userRouter;
