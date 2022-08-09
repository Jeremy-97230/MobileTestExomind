import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import views
import HomeScreen from '../views/Home'
import WeatherScreen from '../views/Weather'

const Stack = createNativeStackNavigator();

const route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default route