import React, {useEffect,useContext} from 'react'
import { ExerciseContext } from '../DailyWorkoutView';
import { Text,View,StyleSheet,Pressable } from 'react-native';
import axios from 'axios';
import { url } from '../../Utilities/UseAxios';
import { RemoveExerciseContext } from '../DailyWorkoutView';

export default ({ index }) => {
    const RemoveExercise = useContext(RemoveExerciseContext)
    const [setsCompleted, setSetsCompleted] = React.useState(0);
    const exercises = React.useContext(ExerciseContext);
    var exercise = exercises[index]

    const submit = () => {
        axios.put(url + 'WorkoutCreation/DailyWorkout/UpdateWorkOutResult', {
            id: exercise.ExerciseMasterId,
            sets: setsCompleted,
            reps: exercise.CurrentReps,
            week: exercise.Week
        })
            .then(exercise.exerciseCompleted = true)
            .then(RemoveExercise(exercise.ExerciseOrder))     
    }

    useEffect(() => {
    if (setsCompleted == exercise.CurrentSets) {
        submit()
    }
}, [setsCompleted])

    return (
        <View>
            <Text style={styles.text}>Stack/Weight: {exercise.StartingWeight}</Text>      
            <Text style={styles.text}>Reps Per Set: {exercise.CurrentReps}</Text>      
            <Text style={styles.text}>Sets Completed: {setsCompleted}</Text>
            <Text style={styles.text}>Target Sets: {exercise.CurrentSets}</Text>
            <Text></Text>
            <Pressable 
                onPress={() => setSetsCompleted(setsCompleted => setsCompleted + 1)}
                style={styles.button}

            >               
                <Text style={styles.text}>Set Complete</Text>
</Pressable>
            <Text></Text>
            <Pressable 
                onPress={submit}
                style={styles.button}
>
                <Text style={styles.text}>Set Failed</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 5
    },
    heading: {
        fontSize: 25,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#999999',
        borderWidth: 1,
        borderColor: 'black',
    },
})

