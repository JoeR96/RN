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
        <View>
                                <Text style={{...styles.text,paddingTop:16,fontSize:36}}>{exercise.ExerciseName}</Text>

         <View style={styles.row}>
                <View >
                    <Text style={styles.text}>Weight: {exercise.WorkingWeight}</Text>
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
                                style={styles.loginText}
                            >
                            </Text>
                            <View style={{ alignItems:'center'}}>
                                
                            <TextInput
                                style={{width:'66%',
                               
                            }}
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
                        style={styles.loginButton}
                    >
                        <Text
                            style={styles.loginText}
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
    row:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent:'center',
        paddingTop: 16,
        
    },
    text: {
        paddingLeft: 16,
        paddingRight: 16,
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
        backgroundColor: '#555555',
        borderWidth: 5,
        borderColor: 'black',
        paddingTop: 5,
        paddingBottom: 5
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    textInput: {
        
    }, loginButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
})

