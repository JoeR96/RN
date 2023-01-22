import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import ChildDailyWorkoutView from '../DailyWorkoutView/WorkoutTemplates/ChildDailyWorkoutView';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import { useSelector,useDispatch } from 'react-redux';
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { url } from '../Utilities/UseAxios';
import { setWorkout } from '../Utilities/userSlice';

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

// enum equipmentType
// {
//     Barbell,
//     SmithMachine,
//     Dumbbell,
//     Machine,
//     Cable,
// }



export default function ExerciseAccordion() {
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect   
        getWorkout();

        //wtf is going on with the structure of the api response lol.
        //this will be fixed with a typescript upgrade
        async function getWorkout() {
            const response = await axios.get(url + userUrl);
            const tt= await response;
            const {data } = tt
            const {Data} = data
            const { Exercises } = Data
            dispatch(setWorkout(Exercises));
        };
    }, []);

    const day = useSelector((state) => state.user.day);
    const week = useSelector((state) => state.user.week);
    const userId = useSelector((state) => state.user.userId);
    const userUrl = 'workout-creation/' + userId + '/' + week + '/' + day;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();
   

    const equipmentType = (value) => {
        switch (value) {
            case 0:
                return 'Barbell';
            case 1:
                return 'SmithMachine';
            case 2:
                return 'Dumbbell';
            case 3:
                return 'Machine';
            case 4:
                return 'Cable';
    }}
    
    


        return (
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.container}
            >         
                <StatusBar hidden />
                {
                    
                    useSelector((state) => state.user.workout).map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    // ref.current.animateNextTransition();
                                    // setCurrentIndex(i === currentIndex ? null : i);
                                    
                                    switch (item.Template) {
                                        case 2:
                                            navigation.push('A2SRepsThenSetsForm', item)   
                                            return;
                                        case 1:
                                            navigation.push('A2SHypertrophyExerciseForm', item)   
                                            return;
                                        case 0:
                                            navigation.push('LinearProgressionForm', item)   
                                            return;
                                        
                                }}}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                {<View style={[styles.card, { backgroundColor: retrieveColour(item.Template) }]}>
                                    <Text style={[styles.heading]}>{item.ExerciseName}</Text>
                                    <Text style={[styles.subheading]}>{equipmentType(item.EquipmentType)}</Text>
                                    {i === currentIndex && (
                                        <View style={styles.subCategoriesList}>
                                            <Text style={[styles.body]}>
                                                {}
                                                <ChildDailyWorkoutView
                                                    index={i}
                                                    exercise={item}
                                                ></ChildDailyWorkoutView>
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
                    
                </Transitioning.View>)
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