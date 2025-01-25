import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    items: [],
}

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addWishlistItem(state, action) {
            return{
                ...state,
                items: [...state.items, action.payload],
            }
        },
        removeWishlistItem(state,action){
            console.log(action);
            
            return{
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
            }
        }
    }
});

export const {
    addWishlistItem,
    removeWishlistItem
} = WishlistSlice.actions;

export default WishlistSlice.reducer