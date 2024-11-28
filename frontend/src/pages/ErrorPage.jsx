import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    // Capturar la respuesta de Mercado Pago
    const collectionStatus = queryParams.get("collection_status");
    const preferenceId = queryParams.get("preference_id");
    const externalReference = queryParams.get("external_reference");
    const paymentType = queryParams.get("payment_type");
    const paymentStatus = queryParams.get("status");

    // Ver respuesta
    if (collectionStatus !== "approved") {
      console.log("Error en el pago:");
      console.log({ collectionStatus, preferenceId, externalReference, paymentType, paymentStatus });
    }
  }, [location]);

  return (
    <div>
      <h1 className="text-xl text-center">Algo salió mal</h1>
      <p className="text-center">No pudimos procesar tu pago. Por favor, intenta nuevamente o usa otro medio de pago.</p>
    </div>
  );
};

export default ErrorPage;
