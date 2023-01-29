import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginForm from './Components/LoginPage/LoginForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import A2SHypertrophyExerciseForm from './Components/DailyWorkoutView/WorkoutTemplates/A2SHypertrophyExerciseForm';
import store from './store';
import { Provider } from 'react-redux'
import A2SSetsThenRepsExerciseForm from './Components/DailyWorkoutView/WorkoutTemplates/A2SSetsThenRepsExerciseForm';
import LinearProgressionForm from './Components/DailyWorkoutView/WorkoutTemplates/LinearProgressionForm';
import ExerciseAccordion from './Components/DailyWorkoutView/ExerciseAccordion';
import ExerciseAccordionHistorical from './Components/HistoricalWorkoutView/ExerciseAccordionHistorical';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator  >
        <Stack.Screen
          name="Login Form"
          component={LoginForm}
          options={{
            headerStyle: {
              backgroundColor: '#FF5733',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          
          name="Dashboard"
          component={Dashboard}
          options={{
            headerStyle: {
              backgroundColor: '#FF5733',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
          
        />
        <Stack.Screen
          name="DailyWorkoutView"
          component={ExerciseAccordion}
          options={{
            title: 'Daily Workout ',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="A2SHypertrophy"
          component={A2SHypertrophyExerciseForm}
          options={{
            title: 'A2S Hypertrophy Exercise ',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="A2SRepsThenSets"
          component={A2SSetsThenRepsExerciseForm}
          options={{
            title: 'A2S Reps Then Sets Exercise ',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="LinearProgression"
          component={LinearProgressionForm}
          options={{
            title: 'Linear Progression ',
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
         <Stack.Screen
          name="HistoricalWorkoutView"
          component={ExerciseAccordionHistorical}
          options={{
            title: 'Historical Workout View ',
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
      </NavigationContainer>    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
