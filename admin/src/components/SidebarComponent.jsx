import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import { DoctorContext } from "../context/DoctorContext";
import PersonIcon from '@mui/icons-material/Person';

const SidebarComponent = () => {
    const {aToken} = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext)
  return (
    <div className="min-h-screen bg-white border-r">
        {
            aToken && <ul className="text-gray-600 mt-5">
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/dashboard'}>
                    <HomeRoundedIcon className="text-primary" />
                    <p className="hidden md:block">Dasboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/todos-los-turnos'}>
                    <DateRangeRoundedIcon className="text-primary" />
                    <p className="hidden md:block">Turnos</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`}to={'/agregar-doctor'}>
                    <AddBoxOutlinedIcon className="text-primary" />
                    <p className="hidden md:block">Agregar Doctores</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/lista-doctores'}>
                    <GroupsIcon className="text-primary" />
                    <p className="hidden md:block">Doctores</p>
                </NavLink>
            </ul>
        }
                {
            dToken && <ul className="text-gray-600 mt-5">
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-dashboard'}>
                    <HomeRoundedIcon className="text-primary" />
                    <p className="hidden md:block">Dasboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-turnos'}>
                    <DateRangeRoundedIcon className="text-primary" />
                    <p className="hidden md:block">Turnos</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-perfil'}>
                    <PersonIcon className="text-primary" />
                    <p className="hidden md:block">Mi Perfil</p>
                </NavLink>
            </ul>
        }
    </div>
     
  )
}

export default SidebarComponent