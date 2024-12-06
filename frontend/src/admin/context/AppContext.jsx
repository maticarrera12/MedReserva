import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const calculateAge = (dob) =>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    } 


    const months = [
        "",
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
    
        // Formatear la fecha de la cita
        const slotDateFormat = (slotDate) => {
          const dateArray = slotDate.split(" ");
          return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2];
        };


        const currency = "$"

        const value = {
            calculateAge,
            slotDateFormat,
            currency
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider