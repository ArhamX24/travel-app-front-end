import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBedRoomsInStore, setBedsInStore, setBathroomsInStore } from '../../Store/FilterSlice'

const RoomsAndBeds = () => {

let dispatch = useDispatch()

let noOfBeds = useSelector((Store)=> Store.filter.noOfBeds)
let noOfBedRooms = useSelector((Store)=> Store.filter.noOfBedRooms)
let noOfBathRooms = useSelector((Store)=> Store.filter.noOfBathrooms)



const [bedrooms, setBedrooms] = useState(0)
const [beds, setBeds] = useState(0)
const [bathrooms, setBathrooms] = useState(0)



const removeBedRooms = () => {
    bedrooms > 0 && setBedrooms(noOfBedRooms - 1)
    dispatch(setBedRoomsInStore(bedrooms - 1))
}

const addBedRooms = () => {
    bedrooms < 10 && setBedrooms(noOfBedRooms + 1)
    dispatch(setBedRoomsInStore(bedrooms + 1))
}

const removeBeds = () => {
    beds > 0? setBeds(noOfBeds - 1) : ""
    dispatch(setBedsInStore(beds - 1))
}

const addBeds = () => {
    beds < 10 && setBeds(noOfBeds + 1)
    dispatch(setBedsInStore(beds + 1))
}



const removeBathrooms = () => {
    bathrooms > 0 && setBathrooms(noOfBathRooms - 1)
    dispatch(setBathroomsInStore(bathrooms - 1))
}

const addBathrooms = () => {
    bathrooms < 10 && setBathrooms(noOfBathRooms + 1)
    dispatch(setBathroomsInStore(bathrooms + 1))
}


return (
    <div className='w-full my-2'>
      <div className='w-full flex items-center justify-between my-3'>
        <span>BedRooms</span>
        <div className='flex items-center'>
        <span onClick={removeBedRooms} className={noOfBedRooms > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfBedRooms}</span>
        <span onClick={addBedRooms} className={noOfBedRooms < 10 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
        </div>

        <div className='w-full flex items-center justify-between my-3'>
        <span>Beds</span>
        <div className='flex items-center'>
        <span onClick={removeBeds} className={noOfBeds > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfBeds}</span>
        <span onClick={addBeds} className={noOfBeds < 10 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
        </div>

        <div className='w-full flex items-center justify-between my-3'>
        <span>Bathrooms</span>
        <div className='flex items-center'>
        <span onClick={removeBathrooms} className={noOfBathRooms > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfBathRooms}</span>
        <span onClick={addBathrooms} className={noOfBathRooms < 10 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
        </div>
    </div>
  )
}

export default RoomsAndBeds
