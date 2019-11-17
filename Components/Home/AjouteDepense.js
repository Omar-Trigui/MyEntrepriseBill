import React, { Component } from 'react';
import {Text,AsyncStorage} from 'react-native';
import { Button,Header,Avatar ,Badge,Image,Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class AjouteDepense extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      };
      this.getUser();
    };
    getUser = async()=>{
        try {
            let result = await AsyncStorage.getItem("UserSession");
      
            if (result) {
              let UserInfo = JSON.parse(result);
              this.setState({
                id: UserInfo.id
              });
              
              //alert(this.state.id);
            } else {
              alert("no user");
            }
          } catch (error) {
            alert(error);
          }
    }
    
  render() {
    return (
        <Card
          title='Ajouter un Depense'>

            <Image
            style={{
                height: 100,
                width: 100 , 
                marginLeft : '30%'
                        }}
    
            source={require('../../icon/bill.png')}
            />
          
          <Button
            onPress={() => this.props.navigation.navigate("AddFacture",{id : UserInfo.id})}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Voir' />
        </Card>
    );
  }
}
