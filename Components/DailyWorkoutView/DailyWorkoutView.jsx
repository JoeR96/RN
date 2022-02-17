import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { StyleSheet,View,Text } from 'react-native'
import ExerciseAccordion from '../Accordion/ExerciseAccordion';
import useAxios, {url} from '../Utilities/UseAxios'

export const ExerciseContext = React.createContext();
export const RemoveExerciseContext = React.createContext()
export default ({navigation}) => {
    const { response, loading, error } = useAxios({
        method: 'get',
        url: 'WorkoutCreation/DailyWorkout/bzzt/',
        headers: JSON.stringify({ accept: '*/*' }),    
    });
    const [exercises, setExercises] = useState([]);
    const [isLoaded,setLoaded] = useState(false)
    const RemoveExercise = (index) => setExercises(exercises.filter(e => e.ExerciseOrder !== index)) 
    useEffect(() => {
        if (response !== null) {
            setExercises(response);
            setLoaded(true);
        }
    }, [response]);
    
    useEffect(() => {
        if (exercises.length === 0 && isLoaded) {
            axios.put(url + 'WorkoutCreation/UpdateDayAndWeek/bzzt')
            navigation.push('Dashboard')
            setLoaded(false);
}
    },[exercises])
    if (loading === true) {
        return (
            <View>
                <Text>
                    loading...
                </Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}
>
                <ExerciseContext.Provider value={exercises}>
                    <RemoveExerciseContext.Provider value={RemoveExercise}>
                        <ExerciseAccordion></ExerciseAccordion>
                    </RemoveExerciseContext.Provider>
                </ExerciseContext.Provider>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
})