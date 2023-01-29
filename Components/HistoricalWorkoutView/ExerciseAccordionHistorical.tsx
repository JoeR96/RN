import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { Transition } from 'react-native-reanimated';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import { useSelector,useDispatch } from 'react-redux';
import React,{useEffect} from 'react'
import axios from 'axios';
import { url } from '../Utilities/UseAxios';
import { setHistoricalWorkout } from '../Utilities/userSlice';
import { RootState } from '../../store';
import { Exercise } from '../types';
import { EquipmentType, ExerciseTemplate } from '../../enums';
import { setDay as setHistoricalDayIndex, setWeek as setHistoricalWeek } from '../Utilities/utilitySlice';


export default ({navigation}) => {
    const day = useSelector((state : RootState) => state.utility.day);
    const week = useSelector((state : RootState) => state.utility.week);
    const userId = useSelector((state : RootState) => state.user.userId);
    const userUrl = 'workout-creation/' + userId + '/' + week + '/' + day + '/' + 'true';
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const multiDispatch = () => {
        dispatch(setHistoricalDayIndex(1))
        dispatch(setHistoricalWeek(week + 1))
    }

    const multiDispatchDecrease = () => {
        dispatch(setHistoricalDayIndex(workoutsInWeek))
        dispatch(setHistoricalWeek(week - 1))
    }
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect   
        getHistoricalWorkout();

        //wtf is going on with the structure of the api response lol.
        //this will be fixed with a typescript upgrade
        async function getHistoricalWorkout() {
            const response = await axios.get(url + userUrl);
            const tt= await response;
            const {data } = tt
            const {Data} = data
            const { Exercises } = Data
            dispatch(setHistoricalWorkout(Exercises));
        };
    },[week,day]);


   var workoutsInWeek = useSelector((state : RootState) => state.user.workoutsInWeek);
        return (
            <View
                style={styles.container}
            >         
                <StatusBar hidden />
                {
                    
                    useSelector((state : RootState) => state.user.historicalWorkout).map((item : Exercise, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    navigation.push(ExerciseTemplate[item.Template],item)
                                    }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                {<View style={[styles.card, { backgroundColor: retrieveColour(item.Template)}]}>
                                    <Text style={[styles.heading]}>{item.ExerciseName}</Text>
                                    <Text style={[styles.subheading]}>{EquipmentType[item.Template]}</Text>
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
                    <Text>Week {useSelector((state : RootState) => state.utility.week)}</Text>
        <Text>Day {useSelector((state : RootState) => state.utility.day)}</Text>
       <View style={{height:'20%'}}>
        <View style={{flexDirection:"row"}}>
            <Pressable
                onPress={() => dispatch(setHistoricalWeek(week + 1))
                    
                }
                style={{justifyContent: 'flex-start'}}
                >
                    <Text> + Week</Text>
                </Pressable>
                <Pressable
                onPress={() => week > 1 ? dispatch(setHistoricalWeek(week - 1)) : dispatch(setHistoricalWeek(week))
                    
                }
                style={{justifyContent: 'flex-end'}}
                >
                    <Text> - Week</Text>
                </Pressable>
        </View>
            <View style={{flexDirection:"row"}}>
                <Pressable
                                    style={{justifyContent: 'flex-start'}}

                onPress={() => day < workoutsInWeek ? dispatch(setHistoricalDayIndex(day + 1)) : multiDispatch() 

                }
                >
                    <Text> + Day</Text>
                </Pressable>
                <Pressable
                                    style={{justifyContent: 'flex-end'}}

                onPress={() => day > 1 ? dispatch(setHistoricalDayIndex(day - 1)) : multiDispatchDecrease()

                }
                >
                    <Text> - Day</Text>
                </Pressable>
            </View>
       </View>
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