import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { setUserModal } from '../Store/UserSlice'
import { useNavigate } from 'react-router-dom'
import { setOpenLoginModal, removeUser, setIsUserLoggedIn, setUsername} from '../Store/UserSlice'
import { setCheckInDate, setCheckOutDate, setGuests, setDestination } from '../Store/DateSlice'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { notify } from '../utils'

const UserFunctionalitiesModal = () => {
      const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseUserModal = () => {
        dispatch(setUserModal(false))
    }

    const handleUserModal = (e) => {
      e.stopPropagation()
    }

    const handleWishlist = () => {
        navigate("/wishlist")
    }

      const handleLogout = async () => {
        try {
          setLoading(true)
          let response = await axios.post("https://travel-app-backend-0ejv.onrender.com/users/logout", {}, {withCredentials: true})
          let data = response?.data;
          setLoading(false)
          if(data?.result == true){
            dispatch(setUserModal(false))
            dispatch(removeUser())
            notify("Logged out successfully")
            dispatch(setIsUserLoggedIn(false))
            dispatch(setUsername(""))
            dispatch(setCheckInDate(""))
            dispatch(setCheckOutDate(""))
            dispatch(setGuests(0))
            dispatch(setDestination(""))
            dispatch(setOpenLoginModal())
          }
        } catch (error) {
          console.log(error.message);
        }
      }

      const handleProfile = () => {
        navigate("/profile")
      }
      
    

  return (
    <div className='h-full w-full fixed top-0 left-0 bg-overlay z-10' onClick={handleCloseUserModal}>
      <div className='absolute top-16 right-1 bg-white text-black w-52 h-36' onClick={(e)=> {handleUserModal(e)}}>
        <div className='flex items-center cursor-pointer hover:bg-gray-200 duration-200 ease-out px-2 py-3' onClick={handleWishlist}>
        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(130,2,2,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
        <span>Wishlist</span>
        </div>
        <div className='flex items-center cursor-pointer hover:bg-gray-200 duration-200 ease-out px-2 py-3' onClick={handleProfile}>
        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM6 15V17H18V15H6ZM6 7V13H12V7H6ZM14 7V9H18V7H14ZM14 11V13H18V11H14ZM8 9H10V11H8V9Z"></path></svg>
        <span>Profile</span>
        </div>
        <div className='flex items-center cursor-pointer hover:bg-gray-200 duration-200 ease-out px-2 py-3' onClick={handleLogout}>
        {
           loading ? <span className="loading loading-spinner loading-sm"></span> :
          <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path></svg>
        }
        <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default UserFunctionalitiesModal
