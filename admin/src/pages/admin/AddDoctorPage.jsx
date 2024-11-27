import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctorPage = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Año");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Clínico general");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandle = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Imagen No Seleccionada");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/agregar-doctor",
        formData,
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAbout('')
        setDegree('')
        setAddress1('')
        setAddress2('')
      }else{
        toast.error(data.message)
      };
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  };

  return (
    <form onSubmit={onSubmitHandle} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Agregar Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Subir Foto</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Tu Nombre</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-1"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-1"
                type="password"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experiencia</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-1"
              >
                <option value="1 Año">1 Año</option>
                <option value="2 Años">2 Años</option>
                <option value="3 Años">3 Años</option>
                <option value="4 Años">4 Años</option>
                <option value="5 Años">5 Años</option>
                <option value="6 Años">6 Años</option>
                <option value="7 Años">7 Años</option>
                <option value="8 Años">8 Años</option>
                <option value="9 Años">9 Años</option>
                <option value="+10 Años">+10 Años</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Precio de la Consulta</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-1"
                type="number"
                placeholder="Precio"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Especialidad</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-1"
                name=""
                id=""
              >
                <option value="Clínico general">Clínico general</option>
                <option value="Ginecología">Ginecología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Neurología">Neurología</option>
                <option value="Gastroenterología">Gastroenterología</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Educacion</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Educacion"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Direccion</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Direccion 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Direccion 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">Sobre Ti</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Escribe sobre ti"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Agregar Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctorPage;
