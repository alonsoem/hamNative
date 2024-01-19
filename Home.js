import * as React from 'react';
import {useState,useEffect} from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,View,Text} from 'react-native';
import Constants from 'expo-constants';

import { format, setDate } from 'date-fns';

export default function Home({ navigation }){
  
 
    return (
    <View style={styles.container}>
       
     
        <WebView
          style={styles.showContainer}
          source={{ uri: 'https://ham.qrits.com.ar/' }}
        />
        
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
    header:{ height:'5%',flexDirection: 'row'},
    subHeaderTitle:{height:'100%', width:'50%',alignItems:'center',justifyContent: 'center'},
    subHeaderTitleFont:{fontWeight:'bold'},
    subHeaderDate:{height:'100%',width:'25%',justifyContent: 'center',alignItems:'flex-start',padding:'1%'},
    subHeaderTime:{height:'100%',width:'25%',justifyContent: 'center',alignItems:'flex-end',padding:'1%'},

}) ;