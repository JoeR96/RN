import { createSlice } from '@reduxjs/toolkit'

export const utilitySlice = createSlice({
    name: 'utility',
    initialState: {
        day: 1,
        week: 1,
    },
    reducers: {
        setWeek: (state, action) => {
            state.week = action.payload
        },
        setDay: (state, action) => {
            state.day = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setWeek, setDay } = utilitySlice.actions
export default utilitySlice.reducer

export type ViewWeekAndDayIndex ={
    week: number,
    day: number
}