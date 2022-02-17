import { StatusBar } from 'expo-status-bar';
import React,{ useContext, useState, useRef,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Fragment } from 'react/cjs/react.production.min';
import { ExerciseContext } from '../DailyWorkoutView/DailyWorkoutView'
import ChildDailyWorkoutView from '../DailyWorkoutView/WorkoutTemplates/ChildDailyWorkoutView';
import retrieveColour from '../Utilities/Colour/TemplateColourRetriever';
import RetrieveTemplate from '../Utilities/TemplateRetriever/RetrieveTemplate';

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
);

export default function ExerciseAccordion() {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();
    const [loading, setLoading] = React.useState(true);
    const exercises = React.useContext(ExerciseContext);

    useEffect(() => {
        setLoading(false)
    }, [exercises]);

    const finishExercise = () => {
        console.log(exercises)
    }
    if (loading) {
        return (
            <View><Text>Loading...</Text></View>
        )
    }
    else {
        return (
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={styles.container}
            >         
                <StatusBar hidden />
                {
                 
                    exercises.map(({ Template, Name, AuxillaryLift }, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    ref.current.animateNextTransition();
                                    setCurrentIndex(index === currentIndex ? null : index);
                                }}
                                style={styles.cardContainer}
                                activeOpacity={0.9}
                            >
                                <View style={[styles.card, { backgroundColor: retrieveColour(Template, AuxillaryLift) }]}>
                                    <Text style={[styles.heading]}>{Name}</Text>
                                    {index === currentIndex && (
                                        <View style={styles.subCategoriesList}>
                                            <Text style={[styles.body]}>
                                                <ChildDailyWorkoutView
                                                    index={currentIndex}
                                                    template={Template}
                                                ></ChildDailyWorkoutView>
                                            </Text>
                                            
                                        </View>
                                        
                                    )}
                                 
                                </View>
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
        body: {
            fontSize: 20,
            lineHeight: 20 * 1.5,
            textAlign: 'center',
        },
        subCategoriesList: {
            marginTop: 20,
        },
    });