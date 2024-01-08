import React, { useState,useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

  const DropdownComponent = (props) => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [placeHolder, setPlaceHolder] = useState("Seleccione una opción");


    useEffect(() => {
                setData(props.values);
                setPlaceHolder(props.placeholder);
                
            
            }, [props.values]);


           
            

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeHolder}
        searchPlaceholder="Buscar..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="car" size={20} />
        )}
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
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