import {
    Text , View , Image , TouchableHighlight,AsyncStorage
} from 'react-native' ; 
import { Button,  Container, Header, Content, List, ListItem, Left, Right, Icon } from "native-base";
import HeaderComponent from './HeaderComponent';
import React, { Component } from 'react';

const backgroundColor = '#F8F8FF';
export default class GroupsCompnent extends Component {
  constructor(props) {
        super(props);
        this.state = {
          dataSource: [],
          id: "",
          Activty: true,
        
        };
    }
    componentWillMount = async () => {
        //this.fetchData();
        console.log("componentDidMount");
        try {
          let result = await AsyncStorage.getItem("UserSession");
    
          if (result) {
            let UserInfo = JSON.parse(result);
            this.setState({
              id: UserInfo.id
            });
    
            console.log(this.state.id);
          } else {
            alert("no user");
          }
        } catch (error) {
          alert(error);
        }
        this.read();
    
    
       
      };
      read = ()=>{
    
        fetch("http://192.168.1.100:80/misGastos/api/Groups/read.php", {
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
              Activty: false
            });
            console.log(responseJson);
            
          })
          .catch(error => {
            console.error(error);
          })
         
      }
     
      GetGroupID=(id,groupName,user_id)=>{
 
        this.props.navigation.navigate('FactureGroup', { 
    
          ID : id,
          GroupName : groupName,
          User_Id : user_id,
         
          
    
        });
    
    }
   
  render() {
    const Groups = this.state.dataSource.map(group => {
      return (
        
            <ListItem selected>
              <Left>
              <Image
              source={require("../../icon/group.png")}
              style={{
                height: 25,
                width: 25
              }}
            />
                <Text> {"  "}{group.GroupName}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" 
             
                onPress={this.GetGroupID.bind(
                  this,
                  group.id,
                  group.GroupName,
                  group.user_id
                   )}
                />
              </Right>
            </ListItem>
           
      )});
    return (
     <View style={{
         flex : 1 , 
         flexDirection : 'column'
     }}>
    <HeaderComponent {...this.props}  name={"Groups"}/>
     <View style={{
         flex : 1 ,
         backgroundColor : backgroundColor , 
        
     }}>
         <Button
            block
            success
            style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}
          >
            <Text
              style={{ color: "white" }}
              onPress={() => this.props.navigation.navigate("AddGroup")}
            >
             
              Ajouter Des Groups
            </Text>
          </Button>
          <Content>
          <List>
            {Groups}
            </List>
          </Content>
         
      
     </View>
     </View>
    );
  }
}
