import React from 'react'
import { Text } from 'react-native'
import A2SHypertrophyExerciseForm from './A2SHypertrophyExerciseForm'
import A2SSetsThenRepsExerciseForm from './A2SSetsThenRepsExerciseForm'
import LinearProgressionForm from './LinearProgressionForm'
import { useNavigation } from '@react-navigation/native'
export default ({index,exercise}) => {
    const nav = useNavigation();
    nav.push('A2SHypertrophyExerciseForm', exercise)    

    switch (exercise.Template) {
        case 1:
            nav.push('A2SHypertrophyExerciseForm', exercise)   
            return;
        case 2:
            nav.push('A2SHypertrophyExerciseForm', exercise)   
            return;
        case 0:
            nav.push('A2SHypertrophyExerciseForm', exercise)   
            return;
        
    }

    
        return (
            <div>Here comes JSX !</div>
        );
}

