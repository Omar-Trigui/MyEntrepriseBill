import {
    Text , View , Image , TouchableHighlight,AsyncStorage
} from 'react-native' ; 
import HeaderComponent from './HeaderComponent';
import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
   
    Body,
    Button,
    DatePicker,
    Form,
    Item,
    Label,
    Input,
    Picker,
    Icon,
    Textarea
  } from "native-base";
  const backgroundColor = "#F8F8FF";

export default class AddGroupCompnent extends Component {
   constructor(props){
       super(props) ; 
       this.state ={
        groupName : '',
        iduser : '',
        groupid : ''
       }
   }
   componentWillMount =async () => {
    try {
        let result = await AsyncStorage.getItem("UserSession");
  
        if (result) {
          let UserInfo = JSON.parse(result);
          this.setState({
            iduser: UserInfo.id
          });
  
          console.log(this.state.id);
        } else {
          alert("no user");
        }
      } catch (error) {
        alert(error);
      }
   
  }
   update=() =>{
    const { goBack } = this.props.navigation;
       
       fetch("http://192.168.1.100:80/misGastos/api/Groups/create.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            GroupName: this.state.groupName,
            user_id : this.state.iduser
        })
      })
        .then(response => response.json())
        .then(responseJson => {
         
          console.log(responseJson);
          
        })
        .catch(error => {
          console.error(error);
        });
        fetch("http://192.168.1.100:80/misGastos/api/Groups/read_latest.php", {
         
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(responseJson => {
           
              fetch("http://192.168.1.100:80/misGastos/api/Groups_Users/create.php", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    group_id: responseJson.id,
                    user_id : this.state.iduser
                })
              })
                .then(response => response.json())
                .then(responseJson => {
                  alert("group a étè Ajouter");
                  
                })
                .catch(error => {
                  console.error(error);
                });
                    
            
          })
          .catch(error => {
            console.error(error);
          });
         

   }
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
            <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>Créer votre Group</Text>
              </CardItem>
              <CardItem bordered>
       
                <Body>
                  <Form>
                    <Item inlineLabel style={{ width: "85%"}}>
                      <Label>Name</Label>
                    
                      <Input  
                
                        onChangeText={(groupName) => this.setState({groupName})}
                         value={this.state.groupName}
                       />
                    </Item>
                   
                  </Form>
                </Body>
              
              </CardItem>
              <CardItem footer bordered>
                <Button block  success style={{width: "100%" }} onPress={this.update}>
                  <Text >Enregistrer</Text>
                </Button>
              </CardItem>
            </Card>
          </Content>
        </Container>
      
     </View>
     </View>
    );
  }
}
