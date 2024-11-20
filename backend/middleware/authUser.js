import jwt from "jsonwebtoken";

// Middleware de autenticación de usuario
const authUser = async (req, res, next) => {
  try {
    // Obtener el token desde el encabezado personalizado
    const { token } = req.headers;
    
    if (!token) {
      return res.json({ success: false, message: 'No autorizado. Ingrese el token nuevamente.' });
    }

    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el userId al cuerpo de la solicitud para su uso en rutas protegidas
    req.body.userId = decodedToken.id;
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

export default authUser;