import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0,
        day: 1,
        week: 1,
        jwt: '',
        workout: [],
        exerciseReps: {}
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setDay: (state, action) => {
            state.day = action.payload
        },
        setWeek: (state, action) => {
            state.week = action.payload
        },
        setJwt: (state, action) => {
            state.Jwt = action.payload
        },
        setWorkout: (state, action) => {
            state.workout = action.payload
        },
        setExerciseReps: (state, action) => {
            state.exer = { ...state.exerciseReps, [action.payload.id]:action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserId, setWeek, setDay, setJwt, setWorkout, setReps } = userSlice.actions

export default userSlice.reducer