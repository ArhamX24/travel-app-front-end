import {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, setOpenLoginModal, setUsername, removeUser } from '../Store/UserSlice'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { date } from 'yup'

const ProfilePage = () => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoadingEdit, setIsLoadingEdit] = useState(false)

    let userEmail = useSelector((Store) => Store.user.email)
    let isUserLoggedIn = useSelector((Store) => Store.user.isUserLoggedIn)

    let usernameRef = useRef("")
    let phNumberRef = useRef("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            setLoading(true)
            let response = await axios.get("https://travel-app-backend-0ejv.onrender.com/users/getuser", {withCredentials: true})
            let data = response?.data;
            setLoading(false)

            if(data?.result == true){
              setUser(data?.data)
            }

          } catch (error) {
            console.log(error);
          }finally{
            setLoading(false)
          }
      }

      const notify  = () => {
        toast.success('User Updated Successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

      }

      let handleEdit = async () => {
        let updatedName = usernameRef.current.value;
        let updatedPhoneNumber = phNumberRef.current.value;

        if(updatedName == ""){
          updatedName = user?.username
        }

        if(updatedPhoneNumber == ""){
          updatedPhoneNumber = user?.phNumber
        }

        setIsLoadingEdit(true)
        try {
          let res = await axios.patch("https://travel-app-backend-0ejv.onrender.com/users/update", {username: updatedName ,phNumber: updatedPhoneNumber}, {withCredentials: true});
          let resData = res?.data;

          setIsLoadingEdit(false)

          if(resData?.result == true){
            notify()
            setUser(resData.data)
            dispatch(addUser(resData.data))
            dispatch(setUsername(updatedName))
          }

        } catch (error) {
          console.log(error.message);

        }
      }

      const handleDelete = async () => {
        setIsLoadingDelete(true)
    try {
      let res = await axios.delete("https://travel-app-backend-0ejv.onrender.com/users/delete", {withCredentials: true}, {data: user?._id})
      let resData = res?.data;

      setIsLoadingDelete(false)

      if(resData?.result == true){
        dispatch(removeUser())
        dispatch(setUsername(''))
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
      
    }
      }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <>
    {
      isUserLoggedIn ?

      loading ? <div className='w-full h-screen flex items-center justify-center'><span className="loading loading-bars loading-lg"></span></div>
      :
    <div className='w-full h-screen'>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className='text-3xl text-primary text-center mt-4 mb-1'>Your Profile</h2>
      <p className='border-b-2 border-primary w-1/2 mx-auto mb-3'></p>
      {
        user?.email == "dummy@gmail.com" ? <p className='text-center'>These are dummy credentials so delete account is disabled.</p> : ""
      }
      
      <div className="bg-gray-100 flex flex-col items-center py-8">
        <div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black"
        >
          <h2 className="text-2xl font-semibold text-center mb-2 capitalize">{user?.username}</h2>
          <div className="text-center">
            <label htmlFor="my_modal_6" className="btn btn-outline w-1/3 hover:bg-primary  border-primary text-gray-700 hover:text-white duration-200 ease-in-out">
              {
                isLoadingEdit ? <span className="loading loading-spinner loading-md mx-auto"></span>  : "Edit Profile"
              }
            </label>
            <button className={ user?.email == "dummy@gmail.com" ?  `btn btn-outline btn-error text-screenColor ml-3 hover:bg-hoverColor hover:text-white cursor-not-allowed opacity-20 pointer-events-none w-1/2` : 'btn btn-outline btn-error text-screenColor ml-3 hover:bg-hoverColor hover:text-white w-1/2'} onClick={handleDelete}>
              {
                isLoadingDelete ? <span className="loading loading-spinner loading-md pt-3"></span>  : "Delete Account"
              }
            </button>
            <input type="checkbox" id="my_modal_6" className="modal-toggle bg-gray-100"  />
            <div className="modal bg-gray-100" role="dialog">
              <div className="modal-box text-black bg-gray-100">
              <div className="join flex-col">
                  <input className="input input-bordered join-item bg-white mb-3" placeholder="username" ref={usernameRef} />
                  <input className="input input-bordered join-item bg-white mb-3" placeholder="Phone Number" ref={phNumberRef}/>
              </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn btn-outline border-primary text-gray-700 hover:bg-primary hover:text-white duration-200 ease-in-out" onClick={handleEdit}>
                    Confirm Changes
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2 capitalize">Username</h3>
            <p>
              {user?.username}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Email Address</h3>
            <p>
              {user?.email}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Phone No</h3>
            <p>
              {user?.phNumber}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-7 bg-transparent text-black border-primary border-2 w-1/3 mx-auto rounded-xl px-5 py-2 flex items-center justify-center cursor-pointer hover:scale-105 duration-300 ease-in-out mb-3'>
      <p onClick={() => {navigate("/order-history")}}>View Your Order History</p>
      </div>
    </div>
    :
    navigate("/")
    }
    </>
  )
}

export default ProfilePage
