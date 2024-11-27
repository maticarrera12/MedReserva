import { assets } from "../assets/assets"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const FooterComponent = () => {
  return (
    <div className="md:mx-10">
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis debitis in amet vero facilis expedita provident quaerat ducimus earum, quos maiores.</p>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">COMPAÑIA</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>Home</li>
                <li>Nosotros</li>
                <li>Contactanos</li>
                <li>Politicas de Privacidad</li>
            </ul>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">CONTACTAME</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li className="flex gap-1"><PhoneIphoneIcon fontSize="small"/>+54 1154793056</li>
                <li className="flex gap-1.5"><MailOutlineIcon fontSize="small"/>mcarreradev12@gmail.com</li>
                <div  className="flex gap-2">
                    <li className="cursor-pointer hover:text-githubOrange transition-all duration-500"><GitHubIcon fontSize="large"/></li>
                    <li className="cursor-pointer hover:text-linkedinBlue transition-all duration-500"><LinkedInIcon fontSize="large"/></li>
                </div>
            </ul>
        </div>

    </div>
    <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ MedReserva - All Right Reserved. </p>
    </div>
    </div>
  )
}

export default FooterComponent