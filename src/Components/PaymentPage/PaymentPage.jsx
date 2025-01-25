import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const PaymentPage = () => {


  let navigate = useNavigate()

  const handleContinueBooking = () => {
    navigate("/")
  }
  

  return (
    <>
    <div className='w-full h-screen flex items-center justify-center bg-gray-100 text-black'>
      <div className='w-1/2 h-1/5 p-5'>
        <h1 className='my-2 text-3xl text-center'>Your Order Successfully Placed</h1>
        <button onClick={handleContinueBooking} className='lg:w-4/5 mx-auto w-full flex items-center justify-center py-3 px-5 text-white bg-primary rounded-lg mt-4 cursor-pointer font-light hover:scale-95 ease-out duration-300'>Continue to Booking</button>
      </div>
    </div>
    </>
  )
}

export default PaymentPage
