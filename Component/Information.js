import React, { Component } from 'react';
import {
View, 
Text,
Alert,
Image,
Dimensions,
StyleSheet,
TouchableOpacity,
FlatList
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons';
import TAKEOFF from '../src/images/takeoff.png';
import LANDING from '../src/images/landing.png';
import io from "socket.io-client";

const socketURL = "http://localhost:3000";

const {width} = Dimensions.get("window");
const height = width * 0.3;
const numColumns = 1;

//dummy dataList
const dataList = [
  {battery: '7', height: '7.2', tx: '6.89', rx: '5.77'},
];
// console.log(dataList)

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataList:[],
        fly: true,
        socket: null
    };
    this.initSocket = this.initSocket.bind(this);
  }

  async componentDidMount() {
    this.initSocket();
  }

  // async componentDidMount(){
  //   httpClient
  //   .get('/information')
  //   .then( response => {
  //     const result = response.data;
  //     console.log('data from api is',result);

  //     if (result != null){
  //       this.setState({
  //         dataList: result,
  //       });
  //       console.log('dataList from api is',this.state.dataList);
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  initSocket = () => {
    console.log("Init socket is on!")
    const socket = io.connect(socketURL);
    //socket connect to server
    socket.on('connection', () => {
      console.log("User's connected to server");
    });

    let count = 0;
    setInterval(() => {
      socket.volatile.emit('ping', ++count);
    }, 1000);

  };

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;

    while ( totalLastRow !== 0 && totalLastRow !== numColumns){
        dataList.push({key: 'blank', empty: true});
        totalLastRow++;
    }
    return dataList;
  };

  //handler for landing and taking off function
  handleClick = () =>{
      this.setState({
        fly : !this.state.fly
      })
    }
  /* if (item.height != 0){
    this.setState({
        fly : !this.state.fly
    }) */
/* }; */

  _renderItem = ({item, index}) => {
    let {itemStyle, intemInvisible} = styles;
    if (item.empty) {
      return <View style={[itemStyle, itemInvisible]}/>;
    }
    var batteryper = (item.battery *100)/10
      console.log('full',batteryper)
      if (70.00 <= batteryper ){
          var icon_name = 'battery-full';
          var icon_color = 'green';
      }
      else if (20.00 <= batteryper && batteryper < 70.00){
        console.log('half',batteryper)
          var icon_name = 'battery-half';
          var icon_color = '#FF8000';
      }
      else {
          var icon_name = 'battery-quarter';
          var icon_color = '#FF0000';
          Alert.alert("Drone Low Battery");
          console.log('less',batteryper)
      }
    return(
      <View style={{position:'relative', marginRight: 5}}>
        <Card style={{
          backgroundColor: 'rgba(0,204,204,0.7)', 
          width: width*0.2, 
          height: height*0.8, 
          flexDirection: 'column', 
          alignItems:'center'
          }}>
            <Card.Content style={{flexDirection:'row', alignItems:'center', bottom: 5}}>
                <FontAwesome name={icon_name} color={icon_color} size={18} style={{marginRight: 5}}/>
                <Text style={styles.font}>Battery :</Text>
                <Text style={[styles.font, {marginLeft: 5}]}>{batteryper} %</Text>
            </Card.Content>
            <Card.Content style={{flexDirection:'row', alignItems:'center', bottom: 5}}>
                <MaterialIcons name='flight-takeoff' color='#606060' size={23} style={{marginRight: 5}}/>
                <Text style={styles.font}>Height :</Text>
                <Text style={[styles.font, {marginLeft: 5}]}>{item.height} m</Text>
            </Card.Content>
            <Card.Content style={{flexDirection:'row', alignItems:'center', bottom: 5}}>
                <MaterialCommunityIcons name='signal-variant' color='rgba(0,0,153,0.8)' size={24} style={{marginRight: 4}}/>
                <Text style={styles.font}>Tx :</Text>
                <Text style={[styles.font, {marginLeft: 5}]}>{item.tx} V</Text>
            </Card.Content>
            <Card.Content style={{flexDirection:'row', alignItems:'center', bottom: 5}}>
                <MaterialCommunityIcons name='signal-variant' color='rgba(255,102,0,0.8)' size={24} style={{marginRight: 4.5}}/>
                <Text style={styles.font}>Rx :</Text>
                <Text style={[styles.font, {marginLeft: 5}]}>{item.rx} V</Text>
            </Card.Content>
            <TouchableOpacity onPress={() => {this.handleClick()}}> 
            {item.height === 0? (
            <View>
            <Image
                style={{width: 30, height: 30, alignSelf:'center', padding: 5}}
                source={TAKEOFF}
            />
            <Text style={{textAlign:'center', marginTop: 5, fontSize: 11, color:'#606060'}}>PRESS TO TAKE OFF</Text>
            </View>
            ) : (
            <View>
            <Image
                style={{width: 30, height: 30, alignSelf:'center'}}
                source={LANDING}
            />
           <Text style={{textAlign:'center', marginTop: 5, fontSize: 11, color:'#606060'}}>PRESS TO LANDING</Text> 
            </View>
            )}
            </TouchableOpacity>
        </Card>
      </View>
    )
  }

  render() {
    return (
      <View style={{width: width, alignItems:'flex-end', height: height*1.9}}>
        <FlatList
          data = {this.formatData(dataList, numColumns)}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns= {numColumns}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    font: {
        fontSize: 14, 
        fontWeight:'bold',
        color:'#404040'
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
});

