// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";
// import {v2 as cloudinary} from "cloudinary";

// // API para registrar usuario

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !password || !email) {
//       return res.json({ success: false, message: "Detalles faltantes" });
//     }

//     //Validar email
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Ingrese un email valido" });
//     }

//     //Validar contrasena
//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Ingrese una contraña mas segura",
//       });
//     }

//     // Hasheo de contrasena
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userData = {
//       name,
//       email,
//       password: hashedPassword,
//     };

//     const newUser = new userModel(userData);
//     const user = await newUser.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //Api para el user login

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "El usuario no existe" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({
//         success: false,
//         message: "El nombre de usuario o la contrasena son incorrectas",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //API para datos del perfil

// const getProfile = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const userData = await userModel.findById(userId).select("-password");
//     res.json({ succes: true, userData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //API para actualizar el perfil

// const updateProfile = async (req, res) => {
//   try {
//     const { userId, name, phone, address, dob, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !gender) {
//       return res.json({ success: false, message: "Detalles Faltantes" });
//     }

//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address: JSON.parse(address),
//       dob,
//       gender,
//     });

//     if(imageFile){
//         // subir imagen a cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//         const imageURL = imageUpload.secure_url

//         await userModel.findByIdAndUpdate(userId,{image:imageURL})
//     }  
    
//     res.json({success:true,message:"Perfil Actualizado"})
//   } catch (error) {}
// };

// export { registerUser, loginUser, getProfile, updateProfile };
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// API para registrar usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Detalles faltantes" });
    }

    // Validar email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Ingrese un email valido" });
    }

    // Validar contrasena
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Ingrese una contraña mas segura",
      });
    }

    // Hasheo de contrasena
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'  // Set token expiration
    });

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API para el login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "El usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'  // Set token expiration
      });
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "El nombre de usuario o la contrasena son incorrectas",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API para obtener los datos del perfil
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API para actualizar el perfil
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Detalles Faltantes" });
    }

    // Validate address as JSON
    let parsedAddress = {};
    if (address) {
      try {
        parsedAddress = JSON.parse(address);
      } catch (error) {
        return res.json({ success: false, message: "Formato de dirección no válido" });
      }
    }

    // Update user information
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    // Upload image if provided
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageURL = imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId, { image: imageURL });
      } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        return res.json({ success: false, message: "Error al subir la imagen" });
      }
    }

    res.json({ success: true, message: "Perfil Actualizado" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
