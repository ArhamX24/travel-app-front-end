import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import '../Categories/Categories.css'
import { CategoryContext } from '../Contexts/Category-Context'
import CategoriesSkeleton from '../Shimmers/CategoriesSkeleton'


const Categories = () => {
    const [categories, setCategories] = useState(null)
    const [noOfCategoriesToShow, setNoOfCategoriesToShow] = useState(0)
    const {hotelCategory, setHotelCategory} = useContext(CategoryContext)

   const handleLeftShowMore = () => {
        if(noOfCategoriesToShow !== 0){
            setNoOfCategoriesToShow((prev) => prev - 10)
        }
    }

    const handleRightShowMore = () => {
        if(noOfCategoriesToShow <= categories?.length){
            setNoOfCategoriesToShow((prev) => prev + 10)
        }
    }
    

    const handleCategory = (category) => {
        setHotelCategory(category)
    }
    

    const getData = async () => {
        let res = await axios.get("https://travel-app-backend-0ejv.onrender.com/hotels/categories")
        let categoriesToShow = res.data.slice(noOfCategoriesToShow, noOfCategoriesToShow + 10)
        setCategories(categoriesToShow)
    }

    useEffect(() => {
        getData()
    }, [noOfCategoriesToShow])
    
  return (
    <div className='flex items-center justify-around lg:justify-evenly gap-4 lg:gap-8 categories w-full py-4'>
        {
            noOfCategoriesToShow >= 10 ?
            <div className='w-1/12 bg-primary flex items-center justify-center rounded-full ml-2 cursor-pointer duration-500 ease-in-out' onClick={handleLeftShowMore}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </div>
            :
            <div className='w-1/12'></div>
        }
        <div className='w-3/5 md:w-4/5 lg:w-2/3 flex justify-around items-center'>
            {
                categories == null ? <CategoriesSkeleton></CategoriesSkeleton> :
                categories?.map((category) => <span key={category._id} className={category.category == hotelCategory ? 'text-black mr-3 text-sm md:text-md cursor-pointer link clicked' : "text-black mr-3 text-sm md:text-md cursor-pointer link"}
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

export default Categories
