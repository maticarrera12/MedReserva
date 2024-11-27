import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";  // Asegúrate de usar react-router-dom v6+

const SuccessPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payment_id = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const external_reference = searchParams.get("external_reference");
    const preference_id = searchParams.get("preference_id");

    const paymentData = {
      payment_id,
      status,
      external_reference,
      preference_id,
    };

    console.log("Información del pago:", paymentData);

    // Aquí enviamos la información del pago al backend para su verificación
    fetch("http://localhost:4000/api/user/verificar-pago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,  // Asegúrate de que el token esté en el localStorage
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);
      })
      .catch((error) => console.error("Error al enviar los datos al backend:", error));

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
