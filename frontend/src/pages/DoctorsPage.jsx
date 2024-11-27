import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorsPage = () => {
  const { speciality } = useParams();
  const [filterDoc, SetFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      SetFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      SetFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600 ">Busca entre los doctores especialistas.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filtros
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "Clínico general"
                ? navigate("/doctores")
                : navigate("/doctores/Clínico general")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Clínico general" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Clínico general
          </p>

          <p
            onClick={() =>
              speciality === "Ginecología"
                ? navigate("/doctores")
                : navigate("/doctores/Ginecología")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Ginecología" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Ginecología
          </p>

          <p
            onClick={() =>
              speciality === "Dermatología"
                ? navigate("/doctores")
                : navigate("/doctores/Dermatología")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatología" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatología
          </p>

          <p
            onClick={() =>
              speciality === "Pediatría"
                ? navigate("/doctores")
                : navigate("/doctores/Pediatría")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatría" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatría
          </p>

          <p
            onClick={() =>
              speciality === "Neurología"
                ? navigate("/doctores")
                : navigate("/doctores/Neurología")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurología" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurología
          </p>

          <p
            onClick={() =>
              speciality === "Gastroenterología"
                ? navigate("/doctores")
                : navigate("/doctores/Gastroenterología")
            }
            className={`w-94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterología"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterología
          </p>
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/turnos/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-red-500"
                  } `}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Disponible" : "No Disponible"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
