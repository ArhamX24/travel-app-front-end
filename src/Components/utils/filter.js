export const getHotelByPrice = (hotels,allHotels, priceRange) => {
    if(priceRange[1] - priceRange[0] == 199500){
      return hotels
    }
    let filteredHotels = allHotels?.filter((hotel)=>{
        return(
          hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
        )
    })
    return filteredHotels
}

export const getHotelByRooms = (hotels, noOfBeds, noOfBedRooms,noOfBathRooms ) => {
  if(noOfBeds == 0 || noOfBathRooms == 0 || noOfBedRooms == 0){
    return hotels
  }
  let filteredHotels = hotels?.filter(({numberOfBathrooms, numberOfBeds, numberOfBedrooms}) =>
    numberOfBeds == noOfBeds  || numberOfBedrooms == noOfBedRooms ||  numberOfBathrooms == noOfBathRooms
  )
  return filteredHotels
}

export const getHotelsByProperty = (hotels, typeOfProperty) => {
  if(typeOfProperty == ""){
    return hotels
  }
  let filteredHotels = hotels?.filter(({propertyType})=> propertyType == typeOfProperty)
  return filteredHotels
}

export const getHotelByRating = (hotels, typeOfRating) => {
  if(typeOfRating == ""){
    return hotels
  }
  let filteredHotels = hotels?.filter(({rating})=> typeOfRating <= rating)
  return filteredHotels
}
