import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,TextInput,View,Text,Button,TouchableOpacity,Image,BackHandler} from 'react-native';
import Constants from 'expo-constants';

import { useEffect, useState ,useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'




export default function LdaProperties({navigation}) {
  const [ldaUser, setldaUser] = useState("");
  const [ldaCallsign, setldaCallsign] = useState("");
  const [ldaSecret, setLdaSecret] = useState("");
  
  var timerId=useRef(null);
  


  useEffect(() => {
//    _storeData('notepad-data',text);
    _retrieveData('lda-user').then (val => setldaUser((!val?"":val)));
    _retrieveData('lda-callsign').then(val => {setldaCallsign(!val?"":val)});
    _retrieveData('lda-secret').then(val => {setLdaSecret(!val?'':val)});
    
    }, [])

    
  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value
      }else{
        return null
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(
        key,
        String(value)
      );
    } catch (error) {
      // Error saving data
      alert("ERROR SAVING" + error);
    }
  };
  
  const saveAll=()=>{
    _storeData('lda-user',ldaUser);
    _storeData('lda-callsign',ldaCallsign);
    _storeData('lda-secret',ldaSecret);
    goBack();
  }

  const goBack=()=>{
    navigation.goBack()
  }

  
  
  


  return (
    <View style={[styles.container,{flexDirection: 'column'}]}>
      <View style={styles.header}>
          <Text>Somos Radioaficionados</Text>
      </View>
      <View style={styles.subHeader}>
          <Text>Datos Log de Argentina</Text>
      </View>

      <View style={styles.body}>
       

        <TextInput
        
        style={ [styles.input]}
        
        onChangeText={value => setldaCallsign(value)}
        value={ldaCallsign}
        
         />
        <TextInput
        
        style={ [ styles.input]}
        
        onChangeText={value => setldaUser(value)}
        value={ldaUser}
        placeholder=""
         />

        <TextInput
        
        style={ [ styles.input]}
        
        onChangeText={value => setLdaSecret(value)}
        value={ldaSecret}
        
         />


      </View>

      <View style={styles.line2}>
          <View style={styles.halfAndHalf}>
            <Button title="Guardar"  onPress={saveAll} color='green' >Guardar</Button>
          </View>
          <View style={styles.halfAndHalf}>
            <Button title="Volver"  onPress={goBack} color='red'>Volver</Button>
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    marginTop: Constants.statusBarHeight,
    backgroundColor:'#b8c0b1',
    flex:10.5
  },
  
  header:{ flex:0.5,backgroundColor:'white',textAlign:'center',  alignItems: "center"},
  
  subHeader:{ flex:0.5,backgroundColor:'green',textAlign:'center',  alignItems: "center"},
  
  body:{flex:9},
  

  line2:{color:'green',width:'100%',padding:4,flexWrap: 'wrap',flexDirection:'row'},
  
  halfAndHalf:{width:'50%',padding:2,height:'100%'},
  buttonBottom:{width:'100%',color:'green'},

  buttonN:{width:'50%'},
  input: {
    backgroundColor:'white',
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },

}) ;