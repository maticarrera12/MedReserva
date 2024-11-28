import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DoctorsPage from "./pages/DoctorsPage"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import MyProfilePage from "./pages/MyProfilePage"
import NavbarComponent from "./components/NavbarComponent"
import FooterComponent from "./components/FooterComponent"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAppointmentsPage from "./pages/MyAppointmentsPage"
import AppointmentPage from "./pages/AppointmentPage"
import ErrorPage from "./pages/errorPage"
import SuccessPage from "./pages/SuccessPage"

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <NavbarComponent/>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/doctores" element={<DoctorsPage/>}/>
      <Route path="/doctores/:speciality" element={<DoctorsPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/nosotros" element={<AboutPage/>}/>
      <Route path="/contacto" element={<ContactPage/>}/>
      <Route path="/mi-perfil" element={<MyProfilePage/>}/>
      <Route path="/mis-turnos" element={<MyAppointmentsPage/>}/>
      <Route path="/turnos/:docId" element={<AppointmentPage/>}/>
      <Route path="/success-payment" element={<SuccessPage/>}/>
      <Route path="/error-payment" element={<ErrorPage />} />
     </Routes>
     <FooterComponent/>
    </div>
  )
}

export default App