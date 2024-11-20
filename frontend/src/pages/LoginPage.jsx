
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const SIGN_UP = 'Sign Up';
  const LOGIN = 'Login';

  const [state, setState] = useState(SIGN_UP);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const userData = state === SIGN_UP ? { name, email, password } : { email, password };
      const url = state === SIGN_UP ? backendUrl + '/api/user/registrarse' : backendUrl + '/api/user/iniciar-sesion';
      const { data } = await axios.post(url, userData);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Ocurrió un error al procesar tu solicitud";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])
  

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p>
          Por favor {state === SIGN_UP ? "registrese" : "inicie sesion"} para agendar un turno{" "}
        </p>
        <p className="text-2xl font-semibold">
          {state === SIGN_UP ? "Crear Cuenta" : "Iniciar Sesion"}
        </p>

        {state === SIGN_UP && (
          <div className="w-full">
            <label htmlFor="name">Nombre Completo</label>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Contraseña</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === SIGN_UP ? "Crear Cuenta" : "Iniciar Sesion"}
        </button>

        {state === SIGN_UP  
          ? <p>Ya tienes una cuenta? <span onClick={() => setState(LOGIN)} className="text-primary underline cursor-pointer">Ingresa acá</span></p>
          : <p>Crear una nueva cuenta? <span onClick={() => setState(SIGN_UP)} className="text-primary underline cursor-pointer">Clickea acá</span></p>
        }
      </div>
    </form>
  );
};

export default LoginPage;


// import { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios"



// const LoginPage = () => {
//   const [state, setState] = useState("Sign Up");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
  

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (state === 'Sign Up') {
//         const {data} = await axios.post(backendUrl + '/api/user/registrarse',{name,password,email})
//         if(data.success){
//           localStorage.setItem('token',data.token)
//           setToken(data.token)
//         }else{
//           toast.error(data.message)
//         }
//       }else{
//         const {data} = await axios.post(backendUrl + '/api/user/iniciar-sesion',{password,email})
//         if(data.success){
//           localStorage.setItem('token',data.token)
//           setToken(data.token)
//         }else{
//           toast.error(data.message)
//         }
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   };

//   const  {backendUrl, token, setToken } = useContext(AppContext)
//   return (
//     <form onSubmit={onSubmitHandler} className="min-h[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <p>
//           Por favor {state === "Sign Up" ? "registrese" : "inicie sesion"} para
//           agendar un turno{" "}
//         </p>
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Crear Cuenta" : "Iniciar Sesion"}
//         </p>
//         {state === 'Sign Up' && <div className="w-full">
//           <p>Nombre Completo</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="text"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             required
//           />
//           </div>}
//         <div className="w-full">
//           <p>Email</p>
//         </div>
//         <div className="w-full">
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//           <p>Contraseña</p>
//         </div>
//         <div className="w-full">
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
//           {state === "Sign Up" ? "Crear Cuenta" : "Iniciar Sesion"}
//         </button>
//         {state === "Sign Up"  
//         ? <p>Ya tenes una cuenta? <span onClick={()=>setState('Login')} className="text-primary underline cursor-pointer">Ingresa aca</span></p>
//         : <p>Crear una nueva cuenta? <span onClick={()=>setState('Sign Up')} className="text-primary underline cursor-pointer">Clickea aca</span></p>
//         }
//       </div>

//     </form>
//   );
// };

// export default LoginPage;
