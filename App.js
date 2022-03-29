import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ApodScreen from './screens/ApodScreen';
import MarsRover from './screens/MarsRover';
import { TouchableOpacity } from 'react-native-web';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#000C15',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Apod" component={ApodScreen}  options={{
          headerShown:true,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#000C15',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  />
        <Stack.Screen name="MarsRover" component={MarsRover}  options={{
          headerTitle:'Mars Rover Images',
          headerShown:true,
          headerStyle: {
            backgroundColor: '#000C15',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle:{
    
  }
});