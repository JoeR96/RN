import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Components/Utilities/userSlice'
export default configureStore({
    reducer: {
        user:userSlice
    },
})