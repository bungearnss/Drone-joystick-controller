import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Obtrecle from './Component/Obtrecle';
import AxisPad from './AxisPad/AxisPad';
import Information_test from './Component/Information_test';
import Map_test from './Component/Map_test';
import CameraTest from './Video/CameraTest';

import socketIOClient from "socket.io-client";

console.disableYellowBox = true;
console.ignoredYellowBox = ['Calling', 'html', 'Require']

const {width} = Dimensions.get("window");
const height = width*0.3;

const endpoint = "http://xxx.xxx.xxx:3000";

const socket = socketIOClient.connect(endpoint)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightX: '',
      rightY: '',
      leftX: '',
      leftY: '',
    };
  }

  RightonValueChange = ({x,y}) => {
    socket.emit("rightX data", this.state.rightX);
    this.setState({rightX: x});
    console.log('*************RIGHT xxxx', this.state.rightX)

    socket.emit("rightY data", this.state.rightY);
    this.setState({rightY: y})
    console.log('*************RIGHT yyyy', this.state.rightY)
  };

  LeftonValueChange = ({x,y}) => {
    socket.emit("leftX data", this.state.leftX);
    this.setState({leftX: x});
    console.log('*************LEFT xxxx', this.state.leftX)

    socket.emit("leftY data", this.state.leftY);
    this.setState({leftY: y});
    console.log('*************LEFT yyyy', this.state.leftY)
  };

  render() {
    return (
      <View style={styles.container}>
        <Map_test/>
        <Information_test/>
        {/* <CameraTest/> */}
        <Obtrecle/>
          <View style={{
            flexDirection:'row', 
            justifyContent:'space-between', 
            width: width*0.9}}> 
            
            <AxisPad
                resetOnRelease={true}
                autoCenter={true}
                // onValue={({x, y}) => {
                //   this.setState({
                //     leftX: x,
                //     leftY: y
                //   })
                //   console.log('********LEFT xxxxxx', this.state.leftX, '*********Left yyyyyyy', this.state.leftY);
                // }}
                onValue={this.LeftonValueChange}
              />

            <AxisPad
                resetOnRelease={true}
                autoCenter={true}
                /* onValue={({ x, y }) => {
                  this.setState({
                    rightX: x,
                    rightY: y
                  })
                  console.log('********RIGHT xxxxxx', this.state.rightX, '*********RIGHT yyyyyyy', this.state.rightY);
            }} */
                onValue={this.RightonValueChange}
            />
          </View> 
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

