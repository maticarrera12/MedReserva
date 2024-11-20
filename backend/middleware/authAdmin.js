import jwt from "jsonwebtoken";

// Middleware de autenticación de admin
const authAdmin = async (req, res, next) => {
  try {
    // Obtener el token desde los encabezados de la solicitud
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: 'No autorizado. Ingrese el token nuevamente.' });
    }

    // Verificar y decodificar el token usando la clave secreta
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Verificar si el correo en el token coincide con el ADMIN_EMAIL
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: 'No autorizado. Ingrese el token de administrador.' });
    }

    // Si todo es correcto, continuar con la siguiente función
    next();
  } catch (error) {
    console.log(error);

    // Manejar el caso de token expirado
    if (error.name === 'TokenExpiredError') {
      return res.json({ success: false, message: 'Token expirado. Por favor, inicie sesión nuevamente.' });
    }

    // Otros errores de token
    return res.json({ success: false, message: 'Token no válido. Intente nuevamente.' });
  }
};

export default authAdmin;
