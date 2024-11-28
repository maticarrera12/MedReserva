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
  initMercadoPago('APP_USR-81080000-b7d7-425f-bc5b-bfdc544edbbe', {
    locale: 'es-AR'
  });

  const months = [
    "", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
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
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <Link to={`/turnos/${item.docData._id}`}>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
              </Link>
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                <Link to={`/turnos/${item.docData._id}`}>{item.docData.name}</Link>
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Dirección:</p>
              <p className="text-sm">{item.docData.address.line1}</p>
              <p className="text-sm">{item.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">Día y Hora:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {/* Usar el componente Wallet de Mercado Pago */}
              {activePayment?.appointmentId === item._id && activePayment?.preferenceId && (
                  <Wallet
                    initialization={{
                      preferenceId: activePayment.preferenceId, // Usar el preference_id
                    }}
                    customization={{
                      texts: { valueProp: 'smart_option' }, // Personalizar el texto (si lo deseas)
                    }}
                  />
              )}

              {/* Botón para crear la preferencia de pago */}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => createPaymentPreference(item._id)} // Crear la preferencia de pago solo para esta cita
                  className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pagar Online
                </button>
              )}

              {/* Botón para cancelar el turno */}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancelar Turno
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-red-500 hover:text-white">
                  Turno Cancelado
                </p>
              )}
              {item.isCompleted && (
                <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-blue-700 hover:text-white">
                  Turno Completado
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
