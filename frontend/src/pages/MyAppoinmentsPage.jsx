import { useContext } from "react"
import {AppContext} from '../context/AppContext'

const MyAppoinmentsPage = () => {

  const {doctors} = useContext(AppContext)

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">Mis Turnos</p>
      <div>
        {doctors.slice(0,3).map((item,index)=>(
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Direccion:</p>
              <p className="text-sm">{item.address.line1}</p>
              <p className="text-sm">{item.address.line2}</p>
              <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Dia y Hora:</span> 12, Noviembre, 2024  |  8:00 AM</p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300">Pagar Online</button>
              <button className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300">Cancelar Turno</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppoinmentsPage