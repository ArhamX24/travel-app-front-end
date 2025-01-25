import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import Store from './Components/Store/Store.js'


import CategoryProvider from './Components/Contexts/Category-Context.jsx'
import Home from './Components/Home/Home.jsx'
import SingleHotelPage from './Components/SingleHotelPage/SingleHotelPage.jsx'
import SearchResultPage from './Components/SearchResultPage/SearchResultPage.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import PaymentPage from './Components/PaymentPage/PaymentPage.jsx'
import ProfilePage from './Components/ProfilePage/ProfilePage.jsx'
import ConfirmationPage from './Components/ConfirmationPage/ConfirmationPage.jsx'
import OrderHistoryPage from './Components/OrderHistoryPage/OrderHistoryPage.jsx'
import { ToastContainer } from 'react-toastify'

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App /> ,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/hotels/:name/:address/:state/:id",
                element: <SingleHotelPage></SingleHotelPage>
            },
            {
                path: "/searchresult",
                element: <SearchResultPage></SearchResultPage>
            },
            {
                path: "/wishlist",
                element: <Wishlist/>
            },
            {
                path: "/profile",
                element: <ProfilePage></ProfilePage>
            },
            {
                path: "/order-history",
                element: <OrderHistoryPage></OrderHistoryPage>
            }
        ]
    },
    {
        path: "/confirm/:address/:id",
        element: <ConfirmationPage></ConfirmationPage>
    },
    {
        path: "/order-summary",
        element: <PaymentPage/>
    }
])

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
    <CategoryProvider>
        <ToastContainer/>
        <RouterProvider router={AppRouter}></RouterProvider>
    </CategoryProvider>
    </Provider>
)
