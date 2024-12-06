import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { AppContext } from '../../context/AppContext';

const DoctorDashboards = () => {

  const {dashData, setDashData,cancelAppointment,completeAppointment, getDashData, dToken } = useContext(DoctorContext)
  const {currency, slotDateFormat} = useContext(AppContext)



  useEffect(()=>{
    if (dToken) {
      getDashData()

      
    }
  },[dToken])
  return dashData && (
    <div className='m-5'>

<div className="flex flex-wrap gap-3">
          {/* Ganancias */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-52 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center justify-center bg-indigo-100 w-12 h-12 rounded-full">
              <LocalAtmIcon
                fontSize="large"
                className="text-primary"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{currency}{dashData.earnings}</p>
              <p className="text-sm text-gray-500">Ganancias</p>
            </div>
          </div>

          {/* Turnos */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-52 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center justify-center bg-indigo-100 w-12 h-12 rounded-full">
              <EventAvailableIcon fontSize="large" className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold">{dashData.appointments}</p>
              <p className="text-sm text-gray-500">Turnos</p>
            </div>
          </div>

          {/* Pacientes */}
          <div className="flex items-center gap-4 bg-white p-4 min-w-52 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center justify-center bg-indigo-100 w-12 h-12 rounded-full">
              <AccountBoxIcon fontSize="large" className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold">{dashData.patients}</p>
              <p className="text-sm text-gray-500">Pacientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <BallotRoundedIcon fontSize="large" className="text-primary" />
            <p className="font-semibold">Turnos Próximos</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments &&
              dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                  <img
                    src={item.userData?.image || "default-image.jpg"}
                    alt="Doctor"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-gray-800">{item.userData?.name || "N/A"}</p>
                    <p className="text-sm text-gray-600">{slotDateFormat(item.slotDate)}</p>
                  </div>
                  <div className="flex justify-between items-center ml-auto">
                  {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">
                Turno Cancelado
              </p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">
                Turno Completado
              </p>
            ) : (
              <div className="flex justify-end gap-4">
                <CancelOutlinedIcon
                  fontSize="large"
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-600 cursor-pointer"
                />
                <CheckCircleOutlinedIcon
                  fontSize="large"
                  onClick={() => completeAppointment(item._id)}
                  className="text-green-600 cursor-pointer"
                />
              </div>
            )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No hay turnos próximos.
              </p>
            )}
          </div>
        </div>
    </div>
  )
}

export default DoctorDashboards