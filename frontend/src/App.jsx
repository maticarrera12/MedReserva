import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DoctorsPage from "./pages/DoctorsPage"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import MyProfilePage from "./pages/MyProfilePage"
import MyAppoinmentsPage from "./pages/MyAppoinmentsPage"
import AppoinmentPage from "./pages/AppoinmentPage"
import NavbarComponent from "./components/NavbarComponent"
import FooterComponent from "./components/FooterComponent"

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavbarComponent/>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/doctores" element={<DoctorsPage/>}/>
      <Route path="/doctores/:speciality" element={<DoctorsPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/nosotros" element={<AboutPage/>}/>
      <Route path="/contacto" element={<ContactPage/>}/>
      <Route path="/mi-perfil" element={<MyProfilePage/>}/>
      <Route path="/mis-turnos" element={<MyAppoinmentsPage/>}/>
      <Route path="/turnos/:docId" element={<AppoinmentPage/>}/>
     </Routes>
     <FooterComponent/>
    </div>
  )
}

export default App