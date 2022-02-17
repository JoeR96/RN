import React, { useState, useEffect, useContext, createContext } from 'react'
import { Text } from 'react-native'
import { ExerciseContext } from '../DailyWorkoutView'
import A2SHypertrophyExerciseForm from '../WorkoutTemplates/A2SHypertrophyExerciseForm'
import A2SSetsThenRepsExerciseForm from '../WorkoutTemplates/A2SSetsThenRepsExerciseForm'

export default ({ template, index }) => {
    const exercises = React.useContext(ExerciseContext);

    switch (template) {
        case 'A2SHypertrophy':
            return <A2SHypertrophyExerciseForm index={index}></A2SHypertrophyExerciseForm>
            break;
        case 'A2SRepsThenSets':
            return <A2SSetsThenRepsExerciseForm index={index}></A2SSetsThenRepsExerciseForm>
            break;
        default:
            return null;
    }
    return <Text>{}</Text>
}

