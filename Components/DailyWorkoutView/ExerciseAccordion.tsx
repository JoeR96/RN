import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import { useSelector,useDispatch } from 'react-redux';
import React,{useEffect} from 'react'
import axios from 'axios';
import { url } from '../Utilities/UseAxios';
import {  setWorkoutIsSet } from '../Utilities/userSlice';
import { RootState } from '../../store';
import { Exercise } from '../types';
import { EquipmentType, ExerciseTemplate } from '../../enums';


export default ({navigation}) => {
    const day = useSelector((state : RootState) => state.user.day);
    const userId = useSelector((state : RootState) => state.user.userId);
    const exercises = useSelector((state: RootState) => state.user.workout)
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [completed,setCompleted] = React.useState(false);
    const workoutIsSet = useSelector((state:RootState) => state.user.workoutIsSet)
    console.log(workoutIsSet)
    const ref = React.useRef();
    



   


        return (
            <View
                style={styles.container}
            >         
                <StatusBar hidden />
                {
                    
                    exercises.map((item : Exercise, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    navigation.push(ExerciseTemplate[item.Template],item)
                                }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                {<View style={[styles.card, { backgroundColor: retrieveColour(item.Template) }]}>
                                    <Text style={[styles.heading]}>{item.ExerciseName}</Text>
                                    <Text style={[styles.subheading]}>{EquipmentType[item.EquipmentType]}</Text>
                                    {i === currentIndex && (
                                        <View style={styles.subCategoriesList}>
                                            <Text style={[styles.body]}>
                    
                                            </Text>
                                            
                                        </View>
                                        
                                    )}
      
                                </View>}
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 4,
                                        
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                    
                </View>)
    }
    
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
        },
        cardContainer: {
            flexGrow: 1,
        },
        card: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        heading: {
            fontSize: 38,
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: -2,
        },
        subheading: {
            fontSize: 24,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: -2,
        },
        body: {
            fontSize: 20,
            lineHeight: 20 * 1.5,
            textAlign: 'center',
        },
        subCategoriesList: {
            marginTop: 20,
        },
    });