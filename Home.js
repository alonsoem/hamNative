import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,View} from 'react-native';


export default function Home({ navigation }){

    return (
    <View style={styles.container}>
        <WebView
          style={styles.container}
          source={{ uri: 'https://ham.qrits.com.ar/v2' }}
        />
        
      </View>
    );
}  

const styles = StyleSheet.create({
    container: {
      height:'100%',
    },
}) ;