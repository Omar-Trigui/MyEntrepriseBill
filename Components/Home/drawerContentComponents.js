import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Avatar, Badge, withBadge, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
var { height, width } = Dimensions.get("window");
export default class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        name: "",
        email: "",
        role: "",
        password: "",
        image: ""
      },
      image: null,
      name: "",
      role: ""
    };
  }
  logout = () => {
    //  this.navigateToScreen('Login')
    AsyncStorage.removeItem("UserSession");
    this.props.navigation.navigate("Login");
  };

  componentDidMount = async () => {
    try {
      let result = await  AsyncStorage.getItem('UserSession');
      if(result){
       let UserInfo = JSON.parse(result)
      
       setInterval(() =>
       fetch("http://192.168.1.100:80/misGastos/api/Users/read_single.php?id="+UserInfo.id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(responseJson => {
      
          this.setState({
            image: responseJson.image,
            name : responseJson.name,
            role : responseJson.role,
          });
        })
        .catch(error => {
          console.error(error);
        })
        , 1000);
       this.setState(prevState => ({
        user: {
          ...prevState.user,           // copy all other key-value pairs of food object
          id : UserInfo.id,
          name : UserInfo.name,
          email :UserInfo.email,
          role : UserInfo.role,
          password : UserInfo.password
        }
      }))
      console.log(this.state.user.id);
      }else{
        alert("no user");
      }
    } catch (error) {
      alert(error);
    }
  };
  render() {
    let image;
    if (this.state.image == null) {
      image = (
        <Image
          source={require("../../icon/ceo.png")}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginLeft: 15,
            marginTop: 20
          }}
        />
      );
    } else {
      //   image = <Image
      //   source={{uri: 'http://192.168.1.100/misGastos/api/Users/'+this.state.image}}
      // style={{
      //   height: 50,
      //   width: 50,
      //   borderRadius: 100,
      //   marginLeft : 15 ,
      //   marginTop : 20
      // }}
      // />;
      image = (
        <View style={{ marginLeft: 15, marginTop: 20 }}>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/41.jpg"
            }}
            size="medium"
            PlaceholderContent={<ActivityIndicator />}
          />

          <Badge
            status="success"
            containerStyle={{ position: "absolute", top: 5, right: 0 }}
          />
        </View>
      );
    }
    let label;
    if (this.state.role == 1) {
      label = (
        <Text
          style={{
            color: "white",
            marginTop: 2,
            paddingLeft: 25,
            fontSize: 13
          }}
        >
          directeur
        </Text>
      );
    } else if (this.state.role == 1) {
      label = (
        <Text
          style={{
            color: "white",
            marginTop: 2,
            paddingLeft: 25,
            fontSize: 13
          }}
        >
          Employeur
        </Text>
      );
    } else if (this.state.role == 2) {
      label = (
        <Text
          style={{
            color: "white",
            marginTop: 2,
            paddingLeft: 25,
            fontSize: 13
          }}
        >
          expert
        </Text>
      );
    } else {
      label = (
        <Text
          style={{
            color: "white",
            marginTop: 2,
            paddingLeft: 25,
            fontSize: 13
          }}
        >
          particulier
        </Text>
      );
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#00adef",
            height: 100,
            flexDirection: "row"
          }}
        >
          {/* 
          borderBottomLeftRadius: 30,
          <Image
            source={require("../../icon/tab.jpg")}
            style={{
              flex: 3,
              justifyContent: "center",
              flexDirection: "column",
              height: 150,
              width : width / 1.5
              
            }}
          /> */}

          {image}
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "white",
                marginTop: 25,
                paddingLeft: 22,
                fontSize: 20
              }}
            >
              {this.state.name}
            </Text>
            {label}
          </View>
        </View>
        <ScrollView>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Icon name="inbox" size={24} color="black" />
              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("Home")}
              >
                Inbox
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Icon name="file-text-o" size={24} color="black" />

              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("Facture")}
              >
                Depenses
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Icon name="group" size={24} color="black" />

              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("groups")}
              >
                Groups
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.sectionHeadingStyle}>
              <Icon name="folder-open-o" size={24} color="black" />

              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("groups")}
              >
                Rapport
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Icon name="briefcase" size={24} color="black" />

              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("Facture")}
              >
                Note de frais
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>
          Section 4
        </Text> */}
            <View style={styles.sectionHeadingStyle}>
              <Icon name="gears" size={24} color="black" />
              <Text
                style={styles.headerNames}
                onPress={this.navigateToScreen("Settings")}
              >
                Settings
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Icon name="share-square-o" size={24} color="black" />

          <Text style={styles.headerNames} onPress={this.logout}>
            Log out
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerNames: {
    paddingLeft: 25,

    fontSize: 20
  },

  headerContainer: {
    height: 150
  },

  container: {
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    flexDirection: "row"
  },
  navSectionStyle: {
    backgroundColor: "lightgrey",
    flexDirection: "row"
  },
  sectionHeadingStyle: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row"
  },
  footerContainer: {
    padding: 15,
    borderTopRightRadius: 30,

    backgroundColor: "lightgrey",
    flexDirection: "row"
  }
});
