import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTypeOfProperty } from '../../Store/FilterSlice';

const TypeOfPlace = () => {

    const dispatch = useDispatch();

    let typeOfProperty = useSelector((Store)=> Store.filter.typeOfProperty)

    

   const placesArray = [
    { id: 1, "type": "Hotel"},
    { id: 2, "type": "House"},
    { id: 3, "type": "Flat"},
    { id: 4, "type": "Guest House"},
   ]

   const handleTypeOfProperty = (type) => {
     dispatch(setTypeOfProperty(type))
   }
   

  return (
    <div className='flex items-center justify-between my-3 w-3/5'>
        {
            placesArray.map((places)=>{
                return (
                    <div onClick={()=> {handleTypeOfProperty(places.type)}} key={places.id} className={`border px-3 py-1 hover:bg-gray-100 duration-200 ease-out cursor-pointer rounded-2xl ${typeOfProperty == places.type ? "bg-gray-200" : ""}`}>
                        <span>{places.type}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TypeOfPlace
