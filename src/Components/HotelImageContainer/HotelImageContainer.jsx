import React, {useState} from 'react'

const HotelImageContainer = ({singleHotel}) => {

    const [ImgIdx, setImgIdx] = useState(null)

    let {image, imageArr} = singleHotel

    let images = imageArr?.filter((img)=>{
      return img !== ''
    })

  return (
    <div className='md:flex md:justify-between lg:w-11/12 lg:mx-auto w-full mt-4 gap-x-8 h-30vh md:h-60vh'>
      <div className='md:w-1/2 w-full lg:h-full h-80'>
        <img src={ImgIdx == null ? image : imageArr[ImgIdx]} alt="Hotel-img" className='w-full h-full bg-center bg-contain md:pt-10 lg:pt-0'/>
      </div>
      <div className='flex md:flex-wrap mt-4 md:mt-0 justify-between lg:gap-4 md:w-1/2 w-full'>
        {
          images && images?.map((img, idx) => {
            return(
              <img key={img} src={img} alt='' className='lg:w-80 lg:h-52 md:w-52 md:h-44 w-20 md:mx-0 bg-center bg-cover cursor-pointer hover:shadow-lg duration-200 ease-out' onClick={()=> {setImgIdx(idx)}}></img>
            )
          })
        }
      </div>
    </div>
  )
}

export default HotelImageContainer
