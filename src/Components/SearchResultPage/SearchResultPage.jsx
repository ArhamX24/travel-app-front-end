import axios from 'axios'
import React,{useState, useEffect} from 'react'

import { useSelector } from 'react-redux'
import HotelCard from '../HotelCard/HotelCard'

const SearchResultPage = () => {
    const [searchResults, setSearchResults] = useState([])

    let destination = useSelector((Store)=> Store.date.destination);
    

    const getData = async () => {
      let res = await axios.get(`https://travel-app-backend-0ejv.onrender.com/hotels/search/${destination}`)
      setSearchResults(res.data)
    }

    useEffect(() => {
        getData()
    }, [destination])
    
  return (
    <div className='flex items-start flex-wrap justify-around mt-10 min-h-screen'>
      {
        searchResults ? searchResults?.map(hotel => <HotelCard key={hotel._id} hotel={hotel}></HotelCard>) :
        <p className='w-full h-screen flex justify-center pt-10'>No Results Found</p>
      }
    </div>
  )
}

export default SearchResultPage
