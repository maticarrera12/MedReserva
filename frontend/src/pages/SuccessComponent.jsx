import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Asegúrate de usar react-router-dom v6+

const SuccessPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Convertir todos los parámetros de búsqueda en un objeto
    const params = Object.fromEntries([...searchParams]);

    // Mostrar en consola todos los datos recibidos
    console.log("Datos completos del pago:", params);

    // Opcional: Enviar los datos al backend para guardar o validar el pago
    // fetch("https://tu-backend.com/api/verify-mercadopago", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(params),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("Respuesta del backend:", data))
    //   .catch((error) => console.error("Error al enviar los datos al backend:", error));
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
      <h1 className="text-2xl font-bold text-green-600">¡Pago Exitoso!</h1>
      <p className="text-gray-600 mt-4">Gracias por tu pago. Nos pondremos en contacto contigo pronto.</p>
      <p className="text-gray-500 mt-2">
        Si tienes preguntas, contacta a nuestro equipo de soporte.
      </p>
    </div>
  );
};

export default SuccessPage;
