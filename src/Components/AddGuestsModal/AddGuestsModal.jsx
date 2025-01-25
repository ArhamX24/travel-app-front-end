import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { setGuests, setInfants } from '../Store/DateSlice'

const AddGuestsModal = ({isModalOpen, setIsModalOpen, numberOfGuests}) => {

    const [noOfAdults, setNoOfAdults] = useState(1)
    const [noOfChildren, setNoOfChildren] = useState(0)
    const [noOfInfants, setNoOfInfants] = useState(0)

    let dispatch = useDispatch()

    const handleCloseModal = () => {
      setIsModalOpen(!isModalOpen)
    }

    const handleAddAdults = () => {
      noOfAdults + noOfChildren < numberOfGuests ? setNoOfAdults(noOfAdults + 1) : ""
      dispatch(setGuests((noOfAdults + noOfChildren) + 1 ))
    }
    
    const handleTRemoveAdults = () => {
      noOfAdults > 0 ? setNoOfAdults(noOfAdults - 1) : ""
      dispatch(setGuests((noOfAdults + noOfChildren) - 1))
    }
    
    const handleAddChildren = () => {
      noOfAdults + noOfChildren < numberOfGuests ? setNoOfChildren(noOfChildren + 1) : ""
      dispatch(setGuests((noOfAdults + noOfChildren) + 1))
    }
    
    const handleRemoveChildren = () => {
      noOfChildren > 0 ? setNoOfChildren(noOfChildren - 1) : ""
      dispatch(setGuests((noOfAdults + noOfChildren) - 1))
    }
    
    const handleAddInfants = () => {
      noOfInfants < 5 ? setNoOfInfants(noOfInfants + 1) : ""
      dispatch(setInfants(noOfInfants + 1))
    }
    
    const handleRemoveInfants = () => {
      noOfInfants > 0 ? setNoOfInfants(noOfInfants - 1) : ""
      dispatch(setInfants(noOfInfants - 1))
    }
    
    const handleModalContainer = (e) => {
      e.stopPropagation()
    }
    

  return (
    <div className={isModalOpen ? `w-80 h-fit absolute top-64 right-11 bg-gray-50 rounded-lg border-t-2 z-10` : "hidden"} onClick={(e) => {handleModalContainer(e)}}>
      <div className='flex items-center justify-between w-11/12 my-5 mx-auto'>
        <div className='w-1/2'>
        <p>Adults</p>
        <p>Age 13+</p>
        </div>
        <div className='w-1/2 flex items-center justify-end'>
        <span onClick={handleTRemoveAdults} className={noOfAdults > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfAdults}</span>
        <span onClick={handleAddAdults} className={noOfAdults + noOfChildren < numberOfGuests ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
      </div>

      <div className='flex items-center justify-between w-11/12 my-5 mx-auto'>
        <div className='w-1/2'>
        <p>Children</p>
        <p>Age 2-12</p>
        </div>
        <div className='w-1/2 flex items-center justify-end'>
        <span onClick={handleRemoveChildren} className={noOfChildren > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfChildren}</span>
        <span onClick={handleAddChildren} className={noOfChildren + noOfAdults < numberOfGuests ?  'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
      </div>

      <div className='flex items-center justify-between w-11/12 my-5 mx-auto'>
        <div className='w-1/2'>
        <p>Infants</p>
        <p>Age 0-2</p>
        </div>
        <div className='w-1/2 flex items-center justify-end'>
        <span onClick={handleRemoveInfants} className={noOfInfants > 0 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M5 11V13H19V11H5Z"></path>
            </svg>
        </span>
        <span className='w-10 text-center'>{noOfInfants}</span>
        <span onClick={handleAddInfants} className={noOfInfants < 5 ? 'rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-pointer' : "rounded-full p-2 flex items-center justify-center bg-white border border-black cursor-not-allowed opacity-20 pointer-events-none"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
        </span>
        </div>
      </div>

      <p className='text-xs w-11/12 mx-auto my-4'>This place has a maximum of {numberOfGuests} guests, not including infants</p>

      <div className='w-11/12 flex justify-end items-center'>
      <span className='hover:underline cursor-pointer' onClick={handleCloseModal}>Close</span>
      </div>
    </div>
  )
}

export default AddGuestsModal
