import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/loginPage";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import NavbarComponent from "./components/NavbarComponent";
import SidebarComponent from "./components/SidebarComponent";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import AllApoinmentsPage from "./pages/admin/AllAppoinmentsPage";
import AddDoctorPage from "./pages/admin/AddDoctorPage";
import DoctorsList from "./pages/admin/DoctorsListPage";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavbarComponent/>
      <div className="flex items-start">
        <SidebarComponent/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<DashboardPage/>}/>
          <Route path="/todos-los-turnos" element={<AllApoinmentsPage/>}/>
          <Route path="/agregar-doctor" element={<AddDoctorPage/>}/>
          <Route path="/lista-doctores" element={<DoctorsList/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <LoginPage />
      <ToastContainer />
    </>
  );
};

export default App;
