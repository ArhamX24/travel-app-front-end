import { createContext, useState, useContext } from "react";

const initialState = ""

export const CategoryContext = createContext(initialState);

const CategoryProvider = ({children})=>{
    const [hotelCategory, setHotelCategory] = useState(initialState);

    return (
        <CategoryContext.Provider value={{hotelCategory, setHotelCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider