import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet,View,Text,Button,TouchableOpacity,Image} from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Notepad from './Notepad.js';
import LDA from './LDA.js';
import Home from './Home.js';
import RootApp from './RootApp.js';
import LdaProps from './ldaProperties.js'
import { NavigationContainer } from '@react-navigation/native';





export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="RootApp" component={RootApp} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
      <Stack.Screen name="LDA" component={LDA} options={{ headerShown: false }} />
      <Stack.Screen name="Notepad" component={Notepad} options={{ headerShown: false }} />
      <Stack.Screen name="LdaProperties" component={LdaProps} options={{ headerShown: false }} />
      
    </Stack.Navigator>
    </NavigationContainer>
  );
 
}



const styles = StyleSheet.create({
  container: {
    
    height:'100%',
    
  },
  
  footerButton:{ 
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: .5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5 ,
      margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
  
 },

}) ;