import React from 'react'
import { useSelector } from 'react-redux'

const OrderHistoryPage = () => {

  const hotelsBooked = useSelector((Store)=> Store.user.allOrders);

  return (
    <div className='w-full h-90vh'>
      <h2 className='text-3xl text-primary text-center mt-4 mb-1'>Your History</h2>
      <p className='border-b-2 border-primary w-1/2 mx-auto mb-3'></p>
      <div className='w-4/5 h-full mx-auto'>
      {
        hotelsBooked.map((hotel) => {
          return(
            <div key={hotel?._id} className='flex items-center justify-between border-b border-primary py-3 px-2'>
                <img src={hotel.image} alt="" className='w-24' />
                <span>{hotel?.city}, {hotel?.country}</span>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default OrderHistoryPage
