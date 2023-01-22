import React, {
    useEffect
} from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
export default ({ navigation }) => {
    const day = useSelector((state) => state.user.day)
    const week = useSelector((state) => state.user.week)
    const userId = useSelector((state) => state.user.userId)
    const username = useSelector((state) => state.user.username)
    return (
        
        <View style={{
            ...styles.container,
        }}>
            <View>
                <Text style={styles.heading}> Wagwan {username}</Text>
                <Text style={styles.heading}> Day {day}</Text>
                <Text style={styles.heading}> Week {week}</Text>
                <Text style={styles.heading}> UserID {userId}</Text>
            </View>
                <View
            >
           
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