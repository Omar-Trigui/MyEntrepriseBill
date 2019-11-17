import React, { Component } from "react";
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Fab,
  RefreshControl
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
 

  Left,
  Body,
  Right
} from "native-base";
import { Button,ThemeProvider,Divider ,Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from "./HeaderComponent";
import AjouteDepense from "./AjouteDepense";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
const backgroundColor = "#F8F8FF";
const updatebtn = {
  colors: {
    primary: '#ffc300',
  }
}
const deletebtn = {
  colors: {
    primary: '#ff1744',
  }
}
export default class FactureComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      id: "",
      Activty: true,
      refreshing: false,
      modalVisible : false,
    };
    this.getUser();
  }
  getUser = async () => {
    try {
      let result = await AsyncStorage.getItem("UserSession");

      if (result) {
        let UserInfo = JSON.parse(result);
        this.setState({
          id: UserInfo.id
        });
        console.log("from get user " + this.state.id);
        
        this.getData();

        //alert("from facture " + this.state.id);
      } else {
        alert("no user");
      }
    } catch (error) {
      alert(error);
    }
  };
  Delete = id => {
    alert("depense a étè supprimer");
    fetch("http://192.168.0.11:80/misGastos/api/Depenses/delete.php", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      //.then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  GetDepenseID = (id, merchant, currency, date, description, total) => {
    this.props.navigation.navigate("EditFacture", {
      ID: id,
      Merchant: merchant,
      Currency: currency,
      Date: date,
      Description: description,
      Total: total
    });
  };
  getData =  () => {
    console.log("1 " +this.state.id);
    fetch("http://192.168.1.100:80/misGastos/api/Depenses/read.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
          Activty: false,
         
        });
      
        console.log("2 " +this.state.id);
        console.log(this.state.dataSource);
      })
      .catch(error => {
        console.error(error);
      });
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };
  fetchData = () => {
    fetch("http://192.168.1.100:80/misGastos/api/Depenses/read.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
          Activty: false,
          refreshing: false
        });
        console.log(this.state.dataSource);
      })
      .catch(error => {
        console.error(error);
      });
  };

  overlay = () => this.setState({ modalVisible: true});
  onClose = () => this.setState({ modalVisible: false});
  render() {
    let Depenses;
    if (this.state.dataSource.length == 0) {
      Depenses = <AjouteDepense />;
    } else {
      Depenses = this.state.dataSource.map((u, i) => {
        return (
          <Card key={i}>
            <CardItem>
              <Left>
                <Image
                  source={require("../../icon/user.png")}
                  style={{
                    height: 40,
                    width: 40,
              
                  }}
                />
                <Body>
                  <Text>{u.merchant}</Text>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Left>
              <TouchableHighlight onPress={ () => this.overlay()}>
                
              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginLeft : '15%'
                }}
                source={require("../../icon/bill.png")}
                
              />
            </TouchableHighlight>
             
               
              </Left>
              
              <View style={{ flexDirection: "column" ,  marginLeft : '10%'}}>
                <View style={{ flexDirection: "row" ,  flexWrap:'wrap' ,  justifyContent: 'center',alignItems: 'stretch',}}>
                    <Image
                      source={require("../../icon/file.png")}
                      style={{
                        height: 20,
                        width: 20
                      }}
                    />
                    <Text>Description : </Text>
                    <Text >
                    {u.description}
                    </Text>
                  </View>
                <Text>{"\n"}</Text>
                  <View style={{ flexDirection: "row" ,  flexWrap:'wrap'  ,  justifyContent: 'center',alignItems: 'stretch',}}>
                    <Image
                      source={require("../../icon/price-tag.png")}
                      style={{
                        height: 20,
                        width: 20
                      }}
                    />
                    <Text>Total : </Text>
                    
                    <Text>{u.total}</Text>
                    <Text>{u.currency}</Text>
                  
                  </View>

              </View>
              
              
            
              <Right>
              
              </Right>
          
             
            </CardItem>
            <CardItem>
              <Left>
              <ThemeProvider theme={updatebtn}>
              <Button style={{ height: 100,
                  width: 100,
                  backgroundColor : '#ff1744'}}
                icon={
                  <Icon
                    name="repeat"
                    size={15}
                    color="white"
                  />
                }
                title="  Update"
              />
              </ThemeProvider>
              </Left>
              <Body>
              <ThemeProvider theme={deletebtn}>
              <Button
              style={{ height: 100,
                width: 100 , 
                backgroundColor : '#ffc300'
             }}
           
                icon={
                  <Icon
                    name="close"
                    size={20}
                    color="white"
                  />
                }
                title="   Delete"
              />
              </ThemeProvider>
              </Body>
              <Right>
              <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../icon/rewind-time.png")}
                    style={{
                      height: 20,
                      width: 20
                    }}
                  />
                  <Text style={{ paddingLeft: 10, fontSize: 13 }}>
                  {u.date}
                  </Text>
                </View>
               
              </Right>
            </CardItem>
          </Card>
        );
      });
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <HeaderComponent {...this.props} name={"Depenses"} />
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor
          }}
        >

             {  this.state.Activty ? (
            <ActivityIndicator size="large"  style = {styles.activityIndicator} />
          ) : (
      
           
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
       
         
        
            {Depenses}
            <Overlay visible={this.state.modalVisible} >
              <Text>Some Modal Content</Text>
              <Text onPress={this.onClose}>Close</Text>
            </Overlay>
          </ScrollView>
  
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SubmitButtonStyle: {
    marginTop: 5,
    width: 15,
    height: 15,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: "#4BB543",
    borderRadius: 30,
    borderWidth: 1
  },
  activityIndicator :{
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
  }
});
