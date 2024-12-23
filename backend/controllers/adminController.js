import validator from "validator"; 
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Api para anadir doctor

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
    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({success:true, message:"Doctor Agregado"})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
};


// API admin login
const loginAdmin = async (req,res) => {
  try {
    const {email,password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET )
      res.json({success:true,token})
    }else{
      res.json({success:false, message:'Credenciales Invalidas'})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
  // API para ver todos los doctores

  const allDoctors = async (req,res) => {
    try {
      const doctors = await doctorModel.find({}).select('-password')
      res.json({success:true,doctors})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
    }
  
}

// API para obtener todos los turnos

const appointmentAdmin = async (req,res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error);
      res.json({success:false,message:error.message})
  }
}

// API para cancelar turnos desde el admin
const appointmentCancel = async (req,res) => {
  try {
    const { appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    // liberar turno
    const {docId, slotDate, slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true, message:'Turno Cancelado'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

  // APi para la data del dashboard

  const adminDashboard = async (req,res) => {
    try {
      const doctors = await doctorModel.find({})
      const users = await userModel.find({})
      const appointments = await appointmentModel.find({})
      const dashData = {
        doctors: doctors.length,
        appointments: appointments.length,
        patients: users.length,
        latestAppoinments: appointments.reverse().slice(0,5)
      }

      res.json({success:true,dashData})
    } catch (error) {
      console.log(error);
      res.json({success:false,message: error.message})
      
    }
  }
export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard };
