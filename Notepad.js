import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,TextInput,View,Text,Button,TouchableOpacity,Image} from 'react-native';
import Constants from 'expo-constants';

import { useEffect, useState ,useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'




export default function Notepad() {
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(25);
  var timerId=useRef(null);
  


  useEffect(() => {
    _retrieveData('notepad-textSize').then (val => setTextSize((!val?1:Number(val))));
    _retrieveData('notepad-data').then(val => {setText(!val?'':String(val));
    console.log(val);
  }
    
    );
        
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
  
  const saveTextSize=()=>{
    
    _storeData('notepad-textSize',JSON.stringify(textSize));
  }

   const incrementTextSize =() =>{
    setTextSize(textSize+1);
    saveTextSize();

  }
   const decrementTextSize=()=> {
    setTextSize(textSize-1);
    saveTextSize();
  }
  
  const  saveText=()=>{
    //This function is executed after 300 milliseconds or 0.3 seconds
    
    _storeData('notepad-data',text);
    
    //timerId=null;
  }

  const handleSaveText=(text)=>{
    setText(text);  
    
     
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current=setTimeout(saveText,2000);
    
   
  }
  

  return (
    <View style={[styles.container,{flexDirection: 'column'}]}>
      
      <View style={styles.subHeader}>
          <Text>NOTAS</Text>
      </View>

      <View style={styles.body}>
        <TextInput
        multiline
        numberOfLines={200}
        style={ [{fontSize: textSize}, styles.input]}
        
        onChangeText={newText => handleSaveText(newText)}
        value={text}
        placeholder="Indique aqui lo que quiera"
      />
      </View>

      <View style={styles.line2}>
          <View style={styles.buttonN}>
          <Text>Tamaño del texto</Text>
          </View>
          <View style={{width:'50%',flexDirection: 'row-reverse'}} >
          <View style={styles.button}>
            <Button title="-" onPress={()=>decrementTextSize()} />
          </View>
          <View style={styles.button}>
            <Button title="+" onPress={()=>incrementTextSize()} />
          </View>
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#b8c0b1',
    //flex:11.5
    height:'100%',
    flex:100
  },
  
  subHeader:{ flex:4,heigth:'10%',backgroundColor:'green',textAlign:'center',  alignItems: "center",justifyContent: 'center'},
  body:{flex:90},
  line2:{flex:5,backgroundColor:'green',flexDirection: 'row', alignItems: 'flex-end' ,flexWrap: 'wrap', display: 'flex', alignItems: 'center' ,padding:10, margin:5},
  button:{height:'100%',padding:0,marginLeft:10,width:40},
  buttonN:{width:'50%'},
 input: {
  
  textAlignVertical:'top',
  backgroundColor:'white',
  margin: 5,
  borderWidth: 1,
  padding: 10,
},

}) ;