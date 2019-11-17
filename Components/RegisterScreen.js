import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from "react-native";
import { Button,ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
let mainColor = "#00adef";
const theme = {
  Button: {
    raised: true,
  },
};

class RegisterScreen extends React.Component {

  static navigationOptions = {
    title: "Register",
};
  state = {
    roles: '',
    name : '',
    lastName :'',
    Password : '',
    Email:'',
    DefaultRole : '0'
  };

  Register = () => {

    fetch("http://192.168.1.100:80/misGastos/api/Users/create.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name : this.state.name + " " +  this.state.lastName,
        email: this.state.Email,
        password: this.state.Password,
        role:this.state.roles
      })
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson) {
          this.props.navigation.navigate('Login')
        } else {
          alert("false");
          alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
    
  }


  render() {
    console.disableYellowBox = true;
    return (
      
     
      <View style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#F4F4F4"
      }}>
            <TextInput
            onChangeText={(name) => this.setState({name})}
            // Adding hint in Text Input using Place holder.
            placeholder='Votre Nom'
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            // Calling the custom TextInputStyleClass.
            style={styles.TextInputStyleClass}
          />
          <TextInput
            onChangeText={(lastName) => this.setState({lastName})}
            // Adding hint in Text Input using Place holder.
            placeholder='Votre Prenom'
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            // Calling the custom TextInputStyleClass.
            style={styles.TextInputStyleClass}
          />
        
           <TextInput
            onChangeText={(Email) => this.setState({Email})}
            value={this.state.Email}
            // Adding hint in Text Input using Place holder.
            placeholder='Email'
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            // Calling the custom TextInputStyleClass.
            style={styles.TextInputStyleClass}
          />

         <TextInput
            onChangeText={(Password) => this.setState({Password})}
            value={this.state.Password}
            // Adding hint in Text Input using Place holder.
            placeholder='Mot de pass'
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            // Calling the custom TextInputStyleClass.
            secureTextEntry={true}
            style={styles.TextInputStyleClass}
          />

      
         <Picker style={styles.Picker}
         selectedValue={this.state.DefaultRole}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              roles: itemValue,
              DefaultRole:itemValue
              
            })
          }>
          <Picker.Item label='veuillez sélectionner une option...' value='0' />
          <Picker.Item label="je suis un professionelle" value="1" />
          
          <Picker.Item label="je suis un expert" value="2" />
          <Picker.Item label="je suis un particulier" value="3" />
        </Picker>

           <TouchableOpacity
            
            style={[styles.SubmitButtonStyle, {backgroundColor: 'red'}]}
            activeOpacity={0.5}
            disabled={true}
            onPress={this.Register}>
            <Text style={styles.TextStyle} > Registre </Text>
          </TouchableOpacity>
          {/* <ThemeProvider theme={theme}>
          <Button
            title="Solid Button"
            disabled= 'True'

            
          />
          </ThemeProvider> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SubmitButtonStyle: {
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff"
  },
  text: {
    justifyContent: "center",
    alignItems: "center"
  },
  textPassword: {
    paddingTop: 10,
    paddingLeft: "60%"
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  Picker:{
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
    textAlign: "center",
    marginTop: 50,
    marginLeft: 30,
    height: 50,
    width: "85%",
    borderBottomWidth: 0,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF"
    
  },
  TextInputStyleClass: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
    textAlign: "center",
    marginTop: 30,
    marginLeft: 30,
    height: 50,
    width: "85%",
    borderBottomWidth: 0,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  },
  Logo: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "white"
  },
  stretch: {
    flex: 1,
    marginLeft: 30,
    width: "50%",
    height: "50%",
    resizeMode: "contain"
  }
});
export default RegisterScreen;
