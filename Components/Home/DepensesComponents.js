import React, { Component } from 'react';
import { Button, Card, CardItem, Body } from "native-base";
class DepenseComponents extends Component {
  render() {
    return (

        <View key={this.props.keyVal} style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}>
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
              {this.props.val.merchant}
            </Text>

              </View>
              <View style={{flex : 0.5,paddingLeft : 50,flexDirection:'row',}}>
                
                <Button  warning style ={{width : 55}} >
                <Text style={{paddingLeft : 5 ,color : 'white'}} onPress={this.props.update}>Update</Text>
                </Button>
                <Button  danger style={{width : 55,marginLeft : 10}} onPress={this.props.delete}>
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
                  {this.props.val.description}
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
                  {this.props.val.date}
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
              {this.props.val.total} {this.props.val.currency}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default DepenseComponents;
