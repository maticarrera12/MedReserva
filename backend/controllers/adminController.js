import validator from "validator"; 
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API para añadir doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // chequear toda la data a agregar doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Detalles faltantes" });
    }

    // validar mail
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Por favor ingrese un Email Valido",
      });
    }

    // validar contrasena segura
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Por favor ingrese una contrasena mas segura",
      });
    }

    // hashear contrasena
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // agregar imagen a cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({success:true, message:"Doctor Agregado"});
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
  }
};

// API admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si las credenciales del administrador son correctas
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generar token con el email del administrador
      const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Credenciales Invalidas' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API para ver todos los doctores
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors };