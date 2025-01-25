import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedTab, setCloseLoginModal, setOpenLoginModal, setIsUserLoggedIn, addUser, setEmail, setUsername } from '../Store/UserSlice'
import { useFormik } from "formik"
import * as Yup from 'yup';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { notify } from '../utils';

const AuthLogin = () => {

  const [ShowPass, setShowPass] = useState(false)
  const [isLoafing, setIsLoafing] = useState(false)
  const [Error, setError] = useState('')

  let navigate = useNavigate()

  const dispatch = useDispatch();

  let handleEyeClick = () => {
    setShowPass(!ShowPass)
  }

  const handleSignup = () => {
    dispatch(setSelectedTab("signup"))
  }

  const handleCloseModal = () => {
    dispatch((setCloseLoginModal()))
  }

  const handleForm = (e) => {
    e.stopPropagation()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object( {
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password should also contain letters.'),
    }),
    onSubmit :  (values, action) => {
      setIsLoafing(true)
      setError('')
      let {email, password} = values;
      axios.post("https://travel-app-backend-0ejv.onrender.com/users/login", {email, password}, {withCredentials: true}).then(response => {
        setIsLoafing(false)
        action.resetForm()
        notify("Log In Success")
        dispatch(addUser(response.data.data))
        dispatch(setEmail(email))
        dispatch(setUsername(response?.data?.data?.username))
        dispatch(setCloseLoginModal())
        dispatch(setIsUserLoggedIn(true))
      }).catch(error => {
        setIsLoafing(false)
        setError(error.response.data.message)
      })
    }
   })

   const dummyEmail = 'dummy@gmail.com'
   const dummyPassWord = 'dummy1234'

   const handleDummyLogin = () => {
     formik.values.email = dummyEmail
     formik.values.password = dummyPassWord
   }

   return (
    <div className='h-screen w-full fixed top-0 left-0 bg-overlay z-10'>
      <div className='lg:w-2/6 lg:h-2/3 w-full absolute right-0 top-16 bg-white z-50' onClick={(e)=> {handleForm(e)}}>
      <p className='text-primary text-3xl text-center py-6'>Login</p>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col ml-3'>
            <label>Email<span className='text-primary'>*</span></label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type='email' placeholder='Enter Email' className='w-1/2 bg-transparent border mt-1 py-2 pl-1 rounded-lg' />
            {
              formik.touched.email && formik.errors.email ? <p className='text-red-700 text-sm'>{formik.errors.email}</p> : ""
            }
        </div>
        <div className='flex flex-col my-4 ml-3'>
            <label>Password<span className='text-primary'>*</span></label>
            <div className='flex items-center'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' name='password' type={!ShowPass ? "password" : "text"} placeholder='Enter Password' className='w-1/2 bg-transparent border mt-1 py-2 pl-1 rounded-lg' />
            <div className="ml-2 cursor-pointer" onClick={handleEyeClick}>{!ShowPass ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg> :  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"></path></svg>}</div>
            </div>
            {
              formik.touched.password && formik.errors.password ? <p className='text-red-700 text-sm'>{formik.errors.password}</p> : ""
            }
        </div>
      <button type={'submit'} className='text-center mt-7 bg-primary text-white w-1/6 mx-auto rounded-xl px-8 py-2 flex items-center justify-center cursor-pointer hover:scale-105 duration-300 ease-in-out'>{isLoafing ? <span className="loading loading-spinner text-white loading-sm"></span> : "Login"}</button>
      {
        Error ? <p className='text-sm text-center text-red-700'>{Error}</p> : ""
      }
      <button type={'submit'} onClick={handleDummyLogin} className='mt-7 bg-primary text-white w-4/5 mx-auto rounded-xl px-5 py-2 flex items-center justify-center cursor-pointer hover:scale-105 duration-300 ease-in-out mb-3'>Login With Test Credentials</button>
      </form>
      <p className='border-2 border-primary'></p>
      <p className='text-center my-3'>New User? <span className='hover:underline text-primary cursor-pointer' onClick={handleSignup}>Signup</span></p>
      <p className='text-right pr-4 pt-21' ><span className='hover:underline cursor-pointer' onClick={handleCloseModal}>Close</span></p>
      </div>
    </div>
  )
}

export default AuthLogin
