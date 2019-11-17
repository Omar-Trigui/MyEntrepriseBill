import React, { Component } from 'react';
import { View, Text ,ScrollView ,StyleSheet } from 'react-native';
import { Button,Header,Avatar ,Badge,Image,Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import HeaderComponent from './HeaderComponent' ;
import { Input } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/Ionicons';
export default class HomeComponent extends Component {
 
  
  render() {
    console.log('render called');
    console.disableYellowBox = true;
    return (
    
       <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <HeaderComponent {...this.props} name={"Inbox"}/>
        <ScrollView>
        <Card
          title='Votre Courrier'
          image={require('../../icon/deal.jpg')}>
          <Text style={{marginBottom: 10}}>
          Cela peut sembler une évidence, mais certains commerçants et prestataires de services s’en sont mordus les doigts lors du démarrage des sites d’achats groupés comme Groupon.
          </Text>
          <Button
            
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Voir' />
        </Card>
        <Card
          title='Votre Courrier'
          image={require('../../icon/deal.jpg')}>
          <Text style={{marginBottom: 10}}>
          Cela peut sembler une évidence, mais certains commerçants et prestataires de services s’en sont mordus les doigts lors du démarrage des sites d’achats groupés comme Groupon.
          </Text>
          <Button
            
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Voir' />
        </Card>
        <Card
          title='Votre Courrier'
          image={require('../../icon/deal.jpg')}>
          <Text style={{marginBottom: 10}}>
          Cela peut sembler une évidence, mais certains commerçants et prestataires de services s’en sont mordus les doigts lors du démarrage des sites d’achats groupés comme Groupon.
          </Text>
          <Button
            
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Voir' />
        </Card>
        </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Ajouter un depense" onPress={() => alert("depense tapped!")}>
            <Icon name="file-text-o" style={styles.actionButtonIcon} />
            
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Ajouter un group" onPress={() => alert("group tapped!")}>
            <Icon name="group" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Ajouter un Rapport" onPress={() => alert("Rapport tapped!")}>
            <Icon name="folder-open-o" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>

      

    );
  }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});