import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctorsComponent = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    // Verificamos si speciality y docId están presentes
    if (doctors.length > 0 && speciality && docId) {
      // Filtramos los doctores según la especialidad y el ID del doctor
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase() && doc._id !== docId
      );


      // Actualizamos el estado con los doctores filtrados
      setRelDoc(filteredDoctors);
    } else {
      console.log("No doctors or missing speciality/docId");
    }
  }, [doctors, speciality, docId]); // Dependencias del useEffect

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Doctores Similares</h1>
      <p className="sm:w-1/3 text-center text-sm">Simplemente busca entre nuestra lista de Doctores.</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.length > 0 ? (
          relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/turnos/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
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
          ))
        ) : (
          <p>No se encontraron doctores relacionados para esta especialidad.</p>
        )}
      </div>

      <button
        onClick={() => {
          navigate("/doctores");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        Más
      </button>
    </div>
  );
};

export default RelatedDoctorsComponent;




