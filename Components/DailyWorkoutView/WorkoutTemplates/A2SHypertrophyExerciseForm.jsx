import React,{useEffect,useState} from 'react'
import { Text, View, StyleSheet,Modal,Pressable,TextInput } from 'react-native';
import axios from 'axios';
import { url } from '../../Utilities/UseAxios';
import {  useDispatch } from 'react-redux';
import { removeExercise } from '../../Utilities/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default ( {route}) => {

    const [amrapResult, setAmrapResult] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [setsCompleted, setSetsCompleted] = useState(0);
    const dispatch = useDispatch()

   
    var exercise = route.params

    const nav = useNavigation();
    try
    {
        const submit = () => {
            var d = {
                id: route.params.Id,
                reps: [amrapResult],
                sets: exercise.Week
            };
            var json = JSON.stringify(d)

            axios.post(url + 'Workout-Creation/complete', json,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(dispatch(removeExercise(exercise.id)))
                .then(nav.push('DailyWorkoutView'))
                              
        }

    useEffect(() => {
        if (setsCompleted === route.params.Sets) {
            setModalVisible(true)
        }
    }, [setsCompleted])

    
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Exercise Submitted!");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Amrap Result</Text>
                        <TextInput
                            keyboardType='numeric'
                            textAlign={'center'}
                            style={styles.input}
                            onChangeText={setAmrapResult}
                            value={amrapResult}
                            color={'white'}
                            size={'12'}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                submit()
                            }}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                setSetsCompleted(setsCompleted => setsCompleted - 1)
                            }}
                        >
                            <Text style={styles.textStyle}>Return</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.text}> {route.params.ExerciseName}</Text> 
            <Text style={styles.text}>Working Weight: {route.params.WorkingWeight} KG</Text> 
             <Text style={styles.text}>Training Max: {route.params.TrainingMax}</Text>
            <Text style={styles.text}>Reps Per Set: {route.params.RepsPerSet} </Text>
            <Text style={styles.text}>Amrap Target: {route.params.AmrapRepTarget}</Text> 
                     <Text style={styles.text}>Target Sets: {route.params.Sets}+ </Text>

            <Text style={styles.text}>Sets Completed: {setsCompleted}</Text>
            <Text></Text>

            <Pressable
                style={styles.button}
                
                onPress={() => setSetsCompleted(setsCompleted => setsCompleted + 1)}
            >
                <Text style={styles.text}>Set Complete</Text>

            </Pressable>
            <Text></Text>
            <Pressable 
                style={styles.button}
                onPress={() => setSetsCompleted(setsCompleted => setsCompleted + 1)}
            >
                <Text style={styles.text}>Failed</Text>

            </Pressable>
        </View>
    )
    }
    catch (ex) {
        throw ex;
    }
    
}

const styles = StyleSheet.create({
    text: {
        color:"#AAAAAA",
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 18,
        paddingVertical: 5
    },
    heading: {
        fontSize: 25,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
        textAlign: 'center'

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
    buttonOpen: {
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
    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#999999',
        borderWidth: 1,
        borderColor: 'black',    },
    input: {
        width:  50,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

