import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    // Capturar la respuesta de Mercado Pago
    const collectionStatus = queryParams.get("collection_status");
    const preferenceId = queryParams.get("preference_id");
    const externalReference = queryParams.get("external_reference");
    const paymentType = queryParams.get("payment_type");
    const paymentStatus = queryParams.get("status");
    
    // Ver respuesta
    if (collectionStatus === "approved") {
      console.log("Pago aprobado:");
      console.log({ collectionStatus, preferenceId, externalReference, paymentType, paymentStatus });
    } else {
      console.log("Pago fallido o pendiente:");
      console.log({ collectionStatus, preferenceId, externalReference, paymentType, paymentStatus });
    }

    // Redirigir o mostrar información adicional según el estado del pago
    // Aquí podrías redirigir a otra página si lo deseas, por ejemplo:
    // navigate("/thank-you");
  }, [location, navigate]);

  return (
    <div>
      <h1 className="text-xl text-center">¡Pago Exitoso!</h1>
      <p className="text-center">Tu pago se ha procesado correctamente.</p>
    </div>
  );
};

export default SuccessPage;