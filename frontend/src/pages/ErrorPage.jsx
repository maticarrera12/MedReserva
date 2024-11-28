import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Para hacer peticiones a tu backend
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ErrorPage = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const { backendUrl , token } = useContext(AppContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Capturar la respuesta de Mercado Pago
    const collectionStatus = queryParams.get("collection_status");
    const preferenceId = queryParams.get("preference_id");
    const externalReference = queryParams.get("external_reference");
    const paymentType = queryParams.get("payment_type");
    const paymentStatus = queryParams.get("status");

    // Verificar si el pago fue fallido
    if (collectionStatus !== "approved") {
      console.log("Error en el pago:");
      console.log({ collectionStatus, preferenceId, externalReference, paymentType, paymentStatus });

      // Mostrar mensaje de error según el estado del pago
      let message = "Hubo un error al procesar el pago.";
      if (paymentStatus === "in_process") {
        message = "El pago está en proceso. Por favor, espera o intenta más tarde.";
      } else if (paymentStatus === "null") {
        message = "El pago fue rechazado. Intenta con otro medio de pago.";
      } else {
        message = "El pago no fue aprobado. Intenta nuevamente.";
      }

      setErrorMessage(message);
    }

    // Actualizar el estado de la cita en el backend con la respuesta de Mercado Pago
    const updatePaymentStatus = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/user/verificar-pago", {
          collection_status: collectionStatus,
          preference_id: preferenceId,
          external_reference: externalReference,
          payment_status: paymentStatus,
        }, {headers:{token}});
    
        if (response.status === 200) {
          console.log("Pago procesado correctamente:", response.data);
        } else {
          setErrorMessage("No se pudo procesar el pago correctamente.");
        }
      } catch (error) {
        console.error("Error al actualizar el estado del pago:", error);
        setErrorMessage("Hubo un error al actualizar el estado del pago. Intenta más tarde.");
      }
    };

    // Solo actualizar el estado si ya hemos capturado los parámetros de Mercado Pago
    if (preferenceId && paymentStatus) {
      updatePaymentStatus();
    }

  }, [location, backendUrl]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-center text-red-600">Algo salió mal</h1>
      <p className="text-center text-lg">{errorMessage || "No pudimos procesar tu pago. Por favor, intenta nuevamente o usa otro medio de pago."}</p>
    </div>
  );
};

export default ErrorPage;
