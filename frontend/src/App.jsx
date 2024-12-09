import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import AppointmentPage from "./pages/AppointmentPage";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "../src/admin/pages/admin/DashboardPage";
import AllApoinmentsPage from "../src/admin/pages/admin/AllAppoinmentsPage";
import AddDoctorPage from "../src/admin/pages/admin/AddDoctorPage";
import DoctorsList from "../src/admin/pages/admin/DoctorsListPage";
import DoctorDashboards from "../src/admin/pages/doctor/DoctorDashboards";
import DoctorAppoinments from "../src/admin/pages/doctor/DoctorAppoinments";
import DoctorProfile from "../src/admin/pages/doctor/DoctorProfile";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ToastContainer,toast } from "react-toastify";
import { AdminContext } from "./admin/context/AdminContext";
import { DoctorContext } from "./admin/context/DoctorContext";
import { useContext, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import LoginAdminPage from "./admin/pages/LoginAdminPage";


const App = () => {
  const { aToken } = useContext(AdminContext); 
  const { dToken } = useContext(DoctorContext); 

  useEffect(() => {
    fetch("https://medreservabe.onrender.com")
      .then(() => console.log("Backend activado"))
      .catch((err) => console.error("Error al activar el backend:", err));
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Rutas del Frontend - Siempre accesibles */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctores" element={<DoctorsPage />} />
          <Route path="/doctores/:speciality" element={<DoctorsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/mi-perfil" element={<MyProfilePage />} />
          <Route path="/mis-turnos" element={<MyAppointmentsPage />} />
          <Route path="/turnos/:docId" element={<AppointmentPage />} />
          <Route path="/success-payment" element={<SuccessPage />} />
          <Route path="/error-payment" element={<ErrorPage />} />
        </Route>

        {/* Rutas del Admin - Solo accesibles si autenticado */}
        <Route element={aToken ? <AdminLayout /> : <Navigate to="/admin-login" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/todos-los-turnos" element={<AllApoinmentsPage />} />
          <Route path="/agregar-doctor" element={<AddDoctorPage />} />
          <Route path="/lista-doctores" element={<DoctorsList />} />
        </Route>

        {/* Rutas del Doctor - Solo accesibles si autenticado */}
        <Route element={dToken ? <AdminLayout /> : <Navigate to="/admin-login" />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboards />} />
          <Route path="/doctor-turnos" element={<DoctorAppoinments />} />
          <Route path="/doctor-perfil" element={<DoctorProfile />} />
        </Route>
        <Route path="/admin-login" element={<LoginAdminPage />} /> {/* Nueva ruta */}

      </Routes>
    </>
  );
};

export default App;
