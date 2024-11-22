import { useContext, useEffect, useState } from "react"
import {AppContext} from '../context/AppContext'
import axios from "axios"
import { toast } from "react-toastify"

const MyAppointmentsPage = () => {

  const {backendUrl, token, getDoctorsData} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split(' ')
    return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2]
  }

  const getUserAppoinments = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/turnos', {headers:{token}})
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancelar-turno',{appointmentId}, {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppoinments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      getUserAppoinments()
    }
  },[token])


  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">Mis Turnos</p>
      <div>
        {appointments.map((item,index)=>(
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Direccion:</p>
              <p className="text-sm">{item.docData.address.line1}</p>
              <p className="text-sm">{item.docData.address.line2}</p>
              <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Dia y Hora:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
            {!item.cancelled &&  <button className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300">Pagar Online</button>}
             {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300">Cancelar Turno</button>} 
             {item.cancelled && <p onClick={()=>cancelAppointment(item._id)} className="text-sm text-center text-white sm:min-w-48 py-2 border rounded-lg bg-red-500 hover:text-white ">Turno Cancelado</p>} 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointmentsPage