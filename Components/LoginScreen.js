import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,AsyncStorage
} from "react-native";

let mainColor = "#00adef";
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
   
  };
  constructor(props) {
    super(props);

    this.state = {
      UserEmail: "",
      UserPassword: "",
      user : {
        id : '',
        name : '' , 
        email :'' ,
        password :'',
        role :'' , 
        group_id :''
      }
    };
  }


  handleLogin = () => {
    
    //this.props.navigation.navigate('Home');
   
    fetch("http://192.168.1.100:80/misGastos/api/Users/login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.UserEmail,

        password: this.state.UserPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          console.log(responseJson);
          
          try {
            const value =  AsyncStorage.getItem('UserSession');
            if (value !== null) {
              // We have data!!
              AsyncStorage.removeItem('UserSession');
   
            }
              AsyncStorage.setItem('UserSession', JSON.stringify(responseJson[0]));
             this.props.navigation.navigate('Home');
            
             
          } catch (error) {
            alert("error while saving data");
          }

          //Then open Profile activity and send user email to profile activity.
         
          
        } else {
          alert("No user found");
         
        }
      })
      .catch(error => {
        console.error(error);
      });

      
  };
  render() {
    console.disableYellowBox = true;
    return (
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#F4F4F4"
      }}>
     <View
          style={{
            flex: 0.35,
            backgroundColor: mainColor,
            borderBottomLeftRadius: 80,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <View style={styles.Logo}>
            <Image
              style={styles.stretch}
              source={require("../icon/blue.png")}
            />
          </View>
        </View>
      <View style={{ flex: 0.65 }}>
        <TextInput
           onChangeText={UserEmail => this.setState({UserEmail})}
          // Adding hint in Text Input using Place holder.
          placeholder='Email'
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
          // Calling the custom TextInputStyleClass.
          style={styles.TextInputStyleClass}
        />
        <TextInput
         onChangeText={UserPassword => this.setState({UserPassword})}
          // Adding hint in Text Input using Place holder.
          placeholder='Mot de passe'
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
          // Calling the custom TextInputStyleClass.
          secureTextEntry={true}
          style={styles.TextInputStyleClass}
        />
        <Text style={styles.textPassword}>Mot de passe oublié ?</Text>

        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.5}
          onPress={this.ButtonClickCheckFunction}>
          <Text style={styles.TextStyle}  onPress={this.handleLogin}> S'identifier </Text>
        </TouchableOpacity>

        <Text style={{ paddingLeft: "25%", marginTop: "19%" }} onPress={() => this.props.navigation.navigate('Register')}>
          vous n'avez pas de compte ?
          <Text style={{ color: mainColor, }}>{""} Registre</Text>
        </Text>
      </View>
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
    backgroundColor: mainColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff"
  },
  text: {
    justifyContent: "center",
    alignItems: "center"
  },
  textPassword: {
    paddingTop: 15,
    paddingLeft: "55%"
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
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
    marginLeft: 10,
    width: "80%",
    height: "8%",
    resizeMode: "contain"
  }
});
export default LoginScreen;
