import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctorsComponent from "../components/RelatedDoctorsComponent";
import { toast } from "react-toastify";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AppointmentPage = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dayOfWeek = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvaibleSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + " " + month + " " + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 20);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    setIsButtonDisabled(true);
    if (!token) {
      toast.warn("Inicie Sesion para Tomar un Turno");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + " " + month + " " + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/tomar-turno",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/mis-turnos");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const distance = e.clientX - startX;
    scrollRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    fetchDocInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, docId]);

  useEffect(() => {
    getAvaibleSlots();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docInfo]);

  useEffect(() => {

  }, [docSlots]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="Doctor's profile"
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <VerifiedIcon className="text-primary" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/*---Doctor sobre mi---*/}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 ">
                Sobre Mi{" "}
                <ErrorOutlineIcon className="transform rotate-180 text-gray-500" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 ">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 max-w-[700px] font-medium mt-1">
              Costo de la consulta:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---Turnero---*/}

        <div className="sm:ml-0 sm:pl-0 mt-4 font-medium text-gray-700">
          {docInfo.available ? (
            <div>
              <p>Agenda de Turnos</p>
              <div
                ref={scrollRef}
                className="flex gap-3 items-center w-full mt-4 overflow-x-auto"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "grab" }}
              >
                {docSlots.length &&
                  docSlots.map((item, index) => (
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index
                          ? "bg-primary text-white"
                          : "border border-gray-200"
                      }`}
                      key={index}
                    >
                      <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                      <p>{item[0] && item[0].dateTime.getDate()}</p>
                    </div>
                  ))}
              </div>

              <div
                ref={scrollRef}
                className="flex items-center gap-3 w-full mt-4 overflow-x-auto"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "grab" }}
              >
                {docSlots.length &&
                  docSlots[slotIndex].map((item, index) => (
                    <p
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                        item.time === slotTime
                          ? "bg-primary text-white"
                          : "text-gray-400 border border-gray-300"
                      }`}
                      key={index}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>
              <button
                onClick={bookAppointment}
                className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 transition-transform transform active:scale-95"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Cargando..." : "Agendar Turno"}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">
                {docInfo.name} no tiene disponibilidad en este momento.
              </p>
            </div>
          )}
        </div>

        <RelatedDoctorsComponent docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default AppointmentPage;

