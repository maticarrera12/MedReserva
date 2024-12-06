import { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import axios from "axios"; // Para hacer peticiones a tu backend
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SuccessPage = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(null);
  const { backendUrl, aToken } = useContext(AppContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Capturar la respuesta de Mercado Pago
    const collectionStatus = queryParams.get("collection_status");
    const preferenceId = queryParams.get("preference_id");
    const externalReference = queryParams.get("external_reference");
    const paymentStatus = queryParams.get("status");

    // Verificar si el pago fue aprobado
    if (collectionStatus === "approved") {
      console.log("Pago aprobado:");
      console.log({ collectionStatus, preferenceId, externalReference, paymentStatus });

      // Actualizar el estado del pago en el backend
      updatePaymentStatus(collectionStatus, preferenceId, externalReference, paymentStatus);
    } else {
      // Si el pago no fue aprobado, mostrar mensaje de error o redirigir
      setSuccessMessage("El pago no fue aprobado. Por favor, intenta nuevamente.");
    }
  }, [location]);

  // Función para actualizar el estado del pago en la base de datos
  const updatePaymentStatus = async (collectionStatus, preferenceId, externalReference, paymentStatus) => {
    try {
      // Hacer la llamada al backend para actualizar el estado del pago
      const response = await axios.post(backendUrl + "/api/user/verificar-pago", {
        collection_status: collectionStatus,
        preference_id: preferenceId,
        external_reference: externalReference,  // Se mantiene para usarlo como referencia de la cita
        payment_status: paymentStatus,
      },{headers:{aToken}});
  
      // Si el pago fue exitoso, mostrar mensaje de éxito
      if (response.status === 200) {
        setSuccessMessage("El pago se procesó correctamente. ¡Gracias por tu compra!");
      } else {
        setSuccessMessage("No se pudo procesar el pago correctamente.");
      }
    } catch (error) {
      console.error("Error al actualizar el estado del pago:", error);
      setSuccessMessage("Hubo un error al actualizar el estado del pago. Intenta más tarde.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-center text-green-600">¡Pago Exitoso!</h1>
      <p className="text-center text-lg">{successMessage || "Estamos procesando tu pago. Por favor, espera..."}</p>
    </div>
  );
};

export default SuccessPage;


