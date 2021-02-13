import React, { Component } from 'react';
import { 
View, 
Text,
StyleSheet,
Dimensions,
FlatList 
} from 'react-native';
import {Feather} from 'react-native-vector-icons';
import * as Animatable from 'react-native-animatable';
import socketIOClient from "socket.io-client";


const {width} = Dimensions.get("window");
const height = width*0.3;

export default class Obtrecle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        LeftDistance: '',
        RightDistance: '',
        TopDistance: '',
        BottomDistance: '',
        FontDistance: '',
        BackDistance: '',
        endpoint: "http://xxx.xxx.xxx:3000", 
    };
    // console.log('LeftDistance', this.state.LeftDistance)
  }

  componentDidMount(){
    const {endpoint} = this.state;
    console.log('****client server address:', endpoint);

    //connect to the socket
    const socket = socketIOClient(endpoint);

    //Listen for data on the "outgoing xxx" namespace
    //and supply a callback for what to do 
    //when we get data.
    socket.on("outgoing BackDis", BackDis_data => 
    this.setState({
        BackDistance: BackDis_data.num
    }));

    socket.on("outgoing FontDis", FontDis_data => 
    this.setState({
        FontDistance: FontDis_data.num
    }));

    socket.on("outgoing TopDis", TopDis_data => 
    this.setState({
        TopDistance: TopDis_data.num
    }));

    socket.on("outgoing BottomDis", BottomDis_data => 
    this.setState({
        BottomDistance: BottomDis_data.num
    }));

    socket.on("outgoing LeftDis", LeftDis_data => 
    this.setState({
        RightDistance: LeftDis_data.num
    }));

    socket.on("outgoing RightDis", RightDis_data => 
    this.setState({
        LeftDistance: RightDis_data.num
    }));
}
  render() {
      const {BackDistance, 
             FontDistance, 
             TopDistance,
             BottomDistance,
             RightDistance,
             LeftDistance
            } = this.state
    // console.log('outgoing BackDistance:', {BackDistance})
    return (
    <View style={styles.containers}>
        <View style={styles.footer}>
        <View style={[styles.subcontainer, {alignItems:'flex-start'}]}>
            <View style={{flexDirection:'row', paddingLeft: 5, marginTop: 10}}>
                {LeftDistance >= 2 ? 
                (
                <Text style={{fontWeight:'bold', color:'#003366'}}>Left :  {LeftDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', color:'#FF0000'}}>Left :  {LeftDistance} m</Text> 
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View >
                )}
            </View>
            <View style={{flexDirection:'row', paddingLeft: 5}}>
                {RightDistance >= 2 ?
                (
                <Text style={{fontWeight:'bold', marginTop: 3, color:'#003366'}}>Right :  {RightDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', marginTop: 3, color:'#FF0000'}}>Right :  {RightDistance} m</Text>
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View >
                )}
            </View>
        </View> 

      <View style={[styles.subcontainer, {alignItems:'flex-start'}, {marginRight: 20}]}>
        <View style={{flexDirection:'row', paddingHorizontal: 5, marginTop: 10}}>
            {TopDistance >= 2 ?
                (
                <Text style={{fontWeight:'bold', color:'#003366'}}>Top :  {TopDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', color:'#FF0000'}}>Top:  {TopDistance} m</Text>
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View>
                )}
        </View>
        <View style={{flexDirection:'row', paddingHorizontal: 5}}> 
            {BottomDistance >= 2 ?
                (
                <Text style={{fontWeight:'bold', marginTop: 3, color:'#003366'}}>Bottom :  {BottomDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', marginTop: 3, color:'#FF0000'}}>Bottom:  {BottomDistance} m</Text>
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View>
                )}
        </View>
      </View>

      <View style={[styles.subcontainer, {borderRightWidth: 0}]}>
        <View style={{flexDirection:'row', paddingRight: 5, marginTop: 10}}>
            {FontDistance >= 2 ?
                (
                <Text style={{fontWeight:'bold', color:'#003366'}}>Font :  {FontDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', color:'#FF0000'}}>Font:  {FontDistance} m</Text>
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View>
                )}
        </View>

        <View style={{flexDirection:'row', paddingRight: 5}}> 
            {BackDistance >= 2 ?
                (
                <Text style={{fontWeight:'bold', marginTop: 3, color:'#003366'}}>Back :  {this.state.BackDistance} m</Text>
                ):(
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flexDirection:'row'}}> 
                        <Text style={{fontWeight:'bold', marginTop: 3, color:'#FF0000'}}>Back:  {BackDistance} m</Text>
                        <Feather name="alert-triangle" color='#FF0000' size={14} style={styles.alert}/>
                    </Animatable.View>
                )}
        </View>
      </View>
    </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    containers:{
        /* backgroundColor: 'red', */
        width:width, 
        height:height*2, 
        position:'absolute', 
        flexDirection:'row',
        alignItems:'flex-end',
    },
    footer:{
        backgroundColor: "rgba(255,255,51,0.7)",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        shadowColor: "#000000",
        shadowRadius: 10,
        elevation: 2,
        shadowOpacity: 0.1,
        width: width*0.55,
        height: height*0.30,
        flexDirection:'row',
        position:'relative',
        alignItems:'center',
        left: width/4
        /* top: height*0.5 */
    },
    subcontainer:{
        justifyContent:'center', 
        marginLeft: 10, 
       /*  marginTop: 10,  */
        flex: 1, 
        flexDirection:'column',
        height: height*0.3,
        top: -7
    },
    alert:{
        marginLeft: 5,
        marginTop: 4
    },
    itemStyle: {
        backgroundColor: '#F3F5F9',
        alignItems: 'center',
        //justifyContent: 'center',
        flex: 1,
      },
      itemInvisible: {
        backgroundColor: 'transparent',
      },
})

