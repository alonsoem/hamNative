import * as React from 'react';
import {useState,useEffect} from 'react';
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
import { format, setDate } from 'date-fns';

import {PixelRatio} from 'react-native';





export default function RootApp({ navigation }){
    const Tab = createBottomTabNavigator(); 
    
    var newDateTime = new Date();
    newDateTime.setDate(newDateTime.getUTCDate());
    newDateTime.setMonth(newDateTime.getUTCMonth());
    newDateTime.setFullYear(newDateTime.getUTCFullYear());
    newDateTime.setHours(newDateTime.getUTCHours());
    

    const fontScale = PixelRatio.getFontScale();
    const getFontSize = size => size / fontScale;

    const [dateTime, setDateTime] = useState(newDateTime);
    const [intervalHook, setIntervalHook] = useState(null);
    
      startTimer = () => {
  
        setIntervalHook(setInterval(() => {
          
          var date=new Date();
          date.setDate(date.getUTCDate());
          date.setMonth(date.getUTCMonth());
          date.setFullYear(date.getUTCFullYear());
          date.setHours(date.getUTCHours());
          
          setDateTime(date);
        }, 1000)
        );
  
      };
  
      useEffect(() => {
          startTimer()
           
            }, []
        )
      
  
return (
  
  <View style={styles.container}>
      <View style={styles.header,{display:'flex',flexDirection: 'row',width:'100%',justifyContent:'space-between',alignContent:'center',flexWrap:'wrap',padding:'0.8%'}}>
        
      <View style={styles.subHeaderDate,{fontSize: getFontSize(12)}}>
          <Text>{format(dateTime,"dd-MM-yyyy")}</Text>
        </View>

        <View style={styles.subHeaderTitle,{fontSize: getFontSize(12)}}>
          <Text style={styles.subHeaderTitleFont}>Somos Radioaficionados</Text>
        </View>

        <View style={styles.subHeaderTime,{fontSize: getFontSize(12)}}>
          <Text>UTC {format(dateTime,"HH:mm:ss")}</Text>
        </View>
          
      </View>
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
    </View>
  
  
  
);

    }

    
const styles = StyleSheet.create({

  container: {
    height:'100%',
    flexDirection:'column',
    flex:9.5,
  },
  showContainer: {
    height:'90%',
    flex:9,
    
  },
  header:{ height:'5%'},
  subHeaderTitle:{height:'100%', width:'50%',alignItems:'center',justifyContent: 'center'},
  subHeaderTitleFont:{fontWeight:'bold'},
  subHeaderDate:{height:'100%', width:'25%',justifyContent: 'center',padding:'1%'},

  
  subHeaderTime:{height:'100%', width:'25%',justifyContent: 'center',padding:'1%',backgroundColor:'red'},




    
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