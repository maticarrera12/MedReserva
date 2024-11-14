import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';



const NavbarComponent = () => {

    const navigate =useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden  md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctores'>
                <li className='py-1'>DOCTORES</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='nosotros'>
                <li className='py-1'>NOSOTROS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='contacto'>
                <li className='py-1'>CONTACTO</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token ? <div className='flex items-center  gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                    <KeyboardArrowDownOutlinedIcon className='w-2.5'  alt="" />
                    <div className='absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-36 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/mi-perfil')} className='hover:text-black cursor-pointer'>Mi Perfil</p>
                            <p onClick={()=>navigate('mis-turnos')} className='hover:text-black cursor-pointer'>Mis Turnos</p>
                            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Cerrar Sesion</p>
                        </div>
                    </div>
                </div>
                :  <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Crear cuenta</button>
            }
            <MenuIcon fontSize='large' onClick={()=>setShowMenu(true)} className='w-6 md:hidden'  alt="" />
            {/* -------menumoble------- */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white   transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36'  src={assets.logo} alt="" />
                    <CloseIcon fontSize='large'  className='w-7 text-primary' onClick={()=>setShowMenu(false)}  alt="" />
                </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink onClick={()=>setShowMenu(false)} to='/'><p className="px-4 py-1 rounded inline-block">HOME</p></NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/doctores'><p className="px-4 py-1 rounded inline-block">DOCTORES</p></NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/nosotros'><p className="px-4 py-1 rounded inline-block">NOSOTROS</p></NavLink>
                <NavLink onClick={()=>setShowMenu(false)} to='/contacto'><p className="px-4 py-1 rounded inline-block">CONTACTANOS</p></NavLink>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default NavbarComponent