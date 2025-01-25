import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginModalOpen: false,
  selectedTab: "login",
  userData: null,
  username: "",
  email: "",
  password: "",
  phNumber: "",
  isUserLoggedIn: false,
  allOrders: [],
  isUserModalOpen: false,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOpenLoginModal: (state) => {
          return{
            ...state,
            isLoginModalOpen: true
          }
        },
        setCloseLoginModal: (state) => {
          return{
            ...state,
            isLoginModalOpen: false
          }
        },
        setSelectedTab: (state, action) => {
          return{
            ...state,
            selectedTab: action.payload
          }
        },
        setUsername: (state, action) => {
          return{
            ...state,
            username: action.payload
          }
        },
        setEmail: (state,action) => {
          return{
            ...state,
            email: action.payload
          }
        },
        setPassword: (state, action) => {
          return{
            ...state,
            password: action.payload
          }
        },
        setPhNumber: (state,action) => {
          return{
            ...state,
            phNumber: action.payload
          }
        },
        addUser: (state,action) => {
          return{
            ...state,
            userData: action.payload
          }
        },
        setIsUserLoggedIn: (state, action) => {
          return{
            ...state,
            isUserLoggedIn: action.payload
          }
        },
        removeUser: (state) => {
          return{
            ...state,
            userData: null
          }
        },
        setAllOrders: (state,action) => {
          return{
            ...state,
            allOrders: [...state.allOrders, action.payload],
          }
        },
        setUserModal: (state,action) => {
          return{
            ...state,
            isUserModalOpen: action.payload
          }
        },
    }
});

export const {
    setOpenLoginModal,
    setCloseLoginModal,
    setSelectedTab,
    setUsername,
    setEmail,
    setPassword,
    setPhNumber,
    addUser,
    setIsUserLoggedIn,
    removeUser,
    setAllOrders,
    setUserModal,
} = UserSlice.actions;

export default UserSlice.reducer