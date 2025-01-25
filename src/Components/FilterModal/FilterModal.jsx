import React from 'react'
import PriceFilter from './PriceFilter/PriceFilter'
import { useDispatch } from 'react-redux'

import { setCloseFilterModal , setClearAll } from '../Store/FilterSlice'
import RoomsAndBeds from './Roomsandbed/RoomsAndBeds'
import TypeOfPlace from './TypeOfPlace/TypeOfPlace'
import Ratings from './Ratings/Ratings'

const FilterModal = () => {

   let dispatch = useDispatch()

   const handleClose = () => {
     dispatch(setCloseFilterModal())
   }

   const handleModal = (e) => {
     e.stopPropagation()
   }
   
   const handleClear = () => {
     dispatch(setClearAll())
   }
   


  return (
    <div className='h-full w-full fixed top-0 left-0 bg-overlay z-10 flex items-center justify-center' onClick={handleClose}>
    <div className='lg:w-1/2 lg:h-3/4 w-full bg-white rounded-lg overflow-y-scroll' onClick={(e)=> {handleModal(e)}}>
      <div className='w-11/12 mx-auto'>
          <div className='w-1/2 flex items-center justify-between pl-4 py-2 mt-2'>
                <span className='hover:bg-gray-100 duration-300 ease-in-out cursor-pointer rounded-full' onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                  </span>
                <span>Filters</span>
          </div>
            <div className='px-4 py-2 border-y border-gray-400'>
              <h2 className='text-xl'>Price Range</h2>
              <PriceFilter></PriceFilter>
            </div>
            <div className='px-4 py-2 border-b border-gray-400'>
            <h2 className='text-xl'>Rooms And beds</h2>
            <RoomsAndBeds></RoomsAndBeds>
            </div>
            <div className='px-4 py-2 border-b border-gray-400'>
            <h2 className='text-xl'>Type Of Place</h2>
            <TypeOfPlace></TypeOfPlace>
            </div>
            <div className='px-4 py-2 border-b border-gray-400'>
            <h2 className='text-xl'>Type Of Rating</h2>
            <Ratings></Ratings>
            </div>
            <div className='w-4/5 flex items-center justify-between pl-4 py-2 my-2'>
                <span className='hover:underline cursor-pointer' onClick={handleClear}>
                    Clear All
                  </span>
                <span className='bg-primary text-white hover:scale-95 duration-300 ease-out cursor-pointer px-4 py-2 rounded-3xl' onClick={handleClose}>Apply</span>
          </div>
      </div>
    </div>
    </div>
  )
}

export default FilterModal
