
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const AllApoinmentsPage = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext);
  
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Todos los Turnos</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointment Cards */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              {/* Header - Patient Info */}
              <div className="flex items-center gap-4 mb-4">
                <img className="w-12 h-12 rounded-full" src={item.userData.image} alt="Paciente" />
                <div>
                  <p className="text-lg font-medium">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">{calculateAge(item.userData.dob)} años</p>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Fecha y Hora: {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p className="text-sm text-gray-500">Doctor: {item.docData.name}</p>
                <p className="text-sm text-gray-500">Arancel: {currency}{item.amount}</p>
              </div>

              {/* Status and Actions */}
              <div className="flex justify-between items-center">
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelado</p>
                ) : item.isCompleted
                ? <p className="text-green-500 text-xs font-medium">Completado</p> 
                :(
                    <CancelOutlinedIcon
                      onClick={() => cancelAppointment(item._id)}
                      className="text-red-600 cursor-pointer"
                    />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApoinmentsPage;
