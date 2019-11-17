/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {Dimensions ,AsyncStorage} from "react-native";
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import AddFactureComponents from './Components/Home/AddFactureComponents';
import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen';
import MainScreen from './Components/Home/MainScreen';
import HomeComponent from './Components/Home/HomeComponent';
import drawerContentComponents from './Components/Home/drawerContentComponents';
import FactureComponents from './Components/Home/FactureComponents';
import GroupsComponents from './Components/Home/GroupsComponents';
import EditFactureComponents from './Components/Home/EditFactureComponents' ;
import SettingsComponents from './Components/Home/SettingsComponents' ;
import AddGroupComponents from './Components/Home/AddGroupComponents';
import FactureGroupComponents from './Components/Home/FactureGroupComponents' ; 
import AddUserComponenets from './Components/Home/AddUserComponenets';
var    {width} = Dimensions.get('window');

const DrawerNavigator = createDrawerNavigator(
    {
      Home:HomeComponent,
      Facture : FactureComponents,
      Login : LoginScreen,
      groups : GroupsComponents,
      Settings : SettingsComponents,
      AddFacture : AddFactureComponents,
      EditFacture : EditFactureComponents,
      AddGroup : AddGroupComponents,
      FactureGroup : FactureGroupComponents,
      AddUser : AddUserComponenets
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


const Router = createStackNavigator({
    
  Login : LoginScreen,
  Register : RegisterScreen ,
  Home : MainScreen,
 
 }, {headerMode: 'none'});
const Root = createAppContainer(Router);
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result : null,
    }
  }

  componentDidMount = async() => {
    let user = await AsyncStorage.getItem('UserSession');
    this.setState({
      result : user
    })
    console.log("here in check session " + user);
    
    
  }

  render (){

  
    if(this.state.result !== null ){
      return  <Home/>;
    }else {
      return <Root/> ; 
    }
  
  }
}
