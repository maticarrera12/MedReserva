import { useState } from "react";

const LoginPage = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="min-h[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p>
          Por favor {state === "Sign Up" ? "registrese" : "inicie sesion"} para
          agendar un turno{" "}
        </p>
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Crear Cuenta" : "Iniciar Sesion"}
        </p>
        {state === 'Sign Up' && <div className="w-full">
          <p>Nombre Completo</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.name)}
            value={name}
            required
          />
          </div>}
        <div className="w-full">
          <p>Email</p>
        </div>
        <div className="w-full">
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.email)}
            value={email}
            required
          />
          <p>Contraseña</p>
        </div>
        <div className="w-full">
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.password)}
            value={password}
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Crear Cuenta" : "Iniciar Sesion"}
        </button>
        {state === "Sign Up"  
        ? <p>Ya tenes una cuenta? <span onClick={()=>setState('Login')} className="text-primary underline cursor-pointer">Ingresa aca</span></p>
        :<p>Crear una nueva cuenta? <span onClick={()=>setState('Sign Up')} className="text-primary underline cursor-pointer">Clickea aca</span></p>
        }
      </div>

    </form>
  );
};

export default LoginPage;
