import React from 'react'
import { useSelector } from 'react-redux'
import HotelCard from '../HotelCard/HotelCard'

const Wishlist = () => {


  let wishlistItems = useSelector((Store) => Store.wishlist.items)

  return (
    <div className='w-full h-screen'>
      <h2 className='text-3xl text-primary text-center mt-4 mb-1'>Your Wishlist</h2>
      <p className='border-b-2 border-primary w-1/2 mx-auto mb-3'></p>
      <div className='flex items-center justify-around'>
      {
        wishlistItems?.map((hotel) => {
          return (
            <div key={hotel?._id} className=''>
              <HotelCard hotel={hotel}></HotelCard>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Wishlist
