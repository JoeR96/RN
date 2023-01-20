import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import ChildDailyWorkoutView from '../DailyWorkoutView/WorkoutTemplates/ChildDailyWorkoutView';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import { useSelector } from 'react-redux';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

enum equipmentType
{
    Barbell,
    SmithMachine,
    Dumbbell,
    Machine,
    Cable,
}

export default function ExerciseAccordion() {
    const nav = useNavigation();

    // switch (exercise.Template) {
    //     case 1:
    //         nav.push('A2SHypertrophyExerciseForm', exercise)   
    //         return;
    //     case 2:
    //         nav.push('A2SHypertrophyExerciseForm', exercise)   
    //         return;
    //     case 0:
    //         nav.push('A2SHypertrophyExerciseForm', exercise)   
    //         return;
            
    const [currentIndex, setCurrentIndex] = React.useState(null);
    var ref : any;
    ref = React.useRef()
    const [loading, setLoading] = React.useState(false);
    //const exercises = )

    const finishExercise = () => {
    }
    if (loading) {
        return (
            <View><Text>Loading...</Text></View>
        )
    }
    else {
        {
        }
        return (
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.container}
            >         
                <StatusBar hidden />
                {
                    
                    useSelector((state: any) => state.user.workout).map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    ref.current.animateNextTransition();
                                    setCurrentIndex(i === currentIndex ? null : i);
                                }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                {<View style={[styles.card, { backgroundColor: retrieveColour(item.Template) }]}>
                                    <Text style={[styles.heading]}>{item.ExerciseName}</Text>
                                    <Text style={[styles.subheading]}>{equipmentType[item.EquipmentType]}</Text>
                                    {i === currentIndex && (
                                        <View style={styles.subCategoriesList}>
                                            <Text style={[styles.body]}>
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