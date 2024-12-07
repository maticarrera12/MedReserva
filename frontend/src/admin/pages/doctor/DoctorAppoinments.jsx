import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppAdminContext } from "../../context/AppAdminContext";
import { RxCrossCircled } from "react-icons/rx";
import { RxCheckCircled } from "react-icons/rx";


const DoctorAppoinments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppAdminContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Mis Turnos</p>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 text-sm">
          No tenes proximos turnos programados.
        </p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:scale-105"
          >
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image || "default-avatar.jpg"}
                  alt="Paciente"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">Paciente</p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-indigo-100 w-10 h-10 rounded-full text-center text-sm font-bold text-primary">
                {index + 1}
              </div>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Forma de Pago */}
              <div>
                <p
                  className={`text-sm font-medium ${
                    item.payment ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {item.payment ? "Online" : "Efectivo"}
                </p>
                <p className="text-xs text-gray-500">Forma de Pago</p>
              </div>

              {/* Edad */}
              <div>
                <p className="text-sm font-medium">
                  {calculateAge(item.userData.dob)} años
                </p>
                <p className="text-xs text-gray-500">Edad</p>
              </div>

              {/* Fecha */}
              <div>
                <p className="text-sm font-medium">
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="text-xs text-gray-500">Fecha</p>
              </div>

              {/* Hora */}
              <div>
                <p className="text-sm font-medium">{item.slotTime}</p>
                <p className="text-xs text-gray-500">Hora</p>
              </div>

              {/* Fees */}
              <div>
                <p className="text-sm font-medium">
                  {currency}
                  {item.amount}
                </p>
                <p className="text-xs text-gray-500">Arancel</p>
              </div>
            </div>

            {/* Acciones */}
            {item.cancelled ? (
              <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-red-500 hover:text-white">
                Turno Cancelado
              </p>
            ) : item.isCompleted ? (
              <p className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-green-500 hover:text-white">
                Turno Completado
              </p>
            ) : (
              <div className="flex justify-end gap-4">
                <RxCrossCircled 
                  fontSize="large"
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-600 cursor-pointer"
                />
               <RxCheckCircled
                  fontSize="large"
                  onClick={() => completeAppointment(item._id)}
                  className="text-green-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default DoctorAppoinments;
