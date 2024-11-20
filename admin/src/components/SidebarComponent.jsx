import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsIcon from '@mui/icons-material/Groups';

const SidebarComponent = () => {
    const {aToken} = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-white border-r">
        {
            aToken && <ul className="text-gray-600 mt-5">
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
                    <HomeRoundedIcon />
                    <p>Dasboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/todos-los-turnos'}>
                    <DateRangeRoundedIcon />
                    <p>Turnos</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`}to={'/agregar-doctor'}>
                    <AddBoxOutlinedIcon />
                    <p>Agregar Doctores</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/lista-doctores'}>
                    <GroupsIcon />
                    <p>Doctores</p>
                </NavLink>
            </ul>
        }
    </div>
     
  )
}

export default SidebarComponent