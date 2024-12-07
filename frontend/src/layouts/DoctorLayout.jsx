import { ToastContainer } from "react-toastify";
import SidebarComponent from "../admin/components/SidebarComponent";
import NavbarComponent from "../admin/components/NavbarComponent";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminLayout = () => {
  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavbarComponent />
      <div className="flex items-start">
        <SidebarComponent />
        <main>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </main>
      </div>
    </div>
  );
};

export default AdminLayout;