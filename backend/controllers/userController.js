import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import axios from "axios"
import { MercadoPagoConfig, Preference } from 'mercadopago';



// API para registrar usuario

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Detalles faltantes" });
    }

    //Validar email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Ingrese un email valido" });
    }

    //Validar contrasena
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api para el user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "El usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

//API para datos del perfil

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

//API para actualizar el perfil

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Detalles Faltantes" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // subir imagen a cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Perfil Actualizado" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Tomar turno

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor No Disponible" });
    }

    let slots_booked = docData.slots_booked;

    // chequear disponiblidad
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Turno No Disponible" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // guardar los turnos en docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Has Tomado el turno" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

  // obtener mis turnos tomados en el frontend
};

const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


  // API pora cancelar turnos

  const cancelAppointment = async (req,res) => {
    try {
      const {userId, appointmentId} = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)

      // verificar turno
      if (appointmentData.userId !== userId) {
        return res.json({success:false, message:'Accion Desautorizada'})
      }

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

  

const mercadoPagoInstance = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

const paymentMercadoPago = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Turno Cancelado o No Encontrado" });
    }

    // Crear la preferencia
    const preference = new Preference(mercadoPagoInstance);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "Pago de Turno Médico",
            quantity: 1,
            unit_price: appointmentData.amount, // Precio de la cita
            currency_id: process.env.CURRENCY,
          },
        ],
        external_reference: appointmentId,
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
        auto_return: "approved",
      },
    });
console.log("Datos completos de la orden de compra:", response);
    return res.json({
      success: true,
      order: response, // Devolver el objeto con `sandbox_init_point` y `preference_id`
    });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/////////////////// Verificar el pago//////////////////////
const verifyMercadoPago = async (req, res) => {
  try {
    const { payment_id, preference_id } = req.body;

    if (!payment_id && !preference_id) {
      return res.status(400).json({ success: false, message: "Debe proporcionar payment_id o preference_id." });
    }

    let paymentInfo;
    if (payment_id) {
      console.log("Consultando el pago con payment_id:", payment_id);
      paymentInfo = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });
      console.log("Información del pago:", paymentInfo.data);
    } else if (preference_id) {
      console.log("Consultando la preferencia con preference_id:", preference_id);
      paymentInfo = await axios.get(`https://api.mercadopago.com/checkout/preferences/${preference_id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });
      console.log("Información de la preferencia:", paymentInfo.data);
    }

    if (paymentInfo.data.status === 'approved') {
      return res.status(200).json({
        success: true,
        message: 'Pago verificado y aprobado',
        data: paymentInfo.data,
      });
    } else {
      return res.status(400).json({ success: false, message: 'Pago no aprobado' });
    }

  } catch (error) {
    console.error('Error al verificar el pago:', error.message);
    return res.status(500).json({ success: false, message: 'Error al verificar el pago', error: error.message });
  }
};





export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentMercadoPago,
  verifyMercadoPago
};
