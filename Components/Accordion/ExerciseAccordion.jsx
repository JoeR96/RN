import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import ChildDailyWorkoutView from '../DailyWorkoutView/WorkoutTemplates/ChildDailyWorkoutView';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import { useSelector } from 'react-redux';
import React from 'react'
const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

export default function ExerciseAccordion(navigation) {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();
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
                    
                    useSelector((state) => state.user.workout).map(( item,i ) => {
                      
                        var e = useSelector((state) => state.user.workout);
                        return (
                            <TouchableOpacity
                                key={item}
                                onPress={() => {
                                    ref.current.animateNextTransition();
                                    setCurrentIndex(i === currentIndex ? null : i);
                                }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                {<View style={[styles.card, { backgroundColor: retrieveColour(item.template, item.auxillaryLift) }]}>
                                    <Text style={[styles.heading]}>{item.exerciseName}</Text>
                                    <Text style={[styles.subheading]}>{item.equipmentType}</Text>

                                    {i === currentIndex && (
                                        <View style={styles.subCategoriesList}>
                                            <Text style={[styles.body]}>
                                                <ChildDailyWorkoutView
                                                    item={item}
                                                    template={item.template}
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