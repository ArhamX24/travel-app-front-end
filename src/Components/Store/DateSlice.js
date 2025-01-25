import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    destination: "",
    noOfGuests: 0,
    noOfInfants: 0,
    checkInDate: null,
    checkOutDate: null,
    isSearchModalOpen: false,
    isSearchDestinationOpen : true,
    isGuestModalOpen: false,
    isDestinationModalOpen: false
}

const DateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        openSearchModal : (state, action) => {
          return {
            ...state,
            isSearchModalOpen: !state.isSearchModalOpen
          }
        },
        closeSearchModal : (state,action) => {
          return{
            ...state,
            isSearchModalOpen: !state.isSearchModalOpen
          }
        },
        setCheckInDate: (state, action) => {
            let date = action.payload
            let convertedDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short"
            })
            return{
                ...state,
                checkInDate: convertedDate
            }
        },
        setCheckOutDate: (state, action) => {
            let date = action.payload;
            let convertedDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short"
            })
            return{
                ...state,
                checkOutDate: convertedDate
            }
        },
        setDestination: (state, action) => {
            return{
                ...state,
                destination: action.payload
            }
        },
        setGuests: (state,action)=> {
          return{
            ...state,
            noOfGuests: action.payload
          }
        },
        setInfants: (state,action) => {
          return{
            ...state,
            noOfInfants: action.payload
          }
        },
        setSearchDestinationOff: (state,action)=>{
            return{
                ...state,
                isSearchDestinationOpen: false
            }
        },
        setSearchDestinationOn: (state,action)=>{
            return{
                ...state,
                isSearchDestinationOpen: true
            }
        },
        setGuestModalOpen: (state) => {
          return{
            ...state,
            isGuestModalOpen: !state.isGuestModalOpen
          }
        },
        setGuestModalClose: (state) => {
          return{
            ...state,
            isGuestModalOpen: false
          }
        },
        setDestinationModal: (state,action) => {
          return{
            ...state,
            isDestinationModalOpen: action.payload
          }
        }
        
    }
})

export const {
    openSearchModal,
    setCheckInDate,
    setCheckOutDate,
    setDestination,
    setGuests,
    setSearchDestinationOff,
    setSearchDestinationOn,
    closeSearchModal,
    setInfants,
    setGuestModalClose,
    setGuestModalOpen,
    setDestinationModal} = DateSlice.actions;

export default DateSlice.reducer