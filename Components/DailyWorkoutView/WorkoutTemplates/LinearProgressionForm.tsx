import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {removeExercise, setDay} from '../../Utilities/userSlice'
import { RootState } from '../../../store';
import { url } from '../../Utilities/UseAxios';

export default ({route, navigation}) => {
    const wo = useSelector((state : RootState) => state.user.workout)
    const userId = useSelector((state : RootState) => state.user.userId)
    const dispatch = useDispatch()
    const exercise = route.params
    var completed = true;
    const setResult = (reps, index) => {
        results[index] = reps;
    }
    const [reps,setReps] = React.useState(0);
    type UpdateWorkOutRequest = {
        id : string,
        reps : number[],
        sets : number
    }

    
    
    const results = {}
    const id = exercise.Id;

    const submit = () => {
        completed = false;
        var request : UpdateWorkOutRequest = {
            id: exercise.Id,
            reps: [reps],
            sets: 4
        }
        var json = JSON.stringify(request)
        axios.post(url + 'workout-creation/complete', json, {
            headers: {
                'Content-Type': 'application/json',
            }
            
        }).then(
        ).then(() => dispatch(removeExercise(id)))
            .then(() => navigation.push('DailyWorkoutView'))   
        
    }

    return (
        <View style={{ ...styles.PressableContainer, height:'100%'}}> 
                                <Text style={{...styles.text,paddingTop:16,fontSize:36}}>{exercise.ExerciseName}</Text>

         <View>
                <View >
                    <Text style={styles.text}>Weight: {exercise.WorkingWeight}KG</Text>
                    <Text style={styles.text}>Target Sets: {exercise.TargetSets}</Text>
                </View>
                <View >
                    <Text style={styles.text}>Minimum Reps: {exercise.MinimumReps}</Text>
                    <Text style={styles.text}>Maximum Reps: {exercise.MaximumReps}</Text>
                </View>
            </View>
            <View>
                {
                    [...Array(exercise.targetSets).keys()].map((key) =>
                        <View>
                            <Text
                                style={styles.text}
                            >
                            </Text>
                            <View style={{ alignItems:'center'}}>
                                
                            <TextInput
                                    style={{ ...styles.button,textAlign:'center',fontSize:24,fontWeight:'600'}
                            }
                                keyboardType='numeric'
                                onChangeText={(text) => setReps(+text)}
                                defaultValue={"0"}
                                maxLength={5}
                            />
                            </View>
                        </View>)
                }                   

                {completed ? <View>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text
                            style={styles.text}
                            onPress={() => submit()}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View> : <View><Text>Completed</Text></View>}
        </View>
        </View>
       
  )
}

const styles = StyleSheet.create({
    PressableContainer: { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#303234' },
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        paddingVertical: 5,
    },
    pressableText: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        paddingVertical: 5,
    },
    heading: {
        fontSize: 60,
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: -2,
        textAlign: "center",
        color: 'white',
        paddingTop: 48
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: '#999999',
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
    },

    container: {
        backgroundColor: "grey",
    },
});
