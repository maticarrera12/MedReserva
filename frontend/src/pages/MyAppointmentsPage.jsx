import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Link } from "react-router-dom";

const MyAppointmentsPage = () => {
  // Inicializa MercadoPago con las credenciales de sandbox
  initMercadoPago("APP_USR-81080000-b7d7-425f-bc5b-bfdc544edbbe", {
    locale: "es-AR",
  });

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [preferences, setPreferences] = useState({}); // Estado para almacenar preferenceId por cita


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

  // Formatear la fecha de la cita
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split(" ");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
    );
  };

  // Obtener citas del usuario
  const getUserAppoinments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/turnos", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Función para cancelar una cita
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancelar-turno",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Función para obtener la preferencia de pago
  const appointmentMercadoPago = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/pagar-mercadopago",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        const initPoint = data.order.sandbox_init_point;

        if (initPoint) {
          // Almacenar el preferenceId y el initPoint en el estado
          setPreferences((prevState) => ({
            ...prevState,
            [appointmentId]: {
              preferenceId: data.order.id,
              initPoint: initPoint,
            },
          }));

          console.log("Redirección al sandbox:", initPoint); // Mostrar el initPoint en la consola
        } else {
          throw new Error("No se recibió un sandbox_init_point válido.");
        }
      } else {
        throw new Error("Error al obtener el preference_id");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Manejar el clic en "Pagar Online"
  const handleBuy = async (appointmentId) => {
    await appointmentMercadoPago(appointmentId); // Obtener la preferencia y setear el preferenceId
  };

  // Redirigir al sandbox cuando se haga clic en el Wallet
  const handleRedirectToSandbox = (initPoint) => {
    console.log("Redirigiendo al sandbox con la URL:", initPoint);
    if (initPoint) {
      window.location.href = initPoint; // Redirige al sandbox
    } else {
      toast.error("No se recibió un initPoint válido.");
    }
  };

  // Cargar las citas al inicio
  useEffect(() => {
    if (token) {
      getUserAppoinments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        Mis Turnos
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <Link to={`/turnos/${item.docData._id}`}>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
              </Link>
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
               <Link to={`/turnos/${item.docData._id}`}>{item.docData.name}</Link> 
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Direccion:</p>
              <p className="text-sm">{item.docData.address.line1}</p>
              <p className="text-sm">{item.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Dia y Hora:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted &&(
                <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-green-500 hover:text-white">
                  Turno Pagado
                </p>
              )}
              {/* Mostrar el Wallet solo si se ha recibido el preferenceId */}
              {preferences[item._id]?.preferenceId &&
                preferences[item._id]?.initPoint && (
                  <Wallet
                    initialization={{
                      preferenceId: preferences[item._id]?.preferenceId,
                    }}
                    customization={{
                      texts: {
                        valueProp: "smart_option",
                      },
                    }}
                    onClick={() => handleRedirectToSandbox(item._id)} // Redirigir al sandbox cuando se hace clic en el Wallet
                  />
                )}
              {/* Mostrar el botón de pago solo si no se canceló la cita */}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => handleBuy(item._id)} // Pasar el ID de la cita para generar el preferenceId
                  className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pagar Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted &&(
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancelar Turno
                </button>
              )}
              {item.cancelled && !item.isCompleted &&(
                <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-red-500 hover:text-white">
                  Turno Cancelado
                </p>
              )}
              {item.isCompleted &&   <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-blue-700 hover:text-white">
                  Turno Completado
                </p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
