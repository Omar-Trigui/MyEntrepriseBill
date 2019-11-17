import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer} from 'react-navigation';


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,Dimensions,
  } from 'react-native';
import HomeComponent from './HomeComponent';
import drawerContentComponents from './drawerContentComponents';
import FactureComponents from './FactureComponents';
import GroupsComponents from './GroupsComponents';
import LoginScreen from '../LoginScreen';
import SettingsComponents from './SettingsComponents' ;
var {height, width} = Dimensions.get('window');
const backgroundColor = '#0067a7';
const DrawerNavigator = createDrawerNavigator(
    {
      Home:HomeComponent,
      Facture : FactureComponents,
      Login : LoginScreen,
      groups : GroupsComponents,
      Settings : SettingsComponents
    },
    {
       
      drawerWidth : width / 1.5 ,
      drawerPosition : 'left' , 
      drawerOpenRoute : 'DrawerOpen' , 
      DrawerCloseRoute : 'DrawerClose' , 
      DrawerToggleRoute : 'DrawerToggle',
      ContentOptions : {
          activeTintColor : 'red'
      },
      contentComponent: drawerContentComponents,
    }
  );
  
const Home = createAppContainer(DrawerNavigator);
class MainScreen extends Component {
 static navigationOptions = {
        title: "Home",
       
  };
  render() {
  
    return (
        <Home/>
    );
  }
}

export default MainScreen;
