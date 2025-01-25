import {configureStore} from "@reduxjs/toolkit"
import dateReducer from "../Store/DateSlice.js"
import filterReducer from "../Store/FilterSlice.js"
import userReducer from "../Store/UserSlice.js"
import wishlistReducer from "../Store/WishlistSlice.js"


const Store = configureStore({
    reducer: {
        date: dateReducer,
        filter: filterReducer,
        user: userReducer,
        wishlist: wishlistReducer
    }
})

export default Store