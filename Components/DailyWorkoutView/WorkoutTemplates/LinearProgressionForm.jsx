import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import useAxios from '../../Utilities/UseAxios'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {removeExercise, setDay} from '../../Utilities/userSlice'
export default function LinearProgressionForm({exercise}) {
    const wo = useSelector((state) => state.user.workout)
    const dispatch = useDispatch()

    const setResult = (reps, index) => {
        results[index] = reps;
    }

    const results = {}
    const submit = () => {
        var data = {
            id: exercise.id,
            reps: Object.values(results),
            sets: 4
        }
        var json = JSON.stringify(data)
        console.log(exercise.id)

        axios.post('workout-creation/complete', json, {
            headers: {
                'Content-Type': 'application/json',
            }
            
        }).then(
            console.log(wo.length)
        ).then(dispatch(removeExercise(exercise.id))
)
    }
    
    return (

        <View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Weight: {exercise.workingWeight}</Text>
                <Text>     </Text>
                <Text style={styles.text}>Target Sets: {exercise.targetSets}</Text>

            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Minimum Reps: {exercise.minimumReps}</Text>
                <Text style={styles.text}>Maximum Reps: {exercise.maximumReps}</Text>
            </View>

            <View>
                {
                    [...Array(exercise.targetSets).keys()].map((key) =>
                        <View>
                            <Text
                                style={styles.loginText}
                                onPress={() => navigation.push('Dashboard')}
                                underlayColor='red'
                                backgroundColor='red'
                            >
                            </Text>
                            <TextInput
                                style={styles.text}
                                keyboardType='numeric'
                                borderColor='black'
                                borderRadius={5}
                                borderWidth={5}
                                paddingVertical={5}
                                paddingHorizontal={5}
                                onChangeText={(text) => setResult(text,key)}
                                value={0}
                                maxLength={5}
                            />
                        </View>)
                }                   

                <View>
                    <TouchableOpacity
                        style={styles.loginButton}
                    >
                        <Text
                            style={styles.loginText}
                            onPress={() => submit()}
                            underlayColor='#fff'
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
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
