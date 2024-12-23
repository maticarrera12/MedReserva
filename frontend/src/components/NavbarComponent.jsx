import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import { RiMenu5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";




const NavbarComponent = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden  md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctores">
          <li className="py-1">DOCTORES</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="nosotros">
          <li className="py-1">NOSOTROS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="contacto">
          <li className="py-1">CONTACTO</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center  gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <IoIosArrowDown  className="w-2.5" />
            <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-36 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/mi-perfil")}
                  className="hover:text-black cursor-pointer"
                >
                  Mi Perfil
                </p>
                <p
                  onClick={() => navigate("mis-turnos")}
                  className="hover:text-black cursor-pointer"
                >
                  Mis Turnos
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Cerrar Sesion
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light"
          >
            Crear cuenta
          </button>
        )}

        <RiMenu5Line className="w-6 block md:hidden" fontSize="large" onClick={() => setShowMenu(true)} />
        {/* -------menumobile------- */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white   transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <RxCross2
              fontSize="large"
              className="w-7 text-primary"
              onClick={() => setShowMenu(false)}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-1 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctores">
              <p className="px-4 py-1 rounded inline-block">DOCTORES</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/nosotros">
              <p className="px-4 py-1 rounded inline-block">NOSOTROS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contacto">
              <p className="px-4 py-1 rounded inline-block">CONTACTANOS</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
