import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const MainLayout = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavbarComponent />
      <main>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
