import {
    Text , View , Image , TouchableHighlight
} from 'react-native' ; 
import HeaderComponent from './HeaderComponent';
import React, { Component } from 'react';

const backgroundColor = '#0067a7';
export default class HomeCompnent extends Component {
   
  render() {
    return (
     <View style={{
         flex : 1 , 
         flexDirection : 'column'
     }}>
    <HeaderComponent {...this.props} />
     <View style={{
         flex : 1 ,
         backgroundColor : backgroundColor , 
         alignItems : 'center' , 
         justifyContent : 'center'
     }}>
         <Text style={{ fontWeight : 'bold' , fontSize : 22 , color : 'white'}}>
             This is Info Screen
         </Text>
      
     </View>
     </View>
    );
  }
}
