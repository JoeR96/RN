import axios from 'axios'
import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import {  useDispatch } from 'react-redux'
import { setUserId, setDay, setWeek, setJwt, setUsername, setWorkoutsInWeek } from '../Utilities/userSlice'
import { url } from '../Utilities/UseAxios' 
export default ({ navigation }) => {
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text
                style={[styles.heading]} 
            >Operation Stacked - ft Ben Houlding</Text>
            {/* <Image
                style={styles.tinyLogo}
                source={Barbell}
            /> */}
           
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
            <TouchableOpacity
                style={styles.loginButton}
            >
                <Text
                    style={styles.loginText}
                   
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2.5,
        padding: 10,
        borderColor: '#fff',
        backgroundColor: 'grey',

    },
    loginButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight : 10
    },
    tinyLogo: {
        width: 400,
        height: 180,
    },
    heading: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'white',
        textAlign: 'center',
        paddingTop: 50,        
    },
})