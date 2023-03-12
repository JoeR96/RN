import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise, setDay } from '../../Utilities/userSlice'
import { RootState } from '../../../store';
import { url } from '../../Utilities/UseAxios';

export default ({ route, navigation }) => {
    const [repSubmitOptions, setRepSubmitOptions] = React.useState([]);
    const dispatch = useDispatch()
    const exercise = route.params
    var completed = true;
    const setResult = (reps, index) => {
        results[index] = reps;
    }
    const [reps, setReps] = React.useState(0);
    const [setResults, setSetResults] = React.useState([])
    const [showSubmitScreen, setShowSubmitScreen] = React.useState(false)
    const [setCountReached, setSetCountReached] = React.useState(false)

    type UpdateWorkOutRequest = {
        id: string,
        reps: number[],
        sets: number
    }
    const length = exercise.MaximumReps-- - exercise.MinimumReps + 1
    useEffect(() => {
        setRepSubmitOptions(Array.from({ length: length }, (v, k) => k + exercise.MinimumReps)
        )


    }, [])

    const increaseReps = (index) => {
        console.log(index)
        setSetResults(prices => prices.map((price, i) => i === index ? price  += 1 : price
        ));
    }

    const decreaseReps = (index) => {
        console.log(index)
        setSetResults(prices => prices.map((price, i) => i === index ? price -= 1 : price
        ));
    }
    useEffect(() => {


        if (exercise.TargetSets === setResults.length) {
            setSetCountReached(true)
        }
    }, [setResults])

    const results = {}
    const id = exercise.Id;
    const submit = () => {
        completed = false;
        var request: UpdateWorkOutRequest = {
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
        <View style={{ ...styles.PressableContainer, height: '100%' }}>
            <Text style={{ ...styles.text, paddingTop: 16, fontSize: 36 }}>{exercise.ExerciseName}</Text>

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
                        <View key={key}>
                            <Text
                                style={styles.text}
                            >
                            </Text>
                            <View style={{ alignItems: 'center' }}>

                            </View>
                        </View>)
                }

                {showSubmitScreen ? <View >
                        
                    {repSubmitOptions.map((index, value) => <Pressable key={index}
                        style={styles.button}>


                        <Text style={styles.text}
                            onPress={() => {
                                setSetResults([...setResults, index])
                                setShowSubmitScreen(false)
                            }}
                        >
                            {index} Reps
                        </Text>

                    </Pressable>)}
                </View> : <View>

                    {setResults.map((index, key) => {
                        return (
                            <View key={key}
                                style={{ ...styles.PressableContainerRow, backgroundColor: 'grey', borderColor:'black'}}>
                                <Pressable
                                    style={{ ...styles.Pressable, borderWidth: 1 }}
                                    onPress={() => decreaseReps(key)}
                                >
                                    <Text style={styles.text}> - </Text>
                                </Pressable>
                                <Text style={styles.text}>{index} Reps</Text>
                                <Pressable
                                    style={{ ...styles.Pressable, borderWidth: 1 }}
                                    onPress={() => increaseReps(key)}


                                >
                                    <Text style={styles.text}> +</Text>
                                </Pressable>
                            </View>
                        )
                    })
                        }
                        
                        {setResults.length >= exercise.TargetSets ? null :
                            <Pressable style={styles.button}><Text style={styles.text}
                                onPress={() => {
                                    setShowSubmitScreen(true)
                                }}
                            >
                                Complete Set
                            </Text>
                            </Pressable>}
                  
                </View>
                }
                {setCountReached ? <Pressable style={styles.button}><Text style={styles.text}
                    onPress={() => submit()
                    }
                >
                    Submit
                </Text>
                </Pressable> : <View></View>}
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    PressableContainer: { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#303234' },
    PressableContainerRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#303234' },

    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        paddingVertical: 5,
    }, Pressable: {
        padding: 20,
        borderColor: 'black',
        backgroundColor: 'grey'
    },
    app: {
        flex: 4,
    },
    row: {
        flexDirection: "row"
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
