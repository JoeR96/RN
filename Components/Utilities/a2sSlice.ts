import { createSlice } from '@reduxjs/toolkit'

export const a2sSlice = createSlice({
    name: 'a2sSlice',
    initialState: {
        activeSets: {}
    },
    reducers: {
        setSetsCompleted: (state, action) => {
            state.activeSets = {...state.activeSets,...action.payload}
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSetsCompleted } = a2sSlice.actions
export default a2sSlice.reducer

