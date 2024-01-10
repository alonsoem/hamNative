import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,View,Text,Button,TouchableOpacity,Image,TextInput, Alert} from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState ,useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {postQSOLA} from './api.js';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
//const [placeHolder, setPlaceHolder] = useState("Seleccione una opción");
import { format } from 'date-fns';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LdaProperties from './ldaProperties.js'

import AsyncStorage from '@react-native-async-storage/async-storage'

import DropdownComponent from './dropdown.js';

import DateTimePicker from '@react-native-community/datetimepicker';



export default function LDA({navigation}) {
  const { control, handleSubmit } = useForm();

  var dateTime = new Date();
  const [date, setDate] = useState(dateTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(dateTime);
  const [callsign, setCallsign] = useState("");
  const [band, setBand] = useState("");
  const [mode, setMode] = useState("");
  const [rst, setRst] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [ldaUser, setldaUser] = useState("");
  const [ldaCallsign, setldaCallsign] = useState("");
  const [ldaSecret, setLdaSecret] = useState("");
 

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

  const onSubmit = () => {
    
    let collection={}
    collection.fecha=format(date,"yyyyMMdd");
    collection.hora=format(time,"HHmm");
    collection.sucall=callsign;
    collection.banda=band;
    collection.modo=mode;
    collection.rst=rst
    collection.x_qslMSG=message;

    //set hora y dia correcto utc por defecto
    //pantalla de registro de call, user y clave(encriptada)
    collection.micall=ldaCallsign;
    collection.user=ldaUser;
    collection.pass=ldaSecret;
    
    console.log(collection);

    var errors = [];

    
    if (band==""){
      errors.push("band");
    }
    if (mode==""){
      errors.push("mode");
    }
    if (rst==""){
      errors.push("rst");
    }
    if (callsign==""){
      errors.push("callsign");
    }
    
    if (rst==""){
      errors.push("rst");
    }
    setErrors(errors);
    
    if (errors.length > 0) {
        return false;  
    } else {
      
        submit(collection);
    }
  };

  const submit = (data) =>{
    postQSOLA(data)
			.then(res=>	{
              console.log("RESPUESTA LDA");	
							console.log(res);			
              showAlert("Log de Argentina dice:",res.fullMessage);
              resetAndClose()
							
			  }
			)
			.catch( res=>{
        console.log("ERROR LDA");			
        if( res.response ){
          console.log(res.response.data); // => the response payload 
          showAlert("Log de Argentina dice: "+JSON.parse(JSON.stringify(res.response.data)).error,JSON.parse(JSON.stringify(res.response.data)).fullMessage);
        }else{
          showAlert("ERROR","ERROR DE COMUNICACIÓN");
        }

      }
      );
  }

  const resetAndClose=()=>{

    setDate(dateTime);
    setTime(dateTime);
    setCallsign("");
    setBand("");
    setMode("");
    setRst("");
    setMessage("");
    setErrors([]);
    navigation.navigate('Inicio', {});

  }

 

  const onErrors = errors => {
    console.error("ON ERROR");
    console.error(errors);
  }


  const showAlert = (title,message) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Aceptar',
        style: 'cancel',
      },
    ],
   
  );
  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    
  };
  
  const handleChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
    
  };

  const handleChangeCallsign = (value) =>{
    setCallsign(value);
  }
  const handleChangeBand = (value) =>{
    setBand(value);
  }
  const handleChangeMode = (value) =>{
    setMode(value);
  }
  const handleChangeRst = (value) =>{
    setRst(value);
  }
  const handleChangeMessage = (value) =>{
    setMessage(value);
  }

  const modes = [
    { label: 'CW', value: 'cw' },
    { label: 'AM', value: 'am' },
    { label: 'SSB', value: 'ssb' },
    { label: 'ATV', value: 'atv' },
    { label: 'SSTV', value: 'sstv' },
    { label: 'PACKET', value: 'PACKET' },
    { label: 'FM', value: 'FM' },
    { label: 'FT 8', value: 'FT8' },
    { label: 'PSK', value: 'PSK' },
    { label: 'JT9', value: 'JT9' },
    { label: 'OLIVIA', value: 'OLIVIA' },
    { label: 'Hecho', value: 'ECHO' },
    { label: 'JT65', value: 'JT65' },
    { label: 'HELL', value: 'HELL' },
    { label: 'FAX', value: 'FAX' },
    { label: 'DV', value: 'DV' },
    { label: 'Sat CW', value: 'SATCW' },
    { label: 'Sat FM', value: 'SATFM' },
    { label: 'Sat SSB', value: 'SATSSB' },
    { label: 'SIM31', value: 'SIM31' },
  
  ];

  //Seleccione una Banda, 160m, 80m, 40m, 30m, 20m, 17m, 15m, 12m,10m, 6M, 2M, 1.2M, 70cm, VOIP
  const bands = [
    { label: '160m', value: '160m' },
    { label: '80m', value: '80m' },
    { label: '40m', value: '40m' },
    { label: '30m', value: '30m' },
    { label: '20m', value: '20m' },
    { label: '17m', value: '17m' },
    { label: '15m', value: '15m' },
    { label: '12m', value: '12m' },
    { label: '10m', value: '10m' },
    { label: '6M', value: '6M' },
    { label: '2M', value: '2M' },
    { label: '1.2M', value: '1.2M' },
    { label: '70cm', value: '70cm' },
    { label: 'VOIP', value: 'VOIP' },
    
    
  ];

  const viewDatePicker = () =>{
    setShowDatePicker(true);
  }
  const viewTimePicker = () =>{
    setShowTimePicker(true);
  }

  const postForm = () => {
    console.log("enviada");

  }
  const hasError= (key) => {
    return errors.indexOf(key) !== -1;
  }

  const navToConfig = () =>{
    navigation.navigate('LdaProperties', {});
  }
  

  return (
    <View style={[styles.container,{flexDirection: 'column'}]}>
      <View style={styles.header}>
          <Text>Somos Radioaficionados</Text>
      </View>
      <View style={styles.subHeader}>
          <Text>Log De Argentina</Text>
      </View>

      
      <View style={styles.body}>

      <View style={styles.dateTime}>

        
          <Button title={date.toDateString()}  onPress={viewDatePicker}/>
         

      
        {showDatePicker &&
        <DateTimePicker 
          id="date"
          name="date"
          title={'Elija una fecha'}
          mode="date" 
          value={date} 
          display="spinner"
          
          onChange={handleChangeDate}
          
          
        />
        }

        
      </View>

      <View style={styles.dateTime}>
      
      <Button title={time.toLocaleTimeString()}  onPress={viewTimePicker}/>
        
       {showTimePicker &&
       <DateTimePicker 
          id="time"
          name="time"
          title={'Elija una hora'}
          mode="time" 
          value={time} 
          display="clock"
          
          onChange={handleChangeTime}
          
          
        />
       }
            
      </View>
      


      <View style={styles.line}>
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bands}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecciona una banda"
            searchPlaceholder="Selecciona una banda"
            value={band}
            onChange={item => {
              setBand(item.value);
            }}
            
          />
           {(hasError("band") 
            ? <Text style={styles.errorStyle} >
                  Falta seleccionar una banda
              </Text>
            : null)}
        
      </View>

      <View style={styles.line}>
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={modes}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecciona un modo"
            searchPlaceholder="Selecciona un modo"
            value={mode}
            onChange={item => {
              setMode(item.value);
            }}
        
          />
           {(hasError("mode") 
            ? <Text style={styles.errorStyle} >
                  Falta seleccionar un modo
              </Text>
            : null)}
      </View>

      <View style={styles.line}>
        <TextInput
          style={ [{fontSize: 10}, styles.input]}
          onChangeText={value => handleChangeCallsign(value)}
          value={callsign}
          placeholder="Una señal distintiva..."
          
        />
        {(hasError("callsign") 
            ? <Text style={styles.errorStyle} >
                  Falta una señal distintiva válida
              </Text>
            : null)}
        
      </View>
      
      <View style={styles.line}>
        <TextInput
          style={ [{fontSize: 10}, styles.input]}
          onChangeText={value => handleChangeRst(value)}
          value={rst}
          placeholder="Señales RST..."
          
        />
         {(hasError("rst") 
            ? <Text style={styles.errorStyle} >
                  Falta un reporte de señales RST
              </Text>
            : null)}
      </View>

      <View style={styles.line}>
        <TextInput
          style={ [{fontSize: 10}, styles.input]}
          onChangeText={value => handleChangeMessage(value)}
          value={message}
          placeholder="un mensaje..."
          
        />
      </View>


      </View>
  

      <View style={styles.footer}>
          <View style={styles.threeOfFour}>
              <Button title="ENVIAR QSO" onPress={handleSubmit(onSubmit,onErrors)} color='green'>ENVIAR</Button>
          </View>
          <View style={styles.oneOfFour}>
              <Button title="CUENTA" onPress={navToConfig} color='gray' />
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: Constants.statusBarHeight,
      backgroundColor:'#b8c0b1',
      flex:11,
  },
  body:{flex:9},

  dateTime:{  textAlignVertical:'top',
  
  
  
  padding: 6},
  header:{ flex:0.5,backgroundColor:'white',textAlign:'center',  alignItems: "center"},
  subHeader:{ flex:0.5,backgroundColor:'green',textAlign:'center',  alignItems: "center"},
  
  footer:{flexDirection: 'row' ,flexWrap: 'wrap',  alignItems: 'center' ,padding:2, margin:5, verticalAlign:'bottom'},

  button:{height:'100%'},
  threeOfFour:{width:'75%',padding:2,height:'100%',verticalAlign:'bottom'},
  oneOfFour:{width:'25%',padding:2,height:'100%'},

  errorStyle:{color:'red'},
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
 input: {
  textAlignVertical:'top',
  backgroundColor:'white',
  margin: 5,
  borderWidth: 1,
  padding: 10,
},


  dropdown: {
    margin: 5,
    height: 50,
    borderColor:'black',
    borderWidth:1,
    //borderBottomColor: 'gray',
    
    //borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
    
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

