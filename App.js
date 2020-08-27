import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Contants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Title } from 'react-native-paper';

const Stack = createStackNavigator();
const myoptions = {
    title: "Home",
    headerTintColor:"white",
    headerStyle:{
    backgroundColor:"#006aff"
  }
}

 function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
          name="Home" 
          component={Home}
          options={myoptions}
          />
          <Stack.Screen name="Create" component={CreateEmployee} options={{...myoptions,title:"Create Employee"}}/>
          <Stack.Screen name="Profile" component={Profile} options={{...myoptions,title:"Profile"}}/>
        </Stack.Navigator>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop:Contants.statusBarHeight,
  },
});
