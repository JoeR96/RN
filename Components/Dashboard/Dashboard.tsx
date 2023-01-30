import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { url } from "../Utilities/UseAxios";

import axios from "axios";
import {
  setDay,
  setWeek,
  setWorkout,
  setWorkoutIsSet,
} from "../Utilities/userSlice";
export default ({ navigation }) => {
  const day = useSelector((state: RootState) => state.user.day);
  const week = useSelector((state: RootState) => state.user.week);
  const userId = useSelector((state: RootState) => state.user.userId);
  const username = useSelector((state: RootState) => state.user.username);
  const userUrl =
    "workout-creation/" + userId + "/" + week + "/" + day + "/" + "false";
  const workoutIsSet = useSelector(
    (state: RootState) => state.user.workoutIsSet
  );
  const dispatch = useDispatch();
  const [trigger, setTrigger] = React.useState(0);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    if (workoutIsSet) {
      getWorkout();
    }

    //wtf is going on with the structure of the api response lol.
    //this will be fixed with a typescript upgrade
    async function getWorkout() {
      const response = await axios.get(url + userUrl);
      const tt = await response;
      const { data } = tt;
      const { Data } = data;
      const { Exercises } = Data;
      dispatch(setWorkout(Exercises));
      dispatch(setWorkoutIsSet(true));
    }
  }, []);
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    getWorkout();


    //wtf is going on with the structure of the api response lol.
    //this will be fixed with a typescript upgrade
    async function getWorkout() {
      const response = await axios.get(url + userUrl);
      const tt = await response;
      const { data } = tt;
      const { Data } = data;
      const { Exercises } = Data;
      dispatch(setWorkout(Exercises));
      dispatch(setWorkoutIsSet(true));
    }
  }, [trigger]);
  return (
    <View style={styles.PressableContainer}>
      <View style={{height:'25%'}}>
        <Text style={styles.heading}> Wagwan {username}</Text>
      </View>
      <View style={{ height: '25%' }}>
        <Text style={styles.text}> Day {day}</Text>
        <Text style={styles.text}> Week {week}</Text>
        <Text style={styles.text}> UserID {userId}</Text>
      </View>

      <View style={{ height: '50%' }}>
        <Pressable
          style={styles.button}
          onPress={() => setTrigger(1)}
        >
          <Text style={styles.pressableText}>Get Workout</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("DailyWorkoutView")}
        >
          <Text style={styles.pressableText}>Daily Workout</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("HistoricalWorkoutView")}
        >
          <Text style={styles.pressableText}>Historical Workout View</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login Form")}
        >
          <Text style={styles.pressableText}>Logout</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button }}
          onPress={() =>
            axios
              .post(url + "user/update/", JSON.stringify(userId), {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((data) => {
                dispatch(setDay(data.data.day));
                dispatch(setWeek(data.data.week));
              })
          }
        >
          <Text style={styles.pressableText}>Finish Workout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PressableContainer: { flexDirection: 'column', justifyContent: 'space-between',backgroundColor:'#303234' },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 5,
  },
  pressableText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 5,
  },
  heading: {
    fontSize: 60,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
    textAlign: "center",
    color: 'white',
    paddingTop:48
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#999999',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },

  container: {
    backgroundColor: "grey",
  },
});
