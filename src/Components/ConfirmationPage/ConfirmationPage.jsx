import {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setAllOrders } from '../Store/UserSlice'

const ConfirmationPage = () => {
    let {id} = useParams()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    let checkInDate = useSelector((Store)=> Store.date.checkInDate)
    let checkOutDate = useSelector((Store)=> Store.date.checkOutDate)
    let noOfGuests = useSelector((Store)=> Store.date.noOfGuests)

    let navigate = useNavigate()
    const dispatch = useDispatch();

    const getData = async () => {
        setLoading(true)
          let res = await axios.get(`https://travel-app-backend-0ejv.onrender.com/hotels/${id}`)
          setData(res.data)
        setLoading(false)
      }

    useEffect(() => {
        getData()
    }, [])

    let {image , address, rating, price, name, state} = data

    const noOfNights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24)

    const dayPrice = price * noOfNights;
    const serviceFee = 2000;

    const totalPrice = dayPrice + serviceFee;

    const loadScript = (src) => {
      return new Promise((resolve)=> {
        const script = document.createElement("script");
        script.src = src;
        script.onload= () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script);
      })
    }

    const handleConfirmBooking = async () => {
      const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if(!response){
        alert('Error loading Razorpay SDK')
      }

      const options = {
        key: "rzp_test_lGGf288FZ0Z5wy",
        amount: totalPrice * 100,
        currency: "INR",
        name: "HikesTravel",
        email : "arham12@gmail.com",
        contact: "9914173314",
        description: "Thankyou For Booking",

        handler: ({ payment_id }) => {
          dispatch(setAllOrders(data))
          navigate("/order-summary")
        },
        
        prefill: {
          name: "Arham",
          email: "arham12@gmail.com",
          contact: "9914173314",
        }

      }

      let paymentObject = new Razorpay(options)
      paymentObject.open();
    };
    


  return (
    <>
    {
        loading ? <div className='w-full h-screen flex items-center justify-center bg-white'><span className="loading loading-bars loading-lg"></span></div>
        :
        <div className='w-full lg:h-screen h-full bg-gray-100'>
        <nav className='w-full flex justify-between items-center md:p-4 p-3 relative border-b-2 border-primary'>
            <div className="logo text-2xl cursor-pointer hover:bg-slate-200 p-3 rounded-lg text-black">
            <Link to={"/"}><span className='text-primary'>Hikes</span>Travels</Link>
            </div>
        </nav>
          <div className='lg:w-4/5 lg:h-2/3 w-full h-full flex flex-col lg:flex-row lg:items-center lg:mx-auto mt-5'>
                <div className='h-full w-full lg:w-1/2 border-b lg:border-r lg:border-b-0 border-primary'>
                     <div className='w-11/12 mx-auto text-black mt-5'>
                     <div className='w-full flex items-center'>
                        <div>
                        <Link to={`/hotels/${name}/${address}/${state}/${id}`}><img src={image} alt="" className='w-52' /></Link>
                        </div>
                        <div className='ml-3'>
                        <div className=''>{address}</div>
                        <span className='flex items-center mt-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='mr-1' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                        </svg>{rating}
                        </span>
                        </div>
                     </div>
                     <p className='border-b border-gray-600 my-3'></p>
                     <div className='w-full'>
                        <p className='text-center text-lg'>Your Booking is protected by <span className='text-primary'>Hikes</span>Travels </p>
                     </div>
                     <p className='border-b border-gray-600 my-3'></p>
                     <div className='w-full'>
                        <p className='mb-4 text-2xl'>Price Details</p>
                        <div className='w-full flex items-center justify-between mt-5'>
                            <span className='underline'>₹{price} x {noOfNights} nights</span>
                            <span>{dayPrice}</span>
                        </div>
                        <div className='w-full flex items-center justify-between mt-2'>
                            <span className='underline'>Service Fee</span>
                            <span>{serviceFee}</span>
                        </div>
                     </div>
                     <p className='border-b border-gray-600 my-3'></p>
                     <div className='w-full'>
                     <div className='w-full flex items-center justify-between mb-3'>
                            <span className=''>Total Price Before Taxes</span>
                            <span className=''>₹{totalPrice}</span>
                     </div>
                     </div>
                     </div>
                </div>
                <div className='h-full w-full lg:w-1/2 pb-4'>
                <div className='w-11/12 mx-auto text-black mt-3'>
                <p className='text-3xl font-normal mb-3'>Trip Details</p>
                <p className='text-2xl font-normal'>Your Trip</p>
                <p className='border-b border-gray-600 my-3'></p>
                <p className='text-xl'>Dates</p>
                <p>{checkInDate} - {checkOutDate}</p>
                <div className='my-5'>
                <p className='text-xl'>Guests</p>
                <p>{noOfGuests} Guests</p>
                </div>
                <p className='border-b border-gray-600 mt-3'></p>
                <div className='my-5'>
                    <p className='text-2xl font-semibold mb-2'>Pay With</p>
                    <div className='border border-black w-1/3 h-12 flex items-center justify-center'><span className='text-2xl font-semibold text-blue-900'>RazorPay</span></div>
                </div>
                <div onClick={handleConfirmBooking} className='lg:w-4/5 w-full flex items-center justify-center py-3 px-5 text-white bg-primary rounded-lg mt-4 cursor-pointer font-light hover:scale-95 ease-out duration-300'>
                   <p className='text-xl'>Reserve</p>
                 </div>
                </div>
                </div>
          </div>
        </div>
    }
    </>
  )
}

export default ConfirmationPage
