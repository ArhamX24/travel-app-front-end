import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import '../Categories/Categories.css'
import { CategoryContext } from '../Contexts/Category-Context'
import CategoriesSkeleton from '../Shimmers/CategoriesSkeleton'
import PhoneCategoriesShimmer from '../Shimmers/PhoneCategoriesShimmer'


const MobileCategories = () => {
   
    const [categories, setCategories] = useState(null)
    const [noOfCategoriesToShow, setNoOfCategoriesToShow] = useState(0)
    const {hotelCategory, setHotelCategory} = useContext(CategoryContext)

   const handleLeftShowMore = () => {
        if(noOfCategoriesToShow !== 0){
            setNoOfCategoriesToShow((prev) => prev - 3)
        }
    }

    const handleRightShowMore = () => {
        if(noOfCategoriesToShow <= categories?.length){
            setNoOfCategoriesToShow((prev) => prev + 3)
        }
    }
    

    const handleCategory = (category) => {
        setHotelCategory(category)
    }
    

    const getData = async () => {
        let res = await axios.get("https://travel-app-backend-0ejv.onrender.com/hotels/categories")
        let categoriesToShow = res.data.slice(noOfCategoriesToShow, noOfCategoriesToShow + 3)
        setCategories(categoriesToShow)
    }

    useEffect(() => {
        getData()
    }, [noOfCategoriesToShow])

  return (
    <div className='flex items-center justify-around gap-4 categories w-full py-4'>
        {
            noOfCategoriesToShow >= 3 ?
            <div className='w-1/12 bg-primary flex items-center justify-center rounded-full ml-2 cursor-pointer duration-500 ease-in-out' onClick={handleLeftShowMore}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </div>
            :
            <div className='w-1/12'></div>
        }
        <div className='w-3/5 flex justify-around items-center'>
            {
                categories == null ? <PhoneCategoriesShimmer></PhoneCategoriesShimmer> :
                categories?.map((category) => <span key={category._id} className={category.category == hotelCategory ? 'text-black mr-3 text-sm cursor-pointer link clicked w-full' : "text-black mr-3 text-sm md:text-md cursor-pointer link w-full"}
                onClick={()=> handleCategory(category.category)}>{category.category}</span>)
            }
        </div>
        {
            <div className='w-1/12 bg-primary flex items-center justify-center rounded-full cursor-pointer' onClick={handleRightShowMore}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
        }
    </div>
  )
}

export default MobileCategories
