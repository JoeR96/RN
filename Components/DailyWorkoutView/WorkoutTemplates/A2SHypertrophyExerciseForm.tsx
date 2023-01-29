import React,{useEffect,useState} from 'react'
import { Text, View, StyleSheet,Modal,Pressable,TextInput, Alert } from 'react-native';
import axios from 'axios';
import { url } from '../../Utilities/UseAxios';
import {  useDispatch, useSelector } from 'react-redux';
import { removeExercise } from '../../Utilities/userSlice';
import { RootState } from '../../../store';
import { setSetsCompleted } from '../../Utilities/a2sSlice';
export default ( {route,navigation}) => {

    const [amrapResult, setAmrapResult] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [completed,setCompleted] = useState(false);
    const exercises = useSelector((state: RootState) => state.user.workout)

    const dispatch = useDispatch()
    var exercise = route.params
    const id = exercise.Id;

    var setsCompleted = useSelector((state:RootState) => state.a2sSlice.activeSets[id])
    isNaN(setsCompleted) ? setsCompleted = 0 : setsCompleted = setsCompleted;
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
            }).then(() => dispatch(removeExercise(id)))
            .then(() => navigation.push('DailyWorkoutView')).then(() => console.log(exercises[0],id))
                              
        }
    

        useEffect(() => {
            dispatch(setSetsCompleted({[id]: setsCompleted}))
        },[])
    useEffect(() => {
        if (setsCompleted === route.params.Sets) {
            setModalVisible(true)
        }
    }, [setsCompleted])
    return (
        <View style={{backgroundColor:'grey',height:'100%'}}>
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
                            onChangeText={(text) => setAmrapResult(+text)}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                submit()
                            }}
                        >
                            <Text style={styles.text}>Submit</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)


                            }}
                        >
                            <Text style={styles.text}>Return</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{alignItems:'center'}}><Text style={{...styles.heading,paddingTop:16}}>{route.params.ExerciseName}</Text></View>

            <View style={styles.row}>
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
            </View>
            <View style={{alignItems:'center',paddingTop:32}}>
            <Pressable
                style={styles.button}
                onPress={() =>     dispatch(setSetsCompleted({[id]: setsCompleted + 1}))
            }

                
            >
                <Text style={styles.text}>Set Complete</Text>

            </Pressable>
            <Text></Text>
            <Pressable 
                style={styles.button}
                onPress={() => dispatch(setSetsCompleted({[id]:setsCompleted + 1}))}
            >
                <Text style={styles.text}>Failed</Text>

            </Pressable>
            </View>
            
        </View>
    )
    }
    catch (ex) {
        throw ex;
    }
    
}

const styles = StyleSheet.create({
    row:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent:'center',
        paddingTop: 16
    },
    column:{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '100%',
        flex: 1,
    },
    text: {
        color:"black",
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
        width:'50%'
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
    }
})

