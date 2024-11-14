import { assets } from "../assets/assets";
import EastRoundedIcon from '@mui/icons-material/EastRounded';

const HeaderComponent = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">

      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Agenda turnos con <br />
          doctores de confianza
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simplemente recorre nuestra amplia lista de médicos de confianza.
            <br className="hidden sm:block"/> Agenda tu cita de forma rápida y sencilla.
          </p>
          </div>
          <a href="#speciality" className="flex items-center gap-2 bg-white px-8 py-2 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
            Agenda tu turno <EastRoundedIcon fontSize="" className="w-3 text-gray-600 "  alt="" />
          </a>
        </div>

      <div className="md:w-1/2 relative">
        <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="" />
      </div>

    </div>
  );
};

export default HeaderComponent;
