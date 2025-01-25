import "../Navbar/Navbar.css"
import { Link } from 'react-router-dom'
import {openSearchModal} from "../Store/DateSlice"
import {useDispatch, useSelector} from "react-redux"
import { setOpenLoginModal, setUserModal } from '../Store/UserSlice'



const Navbar = () => {

  
  const dispatch = useDispatch()

  let checkInDate = useSelector((Store)=> Store.date.checkInDate)
  let checkOutDate = useSelector((Store)=> Store.date.checkOutDate)
  let noOfGuests = useSelector((Store)=> Store.date.noOfGuests)
  let destination = useSelector((Store)=> Store.date.destination);

  let userData = useSelector((Store)=> Store.user.userData);
  let userLoggedIn = useSelector((Store) => Store.user.isUserLoggedIn)
  let username = useSelector((Store) => Store.user.username)

  const handleSearchClick = () => {
    dispatch(openSearchModal())
  }
  
  const handleLoginButton = () => {
    dispatch(setOpenLoginModal())
  }

  const handleOpenUserModal = () => {
    dispatch(setUserModal(true))
  }
  

  return (
  <nav className='w-full flex justify-between items-center md:p-4 p-3 relative'>
    <div className="logo text-2xl cursor-pointer hover:bg-slate-200 p-3 rounded-lg">
      <Link to={"/"}><span className='text-primary'>Hikes</span>Travels</Link>
    </div>
    <div className='form-container hidden md:flex items-center cursor-pointer shadow-md h-12' onClick={handleSearchClick}>
      <span className="form-option">{ destination || "Any Where"}</span>
      <span className="form-option border-x-2 border-orange-500">
      {checkInDate && checkOutDate ? `${checkInDate} - ${checkOutDate}` : "Any Week"}
        </span>
      <span className="form-option">{ noOfGuests > 0 ? `${noOfGuests} Guests` : "Add Guests"}</span>
      <span className='bg-orange-500 h-full px-5 flex items-center justify-center rounded-lg cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
      </span>
    </div>
    <div className='flex items-center'>
      {
        !userLoggedIn ? <span className='mr-1 hover:bg-gray-400 cursor-pointer'>{username ? `Hi! ${username}` : ""}</span> : <span className='mr-1'>{username ? `Hi! ${username}` : ""}</span>
      }
      {
      !userLoggedIn ?
      <svg className='cursor-pointer' onClick={handleLoginButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
      </svg>
      :
      <svg className='cursor-pointer' onClick={handleOpenUserModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
    }
    </div>
  </nav>
  )
}

export default Navbar
