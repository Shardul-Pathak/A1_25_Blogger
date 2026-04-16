import { configureStore } from '@reduxjs/toolkit'
import AuthorReducer from './AuthorSlice'


export default configureStore({
    reducer: {
        AuthorR : AuthorReducer
    }
})