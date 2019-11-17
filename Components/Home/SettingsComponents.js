import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,ScrollView,AsyncStorage
  } from 'react-native';
import {  Icon,ListItem,Left,Button,Body,Right,Switch,Content

} from "native-base";
import ImagePicker from 'react-native-image-picker';
import HeaderComponent from './HeaderComponent';
import { PricingCard } from 'react-native-elements';
const backgroundColor = '#CDCDCD';
const options = {
  title: 'Select Photo',
  takePhotoButtonTitle : 'take a photo' , 
  chooseFromLibraryButtonTitle : 'Choose from gallery',
  quality : 1

};
export default class SettingsComponents extends Component {
  constructor(){
    super() ; 
    this.state = {
      imageSource : null,
      id :'', 
      name : ''
    }
  }
  componentWillMount = async () => {
    try {
      let result = await AsyncStorage.getItem("UserSession");

      if (result) {
        let UserInfo = JSON.parse(result);
        this.setState({
          id: UserInfo.id
        });
        fetch("http://192.168.1.100:80/misGastos/api/Users/read_single.php?id="+this.state.id, {
        
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              imageSource: responseJson.image,
              name : responseJson.name
             
            });
           
            
          })
          .catch(error => {
            console.error(error);
          });

        console.log(this.state.id);
      } else {
        alert("no user");
      }
    } catch (error) {
      alert(error);
    }
 
   
  }
  SelectPhoto () {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          imageSource: response,
        });
      }
    });
  }
  uploadImage(){
    const data = new FormData();
    console.log(this.state.imageSource.uri);
    console.log(this.state.imageSource.type);
    console.log(this.state.imageSource.fileName);
    
    data.append('fileToUpload', {
      uri : this.state.imageSource.uri,
      type: this.state.imageSource.type,
      name: this.state.imageSource.fileName,
     
     });
     data.append('id',  this.state.id);
     console.log(data);
    //https://articles.free.beeceptor.com/upload_file
    //http://web001.fogits.com:8000/api/prediction/check_prediction/
    //http://192.168.0.14:8000/upload/

    const url = "http://192.168.1.100:80/misGastos/api/Users/image.php";
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body:data
    })
   
    .then(response => {
     
      console.log(response);
    })
    .catch(error => console.error("Error:", error));


  }
  render() {
   
    return (
        <View style={{
            flex : 1 , 
            flexDirection : 'column'
        }}>
       <HeaderComponent {...this.props} name={"Settings"} />
        <View style={{
            flex : 1 ,
            //backgroundColor : backgroundColor , 
            
        }}>
              <ScrollView>
            <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={
            this.state.imageSource != null ? {uri: 'http://192.168.1.100/misGastos/api/Users/'+this.state.imageSource} : 
            require('../../icon/ceo.png')
          }/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
            
              <Icon name='camera' />
              <TouchableOpacity
              onPress={this.SelectPhoto.bind(this)}
              >
              
            
              <Text style={styles.info} >  Changer votre photo de profile </Text>
              </TouchableOpacity >
              <TouchableOpacity
              onPress={this.uploadImage.bind(this)}
              >
              
            
              <Text style={styles.info} >  Save </Text>
              </TouchableOpacity >
           
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                         
              
              
              
        
            </View>
        </View>
      </View>
      <PricingCard
  color="#4f9deb"
  title="Free"
  price="$0"
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
/>
<PricingCard
  color="#4f9deb"
  title="Free"
  price="$0"
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
/>
      </ScrollView>
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });
   
