import * as React from 'react';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { WebView } from 'react-native-webview';
import { StyleSheet,Stack,View,Text,Button,TouchableOpacity,Image} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Notepad from './Notepad.js';
import LDA from './LDA.js';
import Home from './Home.js';
import LDAPROPS from './ldaProperties.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { useNavigation } from '@react-navigation/native'; 





export default function RootApp({ navigation }){
    const Tab = createBottomTabNavigator(); 
    

  
return (
  
  
   <Tab.Navigator
   
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let imageName ;
         
          //iconName = focused ? 'ios-list' : 'ios-list-outline';
          
          switch(route.name){
            case "Notas":
              imageName=require('./assets/notepad2.png');
              break;
            case 'Inicio':
              imageName=require('./assets/home.png');
              break;
            case 'Log De Argentina':
              imageName=require('./assets/lda_38t.png');

          }        
          
          return <Image 
                source={imageName} 
                style={styles.ImageIconStyle} 
            />;
          }
        ,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        
      })}
    >
    
      <Tab.Screen name="Inicio" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Notas" component={Notepad} options={{ headerShown: false }}/>
      <Tab.Screen name="Log De Argentina" component={LDA} options={{ headerShown: false }}/>
    
    </Tab.Navigator>
  
  
  
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