import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Title } from "react-native-paper";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import TAKEOFF from "../src/images/takeoff.png";
import LANDING from "../src/images/landing.png";
import socketIOClient from "socket.io-client";

const { width } = Dimensions.get("window");

export default class Information_test extends Component {
  constructor() {
    super();
    this.state = {
      battery: "",
      height: "",
      tx: "",
      rx: "",
      fly: false,
      //check address in cmd by using ipconfig
      endpoint: "http://xxx.xxx.xxx",
    };
  }

  handleClick = () => {
    {this.state.height == 0? 
        (this.setState({
            fly: true
        })) : (this.setState({
            fly : false
        }));
    }
  };

  componentDidMount(){
      const {endpoint} = this.state;
      console.log('****client server address:', endpoint);

      //connect to the socket
      const socket = socketIOClient(endpoint);

      //Listen for data on the "outgoing xxx" namespace
      //and supply a callback for what to do 
      //when we get data.
      socket.on("outgoing battery", battery_data => 
      this.setState({
        battery: battery_data.num
      }));

      socket.on("outgoing height", height_data => 
      this.setState({
          height: height_data.num
      }));

      socket.on("outgoing tx", tx_data => 
      this.setState({
          tx: tx_data.num
      }));

      socket.on("outgoing rx", rx_data => 
      this.setState({
          rx: rx_data.num
      }));
  }

  render() {
    const { battery } = this.state;
    const { height } = this.state;
    const { tx } = this.state;
    const { rx } = this.state;
    // console.log('outgoing rx:', {rx})

    var batteryper = (battery * 100) / 10;
    // console.log("batteryper is", batteryper);
    if (70.0 <= batteryper) {
      var icon_name = "battery-full";
      var icon_color = "green";
    } else if (20.0 <= batteryper && batteryper < 70.0) {
      var icon_name = "battery-half";
      var icon_color = "#FF8000";
    } else {
      var icon_name = "battery-quarter";
      var icon_color = "#FF0000";
    }
    return (
      <View style={styles.container}>
        <Card
          style={styles.CardSty}
        >
          <Card.Content
            style={{ flexDirection: "row", alignItems: "center", bottom: 5 }}
          >
            <FontAwesome name={icon_name} color={icon_color} size={18} style={{marginRight: 5}}/>
            <Text style={styles.font}>Battery :</Text>
            <Text style={[styles.font, { marginLeft: 5 }]}>{batteryper} %</Text>
          </Card.Content>
          <Card.Content
            style={{ flexDirection: "row", alignItems: "center", bottom: 5 }}
          >
            <MaterialIcons
              name="flight-takeoff"
              color="#606060"
              size={23}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.font}>Height :</Text>
            <Text style={[styles.font, { marginLeft: 5 }]}>{height} m</Text>
          </Card.Content>
          <Card.Content
            style={{ flexDirection: "row", alignItems: "center", bottom: 5 }}
          >
            <MaterialCommunityIcons
              name="signal-variant"
              color="rgba(0,0,153,0.8)"
              size={24}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.font}>Tx :</Text>
            <Text style={[styles.font, { marginLeft: 5 }]}>{tx} V</Text>
          </Card.Content>
          <Card.Content
            style={{ flexDirection: "row", alignItems: "center", bottom: 5 }}
          >
            <MaterialCommunityIcons
              name="signal-variant"
              color="rgba(255,102,0,0.8)"
              size={24}
              style={{ marginRight: 4.5 }}
            />
            <Text style={styles.font}>Rx :</Text>
            <Text style={[styles.font, { marginLeft: 5 }]}>{rx} V</Text>
          </Card.Content>
          <TouchableOpacity
            onPress={() => {
              this.handleClick();
            }}
          >
            {height == 0 ? (
              <View>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    padding: 5,
                  }}
                  source={TAKEOFF}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    fontSize: 11,
                    color: "#606060",
                  }}
                >
                  PRESS TO TAKE OFF
                </Text>
              </View>
            ) : (
              <View>
                <Image
                  style={{ width: 30, height: 30, alignSelf: "center" }}
                  source={LANDING}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    fontSize: 11,
                    color: "#606060",
                  }}
                >
                  PRESS TO LANDING
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#404040",
  },
  container: {
    position: "absolute", 
    top: 5, 
    left: width*0.8
  },
  CardSty: {
    backgroundColor: "rgba(0,204,204,0.7)",
    width: width* 0.2,
    height: width*0.242,
     flexDirection: "column",
    alignItems: "center",
  }
});
