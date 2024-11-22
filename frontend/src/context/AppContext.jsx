import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [userData, setUserData] = useState(false);


  // obtener todos los doctores
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/lista");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-perfil", {headers:{token}})
      if (data.success) {
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorsData();
  },[]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);


  const value = {
    doctors, 
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const currencySymbol = "$";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // Estado inicial
//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [userData, setUserData] = useState(false);

//   // Obtener todos los doctores
//   const getDoctorsData = async () => {
//     try {
//       console.log("Solicitando lista de doctores..."); // Log 1
//       const { data } = await axios.get(`${backendUrl}/api/doctor/lista`);
//       console.log("Respuesta doctores:", data); // Log 2
//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error al obtener doctores:", error.message); // Log 3
//       toast.error("Error al cargar los doctores");
//     }
//   };

//   // Cargar el perfil del usuario
//   const loadUserProfileData = async () => {
//     console.log("Cargando perfil del usuario...");
//     try {
//         console.log("Token enviado:", token); // Verifica que el token sea válido
//         const { data } = await axios.get(backendUrl + "/api/user/get-perfil", {
//             headers: { token }
//         });
//         console.log("Respuesta del servidor:", data); // Verifica que la respuesta sea correcta
//         if (data.success) {
//             console.log("Perfil cargado:", data.userData); // Verifica los datos del usuario
//             setUserData(data.userData);
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         console.error("Error al cargar el perfil:", error.message);
//         toast.error("No se pudo cargar el perfil.");
//     }
// };


//   // Sincronizar token con localStorage
//   useEffect(() => {
//     if (token) {
//       console.log("Token establecido, sincronizando con localStorage..."); // Log 9
//       localStorage.setItem("token", token);
//       loadUserProfileData();
//     } else {
//       console.log("Token no encontrado, limpiando userData..."); // Log 10
//       localStorage.removeItem("token");
//       setUserData(false);
//     }
//   }, [token]);

//   // Cargar doctores al montar
//   useEffect(() => {
//     console.log("Montando AppContextProvider..."); // Log 11
//     getDoctorsData();
//   }, []);

//   // Valores compartidos por el contexto
//   const value = {
//     doctors,
//     getDoctorsData,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;



