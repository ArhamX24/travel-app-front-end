import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckInDate, setCheckOutDate, setSearchDestinationOff } from "../Store/DateSlice";


const DateSelector = ({placeholder, type, width}) => {

    let dispatch = useDispatch()

    let checkInDate = useSelector((Store)=> Store.date.checkInDate);
    let checkOutDate = useSelector((Store)=> Store.date.checkOutDate);

    const handleDateChange = (date) => {
      type == "in" ? dispatch(setCheckInDate(date)) : dispatch(setCheckOutDate(date))
    }

    const handleDestinationFocus = () => {
      dispatch(setSearchDestinationOff())
    }
    
     
    return (
        <Datepicker
        selected={type == "in" ? checkInDate : checkOutDate}
        onChange={date => handleDateChange(date)}
        onFocus={handleDestinationFocus}
        dateFormat={"dd/MM/yyyy"}
        placeholderText={placeholder}
        closeOnScroll={true}
        className={`focus:outline-none bg-gray-100 border px-2 py-1 rounded-lg text-black w-${width}`}
        ></Datepicker>
    )
}

export default DateSelector


