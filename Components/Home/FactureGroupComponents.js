import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Fab,
  Icon
} from "react-native";
import { Button, Card, CardItem, Body } from "native-base";
import HeaderComponent from "./HeaderComponent";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
const backgroundColor = "#F8F8FF";
export default class FactureComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      id: "",
      Activty: true,
      groupid : '',
      iduser : ''
    };
   
  }
  componentDidMount(){
 
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({ 
      id : this.props.navigation.state.params.ID,
      groupid : this.props.navigation.state.params.GroupName,
      iduser : this.props.navigation.state.params.User_Id,
     
      
    })
    console.log("componentDidMount");
    console.log(this.props.navigation.state.params.ID);
    console.log(this.props.navigation.state.params.User_Id);
    this.read_single(this.props.navigation.state.params.ID,this.props.navigation.state.params.User_Id)

   }
  Delete = (id) =>{
alert("depense a étè supprimer");
    fetch("http://192.168.1.100:80/misGastos/api/Depenses/delete.php", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id : id,
       
      })
    })
      //.then(response => response.json())
      .then(response => {
        alert("depense deleted ! ");
        console.log("reponse "+response);
        
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidUpdate(prevProps) {
      
    if (this.props.navigation.state.params.ID !== prevProps.navigation.state.params.ID) {
      console.log("componentDidUpdate with compare");
      console.log(this.props.navigation.state.params.ID);
      console.log(this.props.navigation.state.params.User_Id);
      this.read_single(this.props.navigation.state.params.ID,this.props.navigation.state.params.User_Id)

    
      
    }
  }

  componentWillMount = async () => {

 
        try {
            let result = await AsyncStorage.getItem("UserSession");
      
            if (result) {
              let UserInfo = JSON.parse(result);
              this.setState({
                iduser: UserInfo.id
              });
      
         
            } else {
              alert("no user");
            }
          } catch (error) {
            alert(error);
          }
         

    
  };
  supprimer(val){
    console.log(val);
    
    fetch("http://192.168.1.100:80/misGastos/api/Groups/delete.php", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id : val,
       
      })
    })
      //.then(response => response.json())
      .then(response => {
        alert("Group deleted ! ");
        console.log(val);
        console.log(response);
        
      })
      .catch(error => {
        console.error(error);
      });
  }
read_single(group_id,user_id){
    
  console.log("group_id " + group_id);
  console.log("user_id " + user_id);
  
    
          fetch("http://192.168.1.100:80/misGastos/api/Depenses/read_group.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id: user_id,
              group_id : group_id
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                dataSource: responseJson,
                Activty: false
              });
              console.log(responseJson);
              
            })
            .catch(error => {
              console.error(error);
            });

       
            GetDepenseID=(id,merchant,currency,date,description,total)=>{
 
              this.props.navigation.navigate('EditFacture', { 
          
                ID : id,
                Merchant : merchant,
                Currency : currency,
                Date : date,
                Description : description , 
                Total : total , 
                
          
              });
          
          }

}
GetDepensegroupID=(id,merchant,currency,date,description,total)=>{
 
  this.props.navigation.navigate('EditFacture', { 

    ID : id,
    Merchant : merchant,
    Currency : currency,
    Date : date,
    Description : description , 
    Total : total , 
    

  });

}
  render() {
   
 
      let Depenses = this.state.dataSource.map(Depense => {
        console.log(Depense);
        return (
          <View style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}>
            <Card>
              <CardItem header bordered style={{ flexDirection: "row" }}>
                <View
                style={{ flex : 1 , flexDirection : 'row'}}>
                  <View style={{flex : 0.5, flexDirection:'row',}}>
                  <Image
                  source={require("../../icon/user.png")}
                  style={{
                    height: 20,
                    width: 20
                  }}
                />
                <Text style={{ paddingLeft: 25, fontSize: 13 }}>
                  {Depense.merchant}
                </Text>
  
                  </View>
                  <View style={{flex : 0.5,paddingLeft : 50,flexDirection:'row',}}>
                    
                    <Button  warning style ={{width : 55}} >
                    
                     <Text style={{paddingLeft : 5 ,color : 'white'}} onPress={this.GetDepensegroupID.bind(
                       this,
                        
                        Depense.id,
                        Depense.merchant,
                        Depense.currency,
                        Depense.date,
                        Depense.description,
                        Depense.total
                         )}>Update</Text> 
                    </Button> 
                    <Button  danger style={{width : 55,marginLeft : 10}} onPress={() =>this.Delete(Depense.id)}>
                    <Text style={{paddingLeft : 5 ,color : 'white'}}>Delete</Text>
                    </Button>
       
                  </View>
                </View>
                
                
                
              </CardItem>
              <CardItem bordered>
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../icon/file.png")}
                      style={{
                        height: 20,
                        width: 20
                      }}
                    />
                    <Text style={{ paddingLeft: 25, fontSize: 13 }}>
                      {Depense.description}
                    </Text>
                  </View>
                  <Text>{"\n"}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../icon/rewind-time.png")}
                      style={{
                        height: 20,
                        width: 20
                      }}
                    />
                    <Text style={{ paddingLeft: 25, fontSize: 13 }}>
                      {Depense.date}
                    </Text>
                  </View>
                </Body>
              </CardItem>
              <CardItem
                footer
                bordered
                style={{ flexDirection: "row", fontSize: 13 }}
              >
                <Image
                  source={require("../../icon/price-tag.png")}
                  style={{
                    height: 20,
                    width: 20
                  }}
                />
                <Text style={{ paddingLeft: 25 }}>
                  {Depense.total} {Depense.currency}
                </Text>
              </CardItem>
            </Card>
          </View>
        );
      });
   
    

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <HeaderComponent {...this.props} />
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor
          }}
        >
        <View
        style={{flexDirection: "row"}}
        >
             <Button
            
            success
            style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}
          >
            <Text
              style={{ color: "white" }}
              onPress={() => this.props.navigation.navigate("AddFacture",{id : this.props.navigation.state.params.ID})}
            >
              
              Ajouter Depenses{this.props.navigation.state.params.ID}
            </Text>
          </Button>
          <Button warning style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}><Text  style={{ color: "white" }} onPress={() => this.props.navigation.navigate("AddUser",{id : this.state.groupid})}>Membres </Text></Button>
          <Button danger style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}><Text  style={{ color: "white" }} onPress={() => this.supprimer(this.props.navigation.state.params.ID) }> suppprimer group </Text></Button>
        </View>
         
          {this.state.Activty ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView>
            {Depenses}
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
  }
});
