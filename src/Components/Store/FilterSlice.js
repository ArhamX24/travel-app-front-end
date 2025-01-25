import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFilterModalOpen: false,
    priceRange: [500, 200000],
    minDifference: 1000,
    noOfBedRooms: 0,
    noOfBeds: 0,
    noOfBathrooms: 0,
    typeOfProperty: "",
    allHotels: [],
    typeOfRating: ""
}

const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setOpenFilterModal: (state,action) => {
            return{
              ...state,
              isFilterModalOpen : !state.isFilterModalOpen
            }
        },
        setCloseFilterModal: (state,action) => {
            return{
              ...state,
              isFilterModalOpen : false
            }
        },
        setMinPrice: (state,action) => {
          return{
            ...state,
            priceRange: [Math.min(action.payload?.[0], state.priceRange[1] - state.minDifference), action.payload?.[1]]
          }
        },
        setMaxPrice: (state, action) => {
          return{
            ...state,
            priceRange: [state.priceRange[0], Math.max(action.payload?.[1], state.priceRange[0] + state.minDifference)]
          }
        },
        setBedRoomsInStore: (state,action) => {
          console.log(action.payload, "bedrooms");
          
            return{
                ...state,
                noOfBedRooms: action.payload
            }
        },
        setBedsInStore: (state,action) => {
          return{
            ...state,
            noOfBeds: action.payload
          }
        },
        setBathroomsInStore: (state,action) => {
          return{
            ...state,
            noOfBathrooms: action.payload
          }
        },
        setAllHotelsStore: (state,action) => {
          return{
            ...state,
            allHotels: action.payload
          }
        },
        setTypeOfProperty: (state,action) => {
          return{
            ...state,
            typeOfProperty: action.payload
          }
        },
        setTypeOfRating: (state,action) => {
          return{
            ...state,
            typeOfRating: action.payload
          }
        },
        setClearAll: (state) => {
          return{
            ...state,
            priceRange: [500, 200000],
            minDifference: 1000,
            noOfBedRooms: 0,
            noOfBeds: 0,
            noOfBathrooms: 0,
            typeOfProperty: "",
            allHotels: [],
            typeOfRating: ""
          }
        }
    }
});

export const {
    setOpenFilterModal,
    setCloseFilterModal,
    setMinPrice,
    setMaxPrice,
    setBedRoomsInStore,
    setBedsInStore,
    setBathroomsInStore,
    setAllHotelsStore,
    setTypeOfProperty,
    setTypeOfRating,
    setClearAll
} = FilterSlice.actions;

export default FilterSlice.reducer