import React from 'react'
import { View, Text, StyleSheet,TextInput , Button, TouchableOpacity} from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'
export default () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
            <TouchableOpacity
                style={styles.loginButton}
            >
                <Text
                    style={styles.loginText}
                    onPress={() => navigate('HomeScreen')}
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2.5,
        padding: 10,
    },
    loginButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'orange',
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
})