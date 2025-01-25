import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import HotelImageContainer from '../HotelImageContainer/HotelImageContainer';
import {useSelector, useDispatch} from "react-redux"
import DateSelector from '../DateSelector/DateSelector';
import AddGuestsModal from '../AddGuestsModal/AddGuestsModal';
import { useNavigate } from 'react-router-dom';
import { setOpenLoginModal } from '../Store/UserSlice';
import UserFunctionalitiesModal from '../UserFunctionalitiesModal/UserFunctionalitiesModal';
import AuthLogin from '../Auth/AuthLogin';
import AuthSignup from '../Auth/AuthSignup';

const SingleHotelPage = () => {
    let {id} = useParams();

    let navigate = useNavigate()

    const [singleHotel, setSingleHotel] = useState([])
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let checkInDate = useSelector((Store)=> Store.date.checkInDate)
    let checkOutDate = useSelector((Store)=> Store.date.checkOutDate)
    let noOfGuests = useSelector((Store)=> Store.date.noOfGuests)
    let nooFInfants = useSelector((Store)=> Store.date.noOfInfants)

    let userLoggedIn = useSelector((Store) => Store.user.isUserLoggedIn)
    let isLoginModalOpen = useSelector((Store)=> Store.user.isLoginModalOpen);
    let userModalOpen = useSelector((Store) => Store.user.isUserModalOpen);
    let selectedTab = useSelector((Store)=> Store.user.selectedTab);

    let dispatch = useDispatch()

    const getData = async () => {
      setIsLoading(true)
        let res = await axios.get(`https://travel-app-backend-0ejv.onrender.com/hotels/${id}`)
        setSingleHotel(res.data)
        setIsLoading(false)
    }

    const handleGuestModalButton =() => {
      setIsGuestModalOpen(false)
    }
    
    const handleGuestModalOpenButton = (e) => {
      e.stopPropagation()
      setIsGuestModalOpen(!isGuestModalOpen)
    }
    
    let {city, country, address, ameneties, healthAndSafety, numberOfBathrooms, numberOfBedrooms, numberOfBeds, numberOfguest, price, rating, houseRules, hostName} = singleHotel

    const dayPrice = price * 5;
    const serviceFee = 2000;

    const totalPrice = dayPrice + serviceFee;

    useEffect(() => {
        getData()
    }, [id])

    const handleReserve = () => {
      if(userLoggedIn){
        if(checkInDate == null && checkOutDate == null){
          alert("Please Enter Check-in & Check-Out Dates & No Of Guests")
        }else{
          navigate(`/confirm/${address}/${id}`)
        }
      }else{
        navigate("/")
        dispatch(setOpenLoginModal())
      }
    }
    
  return (
    <>
    {
      isLoading ? <div className='w-full h-screen flex items-center justify-center'><span className="loading loading-bars loading-lg"></span></div>
       :
       
       <div className='w-full h-full bg-slate-100 p-4' onClick={handleGuestModalButton}>
        {
          userModalOpen && <UserFunctionalitiesModal></UserFunctionalitiesModal>
        }
        {
          isLoginModalOpen && selectedTab == "login" ? <AuthLogin/> : isLoginModalOpen && <AuthSignup/>
        }
         <div className='lg:w-11/12 lg:mx-auto w-full text-xl' >
           <span className='border-b-2 border-primary'>{city}, {country}</span>
         </div>
         <div className='w-full'>
         <HotelImageContainer singleHotel={singleHotel}></HotelImageContainer>
         </div>
         <div className='lg:w-11/12 h-50vh lg:h-fit lg:mx-auto w-full flex items-center gap-x-4'>
               <div className='lg:w-1/2 w-full h-full pt-8'>
                   <div className='w-full lg:text-xl md:text-lg text-sm' >
                     <span>{address}</span>
                   </div>
                   <div className='w-full text-md my-1' >
                     <span>{numberOfBedrooms} Bedrooms | {numberOfBeds} Beds | {numberOfguest} Guests | {numberOfBathrooms} Bathrooms</span>
                   </div>
                   <div className='flex gap-x-4'>
                   <span>Hosted By <span className='text-primary'>{hostName}</span></span>
                     <span className='flex items-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" className='mr-1' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                     </svg>
                     {rating}
                     </span>
                   </div>
               <div className='w-full h-full pt-7'>
                   <div className='border-t-2 border-gray-500'>
                       <div className='flex items-center mt-4'>
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#000000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                             <span className='ml-2 text-sm md:text-base'>Dedicated Workplace</span>
                             </div>
                             <div className='flex items-center mt-4'>
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#000000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                             <span className='ml-2 text-sm md:text-base'>Great Location</span>
                             </div>
                             <div className='flex items-center mt-4'>
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#000000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                             <span className='ml-2 text-sm md:text-base'>Free Cancellation before 7 days of booking</span>
                       </div>
                   </div>
                   <div className='border-t-2 border-gray-500 mt-4 flex'>
                     <div className='w-1/2 border-r-2 border-gray-500 mr-4'>
                     <p className='my-2'>House Rules</p>
                     {
                       houseRules?.map((item, idx)=>{
                         return(
                           <div key={idx} className='flex items-center mb-2'>
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#000000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                             <span className='ml-2 text-sm md:text-base'>{item}</span>
                           </div>
                         )
                       })
                     }
                     </div>
                     <div className=''>
                     <p className='my-2'>What this place offers</p>
                     <div>
                       {
                         ameneties?.map((item, idx)=> {
                           return(
                             <div key={idx}>
                               <div className='flex items-center mb-2'>
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#000000"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                               <span className='ml-2 text-sm md:text-base'>{item}</span>
                               </div>
                             </div>
                           )
                         })
                       }
                     </div>
                     </div>
                   </div>
               </div>
               </div>
               <div className='w-1/2 h-full hidden lg:block'>
           <div className='pt-10 hidden md:flex justify-end relative'>
           <AddGuestsModal isModalOpen={isGuestModalOpen} setIsModalOpen={setIsGuestModalOpen} numberOfGuests={numberOfguest}></AddGuestsModal>
             <div className='w-3/5 h-full bg-white text-black rounded-lg'>
             <div className='w-4/5 mx-auto'>
             <div className='flex items-center mt-8'>₹ <span className='text-xl ml-1'>{price}</span>/night</div>
             <div className='w-full flex items-center justify-between border-2 border-gray-400 mt-4 rounded-r-lg rounded-l-lg rounded-t-lg'>
               <div className='border-r-2 border-gray-400 w-1/2 pl-2 pr-4 py-4 cursor-pointer'>
                 <label className='cursor-pointer text-gray-600'>Check-In</label>
                 <div className='w-1/2 text-xs mt-2'>
                 <DateSelector type={"in"} width={20}></DateSelector>
                 </div>
               </div>
               <div className='w-1/2 pl-2 pr-4 py-4 cursor-pointer'>
                 <label className='cursor-pointer text-gray-600'>Check-Out</label>
                 <div className='w-1/2 text-xs mt-2'>
                 <DateSelector type={"out"} width={20}></DateSelector>
                 </div>
               </div>
             </div>
             <div className='w-full flex items-center justify-between border-x-2 border-b-2 border-gray-400 pl-2 pr-4 py-4 rounded-r-lg rounded-l-lg rounded-b-lg cursor-pointer' onClick={(e)=> {handleGuestModalOpenButton(e)}}>
             <div className='flex justify-between'>
                 <span className=''>
                 {noOfGuests > 0 ? `${noOfGuests} Guests`  : "Add Guests"}
                 </span>
                 <span>
                 {nooFInfants > 0 ? `, ${nooFInfants} Infants` : ""}
                 </span>
             </div>
             <div className='cursor-pointer hover:scale-125 duration-500 ease-in-out'>
             {
                 isGuestModalOpen ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8.36853L20.9679 13.1162L20.0321 14.8838L12 10.6315L3.96789 14.8838L3.03211 13.1162L12 8.36853Z"></path></svg>
                 :
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
               </svg>
               }
             </div>
             </div>
             <div onClick={handleReserve} className='w-full flex items-center justify-center py-3 px-5 text-white bg-primary rounded-lg mt-4 cursor-pointer font-light hover:scale-95 ease-out duration-300'>
               <p>Reserve</p>
             </div>
             <p className='text-center mt-2 text-sm'>You won't be charged yet</p>
             <div className='w-full flex items-center justify-between mt-5'>
               <span className='underline'>₹{price} x 5 nights</span>
               <span>{dayPrice}</span>
             </div>
             <div className='w-full flex items-center justify-between mt-2'>
               <span className='underline'>HikesTravel Service Fee</span>
               <span>{serviceFee}</span>
             </div>
             <div className='w-full flex items-center justify-between border-t-2 border-gray-400 my-5'>
               <span className='mt-2'>Total Price Before Taxes</span>
               <span className='mt-2'>₹{totalPrice}</span>
             </div>
             </div>
             </div>
           </div>
               </div>
           <div className='w-full lg:hidden fixed bottom-0 left-0 bg-white flex justify-around items-center py-2'>
             <div className='w-1/2 flex flex-col ml-2'>
             <div className='underline mb-1'>
               {price}/nights
             </div>
             <div>
               {checkInDate} - {checkOutDate}
             </div>
             </div>
             <div onClick={handleReserve} className='w-1/2 flex items-center justify-center'>
               <span className='py-3 px-4 w-4/5 text-center text-white bg-primary rounded-lg mt-4 cursor-pointer font-light hover:scale-95 ease-out duration-300'>Reserve</span>
             </div>
           </div>
             </div>
       </div>
    }
                          </>
  )
}


export default SingleHotelPage
