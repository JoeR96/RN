import { combineReducers, configureStore } from '@reduxjs/toolkit'
import a2sSlice from './Components/Utilities/a2sSlice';
import userSlice from './Components/Utilities/userSlice'
import utilitySlice from './Components/Utilities/utilitySlice'
const rootReducer = combineReducers({ user:userSlice,
    utility:utilitySlice,a2sSlice:a2sSlice});
export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: rootReducer,
})