import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Transitioning } from 'react-native-reanimated';
import DailyWorkoutView from './Components/DailyWorkoutView/DailyWorkoutView';


export default () => {
    <Transitioning.View style={styles.container}>
        <StatusBar style="auto" />
        <DailyWorkoutView></DailyWorkoutView>
    </Transitioning.View>
}