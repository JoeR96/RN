import React from 'react'
import { View, Text, Image, StyleSheet,TextInput , Button, TouchableOpacity} from 'react-native'
import Barbell from './Barbell-Transparent-Images-PNG.png'
export default ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text
                style={[styles.heading]}
            >Project Power</Text>
            <Image
                style={styles.tinyLogo}
                source={Barbell}
            />
           
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
            <TouchableOpacity
                style={styles.loginButton}
            >
                <Text
                    style={styles.loginText}
                    onPress={() => navigation.push('Dashboard')}
                    underlayColor='#fff'
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
        height: 250,
    },
    heading: {
        fontSize: 56,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'white',
        textAlign: 'center',
        paddingTop: 50,        
    },
})