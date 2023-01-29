import { createSlice } from '@reduxjs/toolkit'
import { Exercise } from '../types'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0,
        day: 1,
        week: 1,
        Jwt: '',
        workout: [] as Exercise[],
        historicalWorkout: [] as Exercise[],
        exerciseReps: {},
        username: '',
        workoutsInWeek: 0,
        workoutIsSet: false
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
        setHistoricalWorkout: (state, action) => {
            state.historicalWorkout = action.payload
        },
        removeExercise: (state, action) => {
            state.workout = state.workout.filter((x => x.Id !== action.payload))
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setWorkoutsInWeek: (state, action) => {
            state.workoutsInWeek = action.payload
        },
        setWorkoutIsSet: (state, action) => {
            state.workoutIsSet = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserId, setWeek, setDay, setJwt,setWorkoutIsSet, setWorkout, removeExercise,setUsername, setWorkoutsInWeek, setHistoricalWorkout } = userSlice.actions

export default userSlice.reducer



