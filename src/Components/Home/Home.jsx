import React,{useState, useEffect, useContext} from 'react'
import "../Home/Home.css"
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'

import HotelCard from '../HotelCard/HotelCard'
import ProductPage from "../Shimmers/ProductPage"
import Categories from '../Categories/Categories'
import { CategoryContext } from '../Contexts/Category-Context'
import SearchStayWithDate from '../SearchStayWithDate/SearchStayWithDate'
import FilterModal from '../FilterModal/FilterModal'
import { setOpenFilterModal} from '../Store/FilterSlice'
import { getHotelByPrice, getHotelByRooms, getHotelsByProperty, getHotelByRating } from '../utils'
import AuthLogin from '../Auth/AuthLogin'
import AuthSignup from '../Auth/AuthSignup'
import { openSearchModal } from '../Store/DateSlice'
import MobileCategories from '../Categories/MobileCategores'
import UserFunctionalitiesModal from '../UserFunctionalitiesModal/UserFunctionalitiesModal'

const Home = () => {
  const [hasMore, setHasMore] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(12)
  const [testData, setTestData] = useState([])
  const [hotels, setHotels] = useState(null)
  const {hotelCategory} = useContext(CategoryContext)
  const [isVisible, setIsVisible] = useState(false);
  const [allHotels, setAllHotels] = useState([])

  let dispatch = useDispatch()
  
  const handleScroll = () => { if (window.pageYOffset > 300) { setIsVisible(true); } else { setIsVisible(false); } };
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth', }); };

  let isSearchModalOpen = useSelector((Store) => Store.date.isSearchModalOpen);
  
  let isFilterModalOpen = useSelector((Store)=> Store.filter.isFilterModalOpen);
  let priceRange = useSelector((Store)=> Store.filter.priceRange);
  let noOfBeds = useSelector((Store)=> Store.filter.noOfBeds);
  let noOfBedRooms = useSelector((Store)=> Store.filter.noOfBedRooms);
  let noOfBathRooms = useSelector((Store)=> Store.filter.noOfBathrooms);
  let typeOfProperty = useSelector((Store)=> Store.filter.typeOfProperty);
  let typeOfRating = useSelector((Store)=> Store.filter.typeOfRating);

  let isLoginModalOpen = useSelector((Store)=> Store.user.isLoginModalOpen);
  let selectedTab = useSelector((Store)=> Store.user.selectedTab);;
  let userModalOpen = useSelector((Store) => Store.user.isUserModalOpen);

  const getAllHotels = async () => {
    let res = await axios.get("https://travel-app-backend-0ejv.onrender.com/hotels");
    setAllHotels(res.data)
  }

  const getHotels = async () => {
    let res =  await axios.get(`https://travel-app-backend-0ejv.onrender.com/hotels?category=${hotelCategory}`)
    setTestData(res.data)
    setHotels(res.data ? res.data.slice(0,12) : null)
  }
  
  useEffect(()=>{
    getHotels()
  }, [hotelCategory])
  
  useEffect(() => {
    getAllHotels()
    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const fetchMoreData = () => {
    if(hotels?.length >= testData?.length){
      setHasMore(false)
      return
    }
    setTimeout(() => {
      if(hotels && hotels?.length > 0){
        setHotels(hotels.concat(testData.slice(currentIdx, currentIdx + 12)))
        setCurrentIdx(currentIdx + 12)
      }else{
        setHotels(null)
      }
    }, 1000);
  }

  let filteredHotels = getHotelByPrice(hotels, allHotels , priceRange)
  let filteredHotelsByRooms = getHotelByRooms(filteredHotels, noOfBeds, noOfBedRooms, noOfBathRooms);
  let filteredByPropertyType = getHotelsByProperty(filteredHotelsByRooms, typeOfProperty);
  let filteredByRating = getHotelByRating(filteredByPropertyType, typeOfRating)


  const handleFilter = () => {
    dispatch(setOpenFilterModal())
  }

    const handleSearchClick = () => {
      dispatch(openSearchModal())
    }

  return (
    <>
    <div className='w-full h-full relative'>
    {
      isSearchModalOpen && <SearchStayWithDate></SearchStayWithDate>
    }
    {
      isFilterModalOpen && <FilterModal></FilterModal>
    }
    {
      userModalOpen && <UserFunctionalitiesModal></UserFunctionalitiesModal>
    }
    {
      isLoginModalOpen && selectedTab == "login" ? <AuthLogin/> : isLoginModalOpen && <AuthSignup/>
    }
        <div className='form-container md:hidden flex w-4/5 mx-auto my-3 p-2 items-center justify-between cursor-pointer shadow-md' onClick={handleSearchClick}>
            <span className="form-option">Any Where</span>
            <span className="form-option border-x-2 border-orange-500">Any Week</span>
            <span className="form-option">Add Guests</span>
            <span className='bg-orange-500 h-full px-5 flex items-center justify-center rounded-lg cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
            </span>
        </div>
        <div className='w-full flex items-center justify-between border-y-2 border-orange-500'>
          <div className='w-11/12 hidden lg:block'>
              <Categories></Categories>
          </div>
          <div className="w-3/4 lg:hidden">
          <MobileCategories></MobileCategories>
          </div>
          <div className='flex items-center justify-center'>
            <div className='cursor-pointer border border-gray-500 rounded-2xl px-4 py-1 mr-5 w-full'>
            <div className='w-full flex items-center' onClick={handleFilter}>
              <span className='w-1/2 mr-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(247,145,54,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.4037 6L11 12.8944V20H13V12.8944L17.5963 6H6.4037Z"></path></svg>
              </span>
              <span className='w-1/2'>
                Filter
              </span>
            </div>
            </div>
          </div>
        </div>
        {
          hotels && hotels?.length >  0 ? (
            <InfiniteScroll
            dataLength={hotels?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={hotels?.length > 0 && <p className="text-center mt-5"><span className='loading loading-dots loading-lg'></span></p>}
            endMessage={isVisible && ( <button onClick={scrollToTop} className="scroll-to-top-button"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8.36853L20.9679 13.1162L20.0321 14.8838L12 10.6315L3.9679 14.8838L3.03212 13.1162L12 8.36853Z"></path></svg></button> )}
            >
             <div className='flex items-start flex-wrap justify-around mt-10 min-h-screen'>
              {
                filteredByRating == null ? <ProductPage></ProductPage> :
                filteredByRating?.map((hotel, idx)=>{
                  return(
                    <HotelCard key={hotel?._id} hotel={hotel}></HotelCard>
                  )
                })
              }
              </div>
            </InfiniteScroll>
          ) : (<div className='flex items-center flex-wrap justify-around'><ProductPage></ProductPage></div>)
        }
    </div>
    </>
  )
}

export default Home

