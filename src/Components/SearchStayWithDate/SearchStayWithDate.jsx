import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import DateSelector from '../DateSelector/DateSelector'
import { CategoryContext } from '../Contexts/Category-Context'
import { useDispatch,useSelector } from 'react-redux'
import {openSearchModal, setDestination,setGuests,setSearchDestinationOn, setSearchDestinationOff,closeSearchModal, setDestinationModal} from "../Store/DateSlice"
import { useNavigate } from 'react-router-dom'

const SearchStayWithDate = () => {

    const today = new Date(); 
    const date = today.getDate(); 
    const date2 = today.getDate() + 1
    const month = today.getMonth() + 1;
    const year = today.getFullYear(); 
    const currentDate = `${date}/${month}/${year}`;
    const date2String = `${date2}/${month}/${year}`;

    const [hotels, setHotels] = useState()
    const {hotelCategory, setHotelCategory} = useContext(CategoryContext)

    let destination = useSelector((Store)=> Store.date.destination)
    let guests = useSelector((Store)=> Store.date.noOfGuests)
    let isSearchDestinationOpen = useSelector((Store) => Store.date.isSearchDestinationOpen)
    let isDestinationModalOpen = useSelector((Store)=> Store.date.isDestinationModalOpen)

   let dispatch = useDispatch();
   let navigate = useNavigate()
   
   const getHotels = async () => {
       let res =  await axios.get(`https://travel-app-backend-0ejv.onrender.com/hotels?category=${hotelCategory}`)
       setHotels(res.data)
    }

    useEffect(() => {
        getHotels()
    }, [hotelCategory])

    
    const handleDestinationChange = (event) => {
        dispatch(setDestination(event.target.value))
    }

    const handleGuestsChange = (event) => {
        dispatch(setGuests(event.target.value))
    }
    
    const destinationOptions = hotels?.filter(
        ({ address, city, state, country }) =>
          address?.toLowerCase().includes(destination?.toLowerCase()) ||
          city?.toLowerCase().includes(destination?.toLowerCase()) ||
          state?.toLowerCase().includes(destination?.toLowerCase()) ||
          country?.toLowerCase().includes(destination?.toLowerCase())
      );
    

    const handleDestinationClick = (destination) => {
      dispatch(setDestination(destination?.city))
      dispatch(setDestinationModal(false))
    }
    
    const handleDestinationFocus = () => {
      dispatch(setSearchDestinationOn())
    }
    
    const handleGuestFocus = () => {
      dispatch(setSearchDestinationOff())
    }
    
    const handleSearch = () => {
      dispatch(closeSearchModal())
      dispatch(setDestinationModal(false))
      navigate("/searchresult")
    }

    const handleSearchModal = (e) => {
      e.stopPropagation()
    }
    

    const handleSearchOff = () => {
       dispatch(openSearchModal())
    }

    const handleSetDestinationClick = () => {
      dispatch(setDestinationModal(true))
    }
    


  return (
    <div className='h-full w-full fixed top-0 left-0 bg-overlay z-10' onClick={handleSearchOff}>
      <div className="bg-white w-full gap-y-4 px-6 rounded-lg py-2 flex-col lg:flex-row flex items-center absolute top-24 lg:left-11 gap-x-4 z-20" onClick={(e) =>handleSearchModal(e)}>
        <div className="location-container w-full lg:w-fit">
            <label className='mr-2'>Where</label>
            <input value={destination} onFocus={handleDestinationFocus} onChange={handleDestinationChange} onClick={handleSetDestinationClick} className='search-dest focus:outline-none bg-gray-100 border px-2 py-1 rounded-lg' placeholder='Search Destination' />
        </div>
        <div className="location-container flex items-center w-full lg:w-fit" onClick={()=> {dispatch(setDestinationModal(false))}}>
            <label className='mr-2'>Check In</label>
            <DateSelector placeholder={currentDate} type={"in"}></DateSelector>
        </div>
        <div className="location-container flex items-center w-full lg:w-fit"  onClick={()=> {dispatch(setDestinationModal(false))}}>
            <label className='mr-2'>Check Out</label>
            <DateSelector placeholder={date2String} type={"out"}></DateSelector>
        </div>
        <div className="location-container w-full lg:w-fit"  onClick={()=> {dispatch(setDestinationModal(false))}}>
            <label className='mr-2'>No Of Guests</label>
            <input onFocus={handleGuestFocus} value={guests} onChange={handleGuestsChange} className='search-dest focus:outline-none bg-gray-100 border px-2 py-1 rounded-lg' placeholder='Add Guests' />
        </div>
        <div className="search-container cursor-pointer text-white" onClick={handleSearch}>
            <span className='bg-primary flex items-center justify-center p-4 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={20} width={20} fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
            <span className='ml-1 text-sm'>Search</span>
            </span>
        </div>
        {
            isSearchDestinationOpen && isDestinationModalOpen ? <div className='h-96 w-full lg:w-64 absolute top-16 lg:top-20 lg:left-12 overflow-y-scroll bg-white z-30'>
            <p className='text-center my-2 text-sm'>Suggested Destinations</p>
            {
              isDestinationModalOpen &&
                destinationOptions?.map((destination, idx)=>{
                    return <div key={idx} className="bg-white rounded-lg py-2 px-2 border-b-2 cursor-pointer hover:bg-slate-50" onClick={()=> {handleDestinationClick(destination)}}>
                        <p className="">{destination.city}, {destination.country}</p>
                        </div>
                })
            }
            </div>
            :
            ""
        }
      </div>
    </div>
  )
}

export default SearchStayWithDate
