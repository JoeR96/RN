import React, {
    useEffect
} from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { url } from '../Utilities/UseAxios';

import axios from 'axios'
import { setDay, setWeek, setWorkout, setWorkoutIsSet } from '../Utilities/userSlice';
export default ({ navigation }) => {
    const day = useSelector((state : RootState) => state.user.day)
    const week = useSelector((state : RootState) => state.user.week)
    const userId = useSelector((state : RootState) => state.user.userId)
    const username = useSelector((state : RootState) => state.user.username)
    const userUrl = 'workout-creation/' + userId + '/' + week + '/' + day + '/' + 'false';
    const workoutIsSet = useSelector((state: RootState) => state.user.workoutIsSet)
    const dispatch = useDispatch()
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect   
        if(workoutIsSet){
            getWorkout();
        }

        //wtf is going on with the structure of the api response lol.
        //this will be fixed with a typescript upgrade
        async function getWorkout() {
            const response = await axios.get(url + userUrl);
            const tt= await response;
            const {data } = tt
            const {Data} = data
            const { Exercises } = Data
            dispatch(setWorkout(Exercises));
            dispatch(setWorkoutIsSet(true))
        };
    },[]);
    return (
        
        <View style={{
            ...styles.container,
        }}>
            <View>
                <Text style={styles.heading}> Wagwan {username}</Text>
                <Text style={styles.text}> Day {day}</Text>
                <Text style={styles.text}> Week {week}</Text>
                <Text style={styles.text}> UserID {userId}</Text>
            </View>
                <View
            >
           <View style={{paddingTop:32,alignItems:'center'}}>
           <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('DailyWorkoutView')}
                    >
                        <Text style={styles.text}>Daily Workout</Text>
                    </Pressable>
           </View>
           <View style={{paddingTop:32,alignItems:'center'}}>
           <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('HistoricalWorkoutView')}
                    >
                        <Text style={styles.text}>Historical Workout View</Text>
                    </Pressable>
           </View>
           <View style={{paddingTop:32,alignItems:'center'}}>
           <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('Login Form')}
                    >
                        <Text style={styles.text}>Logout</Text>
                    </Pressable>
           </View>
           <Pressable
                        style={styles.button}
                        onPress={() => axios.post(url + 'user/update/', JSON.stringify(userId), {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(data => {
                            dispatch(setDay(data.data.day))
                            dispatch(setWeek(data.data.week))
                        })}
                    >
                        <Text style={styles.text}>Finish Workout</Text>
                    </Pressable>
           </View>    
        </View>     
    
    )
}   


const styles = StyleSheet.create({
    text: {
        color: "black",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        paddingVertical: 5
    },
    heading: {
        fontSize: 60,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
        textAlign:'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth:3,
        elevation: 3,
        backgroundColor: '#5A5A5A',
        width:'50%'
    },
    container: {
        backgroundColor: 'grey',
        flex: 1
    }
})