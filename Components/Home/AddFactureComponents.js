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

export default class AddFactureCompnents extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      Merchant : '',
      total : '' ,
      value : 'EURO' ,
      date : '' , 
      description : '' ,
      chosenDate: new Date(), 
      selected: "EURO" ,
      id :'',
      text : 'hello',
      image : null,
      group_id :''
    };

  }
  componentWillMount = async () => {
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
    const { navigation } = this.props;
          const itemId = navigation.getParam('id', 'NO-ID');
          this.setState({
              group_id : itemId
          })
      alert(this.state.group_id);
   
  }
  

  display = ( ) => {

    fetch("http://192.168.1.100:80/misGastos/api/Depenses/create.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        merchant : this.state.Merchant,
        date: this.state.date,
        currency: this.state.selected,
        total : this.state.total,
        description:this.state.description,
        user_id : this.state.id,
        group_id : 3,
        image : this.state.image
      })
    })
      //.then(response => response.json())
      .then(response => {
        alert('depense created');
        console.log(response);
        
      })
      .catch(error => {
        console.error(error);
      });

    
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <HeaderComponent {...this.props} />

        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>Créer votre depense</Text>
              </CardItem>
              <CardItem bordered>
       
                <Body>
                  <Form>
                    <Item inlineLabel style={{ width: "85%"}}>
                      <Label>Merchant</Label>
                      <Input  
                     
                      onChangeText={Merchant => this.setState({ Merchant: Merchant })} />
                    </Item>

                    <View style={{flexDirection:'row',}}>
                    <Item picker style={{ width: "35%" , marginLeft : 15}}>
                    <Picker
                        mode="dropdown"
                        
                    
                        placeholder="Select your currency"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected}
                        onValueChange={(value) => {
                          this.setState({selected :value});
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
                      
                      onChangeText={total => this.setState({ total: total })} />
                    </Item> 
                    </View>
                    <Textarea rowSpan={3}  bordered placeholder="Description"  onChangeText={(description) => this.setState({description : description})} style={{marginTop:5}} />
                    <DatePicker
                      style={{ width: "85%" }}
                      defaultDate={new Date(2018, 4, 4)}
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
                    <Button iconLeft style={{marginTop : 5,width: "85%"}}>
                        <Icon name='camera' />
                        <Text>Ajouter une Image</Text>
                    </Button>
                  </Form>
                </Body>
           
              </CardItem>
              <CardItem footer bordered>
                <Button block  success style={{width: "100%" }} onPress={this.display}>
                  <Text >Enregistrer</Text>
                </Button>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}

