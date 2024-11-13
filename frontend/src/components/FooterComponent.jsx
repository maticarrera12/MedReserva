import { assets } from "../assets/assets"


const FooterComponent = () => {
  return (
    <div className="md:mx-10">
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum explicabo labore ut et, eius ab provident quod ea maiores non tenetur, enim rem quos aliquid praesentium optio blanditiis maxime aliquam magnam officiis deleniti. Ipsa adipisci quidem necessitatibus veritatis debitis in amet vero facilis expedita provident quaerat ducimus earum, quos maiores.</p>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">COMPANIA</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>Home</li>
                <li>Nosotros</li>
                <li>Contactanos</li>
                <li>Politicas de Privacidad</li>
            </ul>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">PONTE EN CONTACTO</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>+54 1154793056</li>
                <li>mcarreradev12@gmail.com</li>
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