import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MyAppointmentsPage = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [activePayment, setActivePayment] = useState(null); // Guardar la preferencia generada

  // Inicialización de Mercado Pago
  initMercadoPago("APP_USR-81080000-b7d7-425f-bc5b-bfdc544edbbe", {
    locale: "es-AR",
  });

  const months = [
    "",
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split(" ");
    return `${dateArray[0]} ${months[Number(dateArray[1])]}, ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/turnos`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelar-turno`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createPaymentPreference = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/crear-preferencia`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.preference_id) {
        setActivePayment({
          appointmentId,
          preferenceId: data.preference_id, // Guardar el preference_id
        });
      } else {
        toast.error("No se recibió el ID de la preferencia de pago.");
      }
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      toast.error("Error al generar el pago");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">Mis Turnos</p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 border-b items-start"
          >
            {/* Contenedor para la imagen y la información */}
            <div className="flex sm:flex-row items-center gap-4 w-full">
              {/* Foto del doctor */}
              <div className="flex justify-start sm:justify-center w-32">
                <Link to={`/turnos/${item.docData._id}`}>
                  <img
                    className="w-full h-full bg-indigo-50 object-cover rounded-md"
                    src={item.docData.image}
                    alt="Doctor"
                  />
                </Link>
              </div>
  
              {/* Información del turno */}
              <div className="flex flex-col text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  <Link to={`/turnos/${item.docData._id}`}>
                    {item.docData.name}
                  </Link>
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium">Dirección:</p>
                <p className="text-sm">{item.docData.address.line1}</p>
                <p className="text-sm">{item.docData.address.line2}</p>
                <p className="text-sm">
                  <span className="text-sm text-neutral-700 font-medium">
                    Día y Hora:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>



{/* Botones y mensajes */}
<div className="flex flex-col gap-2 w-full sm:w-auto justify-end sm:items-end">
  {/* Usar el componente Wallet de Mercado Pago */}
  {activePayment?.appointmentId === item._id && activePayment?.preferenceId && (
    <div className="w-full sm:w-auto sm:ml-auto">
      <Wallet
        initialization={{
          preferenceId: activePayment.preferenceId, // Usar el preference_id
        }}
        customization={{
          texts: { valueProp: "Pagar" },
        }}
      />
    </div>
  )}

  {/* Botón para crear la preferencia de pago */}
  {!item.cancelled && !item.payment && !item.isCompleted && (
    <button
      onClick={() => createPaymentPreference(item._id)} // Crear la preferencia de pago solo para esta cita
      className="text-sm text-stone-500 w-full sm:w-32 py-2 px-6 sm:px-6 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap sm:text-center"
    >
      Pagar Online
    </button>
  )}

  {/* Mensaje para turno cancelado */}
  {item.cancelled && (
    <p className="text-sm text-red-500 w-full py-2 whitespace-nowrap text-center sm:text-right">
      Cancelado
    </p>
  )}

  {/* Mensaje para turno pagado */}
  {!item.cancelled && item.payment && (
    <p className="text-sm text-green-500 w-full py-2 whitespace-nowrap text-center sm:text-right">
      Pagado
    </p>
  )}

  {/* Botón para cancelar el turno */}
  {!item.cancelled && !item.isCompleted && (
    <button
      onClick={() => cancelAppointment(item._id)}
      className="text-sm text-stone-500 w-full sm:w-32 py-2 px-6 sm:px-6 border rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 whitespace-nowrap sm:text-center"
    >
      Cancelar
    </button>
  )}

  {/* Mensaje para turno completado */}
  {item.isCompleted && (
    <p className="text-sm text-blue-500 w-full py-2 whitespace-nowrap text-center sm:text-right">
      Completado
    </p>
  )}
</div>


          </div>
        ))}
      </div>
    </div>
  );
  
}
 export default MyAppointmentsPage;

