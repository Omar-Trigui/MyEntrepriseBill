import React, { Component } from "react";

import {  View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header} from 'react-native-elements';

export default class HeaderComponent extends Component {
  constructor() {
    super();

    
  }
  render() {
    
    return (
      <View>
         
      <Header
        containerStyle={styles.headerContainer}
        placement="center"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.openDrawer, }}
        centerComponent={{ text: this.props.name, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />


      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.select({
        android: 56,
        default: 44,
      }),
      paddingTop: 0,
  },
});