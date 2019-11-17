import { View, Image, TouchableHighlight , TextInput,StyleSheet,AsyncStorage} from "react-native";
import HeaderComponent from "./HeaderComponent";
import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
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
let i = 0 ;
export default class EditFactureComponents extends Component {

    constructor(props) {
        super(props);
        
        this.state ={
            id : '',
            merchant : '' ,
            currency : '' ,
            date : '' , 
            description : '' , 
            total : '' , 
            image : '' , 
            iduser: '',
            
            chosenDate: new Date(),
        }
        console.log("constructor");
        
      }
      componentDidMount(){
 
        // Received Student Details Sent From Previous Activity and Set Into State.
        this.setState({ 
          id : this.props.navigation.state.params.ID,
          merchant : this.props.navigation.state.params.Merchant,
          currency : this.props.navigation.state.params.Currency,
          date : this.props.navigation.state.params.Date,
          description : this.props.navigation.state.params.Description,
          total : this.props.navigation.state.params.Total,
          
        })
        // console.log("componentDidMount " + this.props.navigation.state.params.ID);
        // console.log("componentDidMount state " + this.state.id);
        //this.read_single(this.props.navigation.state.params.ID);
   
       }
   
      
      
      // read_single(value){
      //   alert("here");
      //   fetch("http://192.168.1.100:80/misGastos/api/Depenses/read_single.php?id="+value, {
           
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
         
      //   })
      //     .then(response => response.json())
      //     .then(responseJson => {
      //       console.log('response' + responseJson.merchant);
      //      this.setState({
      //          id : responseJson.id,
      //          merchant : responseJson.merchant,
      //          currency : responseJson.currency,
      //          description : responseJson.description,
      //          total : responseJson.total,
      //          image  : responseJson.image,
      //          date : responseJson.date
      //      })
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
      // }
      update= () => {
        // let depense = {
        //   id : this.state.id,
        // merchant : this.state.merchant,
        // currency : this.state.currency,
        // date : this.state.date , 
        // description : this.state.description, 
        // total : this.state.total , 
        // image : this.state.image , 
        // user_id : this.state.iduser
        // }
        //   console.log(depense);
          
          fetch("http://192.168.1.100:80/misGastos/api/Depenses/update.php", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id : this.state.id,
        merchant : this.state.merchant,
        currency : this.state.currency,
        date : this.state.date , 
        description : this.state.description, 
        total : this.state.total , 
        image : this.state.image , 
        user_id : this.state.iduser
       
      })

    })
      //.then(response => response.json())
      .then(response => {
        alert('Depense a étè mise a jour');
        console.log(response);
        
      })
      .catch(error => {
        console.error(error);
      });

      }
      componentWillMount = async () => {
        try {
            let result = await AsyncStorage.getItem("UserSession");
      
            if (result) {
              let UserInfo = JSON.parse(result);
              this.setState({
                iduser: UserInfo.id
              });
      
              console.log("user " + this.state.iduser);
    
              
            } else {
              alert("no user");
            }
          } catch (error) {
            alert(error);
          }

       
      }
   
   
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.navigation.state.params.ID !== prevProps.navigation.state.params.ID) {
        console.log("componentDidUpdate with compare");
        // this.setState({ 
        //   id : this.props.navigation.state.params.ID,
        //   merchant : this.props.navigation.state.params.Merchant,
        //   currency : this.props.navigation.state.params.Currency,
        //   date : this.props.navigation.state.params.Date,
        //   description : this.props.navigation.state.params.Description,
        //   total : this.props.navigation.state.params.Total,
          
        // })
        console.log("componentDidUpdate " + this.props.navigation.state.params.ID);
        this.read_single(this.props.navigation.state.params.ID);
      
        
      }
    }
    componentWillUnmount(){
      console.log("omponentWillUnmount");
    }
    // componentWillUpdate(nextProps, nextState) {
    //   console.log("this is next state" + nextState); //will show the new state
    //   console.log("this is the state"+ this.state); //will show the previous state
    // }
      
  render() {
  
    console.log("render");
    
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
              
                <Text>Créer votre depense {this.state.id}</Text>
              </CardItem>
              <CardItem bordered>
       
                <Body>
                  <Form>
                    <Item inlineLabel style={{ width: "85%"}}>
                      <Label>Merchant</Label>
                    
                      <Input  
                
                        onChangeText={(merchant) => this.setState({merchant})}
                        value={this.state.merchant}
                       />
                    </Item>
                    {/* <Item floatingLabel style={{ width: "85%"}}>
                      <Label>Description</Label>
                      <Input />
                    </Item> */}
                    <View style={{flexDirection:'row',}}>
                    <Item picker style={{ width: "35%" , marginLeft : 15}}>
                    <Picker
                        mode="dropdown"
                        
                    
                        placeholder="Select your currency"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.currency}
                        onValueChange={(value) => {
                          this.setState({currency :value});
                        }} 
                    >
                        <Picker.Item label="TND" value="TND" />
                        <Picker.Item label="EURO" value="EURO" />
                        <Picker.Item label="Dollar" value="Dollar" />
                        <Picker.Item label="GBT" value="GBT" />
                        
                    </Picker>
                    </Item>
                    <Item inlineLabel   style={{ width: "50%"}}>
                      <Label>Total</Label>
                      <Input
                       
                       value={this.state.total}
                      onChangeText={total => this.setState({ total: total })} />
                    </Item> 
                    </View>
                    <Textarea rowSpan={3}  bordered placeholder="Description" value={this.state.description}  onChangeText={(description) => this.setState({description : description})} style={{marginTop:5}} />
                    <DatePicker
                      style={{ width: "85%" }}
                      defaultDate={this.state.date}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select date"
                      textStyle={{ color: "blue" }}
                      placeHolderTextStyle={{ color: " blue" }}
                      
                      disabled={false}
                      onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <Text style={{ width: 150 }}>
                      Date: {this.state.chosenDate.toString().substr(4, 12)}
                    </Text>
                    <Button iconLeft style={{marginTop : 5,width: "85%"}} onPress={() => this.effacer()}>
                        <Icon name='camera' />
                        <Text>Ajouter une Image</Text>
                    </Button>
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