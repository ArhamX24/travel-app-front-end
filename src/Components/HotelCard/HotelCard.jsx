import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { addWishlistItem, removeWishlistItem } from '../Store/WishlistSlice'
import { setOpenLoginModal } from "../Store/UserSlice"

const HotelCard = ({hotel}) => {
  const [isWishlist, setIsWishlist] = useState(false)
  
  let navigate = useNavigate()
  const dispatch = useDispatch();

  let {name, image, _id, address,city,  state, price, rating } = hotel

  let wishlistItems = useSelector((Store) => Store.wishlist.items)

  let isUserLoggedIn = useSelector((Store) => Store.user.isUserLoggedIn)

  let itemInWishlist = () => {
    let item =  wishlistItems.find((item) => item._id == _id);
    if(item){
      return true
    }else{
      return false
    }
  }

  const handleHotelCardClick = () => {
    navigate(`/hotels/${name}/${address}/${state}/${_id}`)
  }

  const handleAddWishlist = (e) => {
    e.stopPropagation()
    if(isUserLoggedIn){
      if(!itemInWishlist()){
        dispatch(addWishlistItem(hotel))
      }
    }else{
      dispatch(setOpenLoginModal())
    }
  }
  
  const handleRemoveWishlist = (e) => {
    e.stopPropagation()
    dispatch(removeWishlistItem(_id))
  }
  

  return (
    <div className='relative md:w-72 w-96 max-h-96 md:max-h-64 m-4 rounded-md hover:scale-105 ease-out duration-500'>
      <div className="shadow-md after cursor-pointer "  onClick={handleHotelCardClick}>
        <img src={image}alt="hotel-img" className='h-36 w-full bg-cover bg-center' />
        <div className='py-2 px-1'>
          <div className='flex items-center justify-between w-full mx-y'>
            <span>{city}, {state}</span>
            <span className='flex items-center'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                </span>
                <span>{rating}</span>
            </span>
          </div>
            <p className='hotel-price flex items-center mt-4'>
                <span className='price'>₹ {price}</span>
                <span className='per-night text-sm'>/night</span>
            </p>
        </div>
      </div>
      <div className='absolute right-2 top-1 cursor-pointer hover:outline-2 hover:scale-125 ease-out duration-500' >
        {
          !itemInWishlist() ?
          <svg onClick={(e)=> {handleAddWishlist(e)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
          </svg>
          :
          <svg onClick={(e)=> {handleRemoveWishlist(e)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#900101"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
          </svg>
        }
      
      </div>
    </div>
  )
}

export default HotelCard
