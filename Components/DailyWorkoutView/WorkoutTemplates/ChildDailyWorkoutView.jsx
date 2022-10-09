import React from 'react'
import { Text } from 'react-native'
import A2SHypertrophyExerciseForm from '../WorkoutTemplates/A2SHypertrophyExerciseForm'
import A2SSetsThenRepsExerciseForm from '../WorkoutTemplates/A2SSetsThenRepsExerciseForm'
import LinearProgressionForm from './LinearProgressionForm'
export default ({ template, index }) => {

    switch (template) {
        case 'A2SHypertrophy':
            return <A2SHypertrophyExerciseForm index={index}></A2SHypertrophyExerciseForm>
            break;
        case 'A2SRepsThenSets':
            return <A2SSetsThenRepsExerciseForm index={index}></A2SSetsThenRepsExerciseForm>
            break;
        case 'LinearProgression':
            return<LinearProgressionForm index={index}></LinearProgressionForm>
        default:
            return null;
    }
    return <Text>{}</Text>
}

