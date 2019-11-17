import {
    Text , View , Image , TouchableHighlight
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


export default class HomeCompnent extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupid : '',
            user : ''
        }
    }
  
    addUser = (value) => {
        alert(this.state.user) ;
        alert(this.state.value) ;
        
        fetch("http://192.168.1.100:80/misGastos/api/Groups_Users/read_single.php?id=3", {
        
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
         
          console.log(responseJson);
          
        })
        .catch(error => {
          console.error(error);
        });
    }
   
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('id', 'NO-ID');
    this.addUser(itemId);
    return (
     <View style={{
         flex : 1 , 
         flexDirection : 'column'
     }}>
    <HeaderComponent {...this.props} />
     <View style={{
         flex : 1 ,
         backgroundColor : backgroundColor , 
         
     }}>
        
         
         <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>Ajouter des membres</Text>
              </CardItem>
              <CardItem bordered>
       
                <Body>
                  <Form>
                    <Item inlineLabel style={{ width: "85%"}}>
                      <Label>Email</Label>
                      <Input  
                     
                      onChangeText={user => this.setState({ user: user })} />
                    </Item>

                  </Form>
                </Body>
           
              </CardItem>
              <CardItem footer bordered>
                <Button block  success style={{width: "100%" }} onPress={this.addUser}>
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
