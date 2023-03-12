import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, Modal, Pressable, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { url } from '../../Utilities/UseAxios';
import { useDispatch, useSelector } from 'react-redux';
import { removeExercise } from '../../Utilities/userSlice';
import { RootState } from '../../../store';
import { setSetsCompleted } from '../../Utilities/a2sSlice';

export default ({ route, navigation }) => {

    const [amrapResult, setAmrapResult] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const exercises = useSelector((state: RootState) => state.user.workout)

    const dispatch = useDispatch()
    var exercise = route.params
    const id = exercise.Id;

    var setsCompleted = useSelector((state: RootState) => state.a2sSlice.activeSets[id])
    isNaN(setsCompleted) ? setsCompleted = 0 : setsCompleted = setsCompleted;
    try {
        const submit = () => {
            var d = {
                id: route.params.Id,
                reps: [amrapResult],
                sets: exercise.Week
            };
            var json = JSON.stringify(d)

            axios.post(url + 'Workout-Creation/complete', json, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => dispatch(removeExercise(id)))
                .then(() => navigation.push('DailyWorkoutView')).then(() => console.log(exercises[0], id))

        }
        const [time, setTime] = React.useState(5);
        var timerRef = React.useRef(time);
        const [reset, setReset] = useState(false);

        useEffect(() => {
            if (setsCompleted > 0) {
                var timerId = setInterval(() => {
                    if (reset) {
                        clearInterval(timerId);
                        setReset(false);
                        setTime(timerRef.current);
                        setTimerActive(true);
                        return;
                    }

                    timerRef.current -= 1;
                    if (timerRef.current < 0) {
                        clearInterval(timerId);
                        setTimerActive(false)
                    } else {
                        setTime(timerRef.current);
                        setTimerActive(true)
                    }
                }, 1000);
           }

            return () => {
                clearInterval(timerId);
            };
        }, [reset]);

        const handleReset = () => {
            setReset(true);
        };
        useEffect(() => {
            if (setsCompleted > 0) {
                console.log(setsCompleted)
                timerRef.current = 5

                setTimerActive(true)
                handleReset()
            }



        }, [setsCompleted])
        useEffect(() => {
            dispatch(setSetsCompleted({ [id]: setsCompleted }))
        }, [])
        useEffect(() => {
            if (setsCompleted === route.params.Sets) {
            }
        }, [setsCompleted])
        return (
            <View style={{ ...styles.PressableContainer, height: '100%' }}>
                <View style={styles.PressableContainer}><Text style={styles.heading}>

                    {route.params.ExerciseName}</Text></View>


                <View >
                    <Text style={styles.text}>Working Weight: {route.params.WorkingWeight} KG</Text>
                    <Text style={styles.text}>Training Max: {route.params.TrainingMax}</Text>
                    <Text style={styles.text}>Reps Per Set: {route.params.RepsPerSet} </Text>
                </View>
                <View >
                    <Text style={styles.text}>Amrap Target: {route.params.AmrapRepTarget}</Text>
                    <Text style={styles.text}>Target Sets: {route.params.Sets}+ </Text>
                    <Text style={styles.text}>Sets Completed: {setsCompleted}</Text>
                </View>

                {timerActive ? <View>
                    <Text style={styles.text}>{time} seconds remaining</Text>
                </View> : setsCompleted < route.params.Sets ? setsCompleted < route.params.Sets ? <Pressable
                    style={styles.button}
                    onPress={() => dispatch(setSetsCompleted({ [id]: setsCompleted + 1 }))}>
                    <Text style={styles.pressableText}>Complete Set</Text>

                </Pressable> : null : <View>
                    <Text style={styles.text}>Amrap Result</Text>

                    <TextInput
                        style={{ ...styles.button, textAlign: 'center', ...styles.text, height: 75 }}
                        keyboardType='numeric'
                        onChangeText={(text) => setAmrapResult(+text)}
                        value={amrapResult.toString()}
                        maxLength={10}

                    />
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>Finish Exercise</Text>

                    </Pressable>
                </View>}
                {/*         
                {
                    setsCompleted < route.params.Sets ?
                        <View>

                            <Pressable
                                style={styles.button}
                                onPress={() => dispatch(setSetsCompleted({ [id]: setsCompleted + 1 }))
                                }
                            >

                                <Text style={styles.pressableText}>Set Complete</Text>

                            </Pressable> </View> : null
                } */}
            </View>
        )
    }
    catch (ex) {
        throw ex;
    }

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
