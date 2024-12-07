import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import AdminContextProvider from "./admin/context/AdminContext.jsx"; // Asegúrate de importar AdminContextProvider
import DoctorContextProvider from "./admin/context/DoctorContext.jsx";
import AppAdminContextProvider from "./admin/context/AppAdminContext.jsx";

createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    <AppContextProvider>
          <AppAdminContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
        <App />
        </DoctorContextProvider>
      </AdminContextProvider>
        </AppAdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);

