import { assets } from "../assets/assets"


const ContactPage = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>PONTE EN <span className="text-gray-700 font-semibold">CONTACTO</span></p>
      </div>

      <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />

        <div className="flex flex-col justify-center items-start gap-3">
          <p className="font-semibold text-lg text-gray-600">NUESTRA OFICINA</p>
          <p className="text-gray-500">Calle Muestra 123 <br />Piso 2 B, CABA, ARG.
          </p>
          <p className="text-gray-500">Tel: (+54) 11-54793956 <br />mcarreradev12@gmail.com</p>
          <p className="font-semibold text-lg text-gray-600">Carreras en MedReserva</p>
          <p className="text-gray-500">Informate mas sobre nuestos equipos y trabajos disponibles.</p>
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explorar Trabajos</button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage