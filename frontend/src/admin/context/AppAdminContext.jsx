import { createContext } from "react";

export const AppAdminContext = createContext()

const AppAdminContextProvider = (props)=>{

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
    
      const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split(" ");
        if (dateArray.length === 3) {
            return dateArray[0] + " " + months[Number(dateArray[1])] + "," + dateArray[2];
        } else {
            return "Invalid Date"; // You could return an error message or default format
        }
    };


        const currency = "$"

        const value = {
            calculateAge,
            slotDateFormat,
            currency
    }

    return(
        <AppAdminContext.Provider value={value}>
            {props.children}
        </AppAdminContext.Provider>
    )
}

export default AppAdminContextProvider