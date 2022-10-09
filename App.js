import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Transitioning } from 'react-native-reanimated';
import DailyWorkoutView from './Components/DailyWorkoutView/DailyWorkoutView';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginForm from './Components/LoginPage/LoginForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store';
import { Provider } from 'react-redux'

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
          component={DailyWorkoutView}
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
