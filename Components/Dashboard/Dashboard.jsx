import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Accordion from '../Accordion/Accordion'
import DailyWorkoutView from '../DailyWorkoutView/DailyWorkoutView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default ({navigation}) => {
    return (
        <View
        style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => navigation.push('DailyWorkoutView')}
            >
                <Text style={styles.text}>Daily Workout</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.push('Login Form')}
            >
                <Text style={styles.text}>Login Form</Text>
            </Pressable>
        </View>     
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#FFFFFF",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 5
    },
    heading: {
        fontSize: 25,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
    },
    container: {
        backgroundColor: 'grey',
        flex: 1
    }
})