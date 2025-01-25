import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTypeOfRating } from '../../Store/FilterSlice'

const Ratings = () => {

  const dispatch = useDispatch();

  let typeOfRating = useSelector((Store)=> Store.filter.typeOfRating)
   
    const ratings = [
        { id: 1, rating: 1},
        { id: 2, rating: 2 },
        { id: 3, rating: 3 },
        { id: 4, rating: 4 },
        { id: 5, rating: 5 }
    ]

    const handleTypeOfRating = (rating) => {
      dispatch(setTypeOfRating(rating))
    }
    

  return (
    <div className='flex items-center justify-between my-3 w-1/2'>
      {
        ratings.map((rating)=> {
            return(
                <div onClick={()=> {handleTypeOfRating(rating.rating)}} key={rating.id} className={`border px-3 py-1 hover:bg-gray-100 duration-200 ease-out cursor-pointer rounded-2xl ${typeOfRating == rating.rating ? "bg-gray-200" : ""}`}>
                    <span>{rating.rating}+</span>
                </div>
            )
        })
      }
    </div>
  )
}

export default Ratings
