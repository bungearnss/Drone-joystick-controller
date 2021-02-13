import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import io from 'socket.io-client';
import DRONE from '../src/images/drone.png';

const socketURL = 'http://xxx.xxx.xxx:3000'; 
console.ignoredYellowBox = ['Setting a timer'];

// const screen = Dimensions.get('window');

// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE = 13.6494654;
// const LONGITUDE = 100.4907165
// const LATITUDE_DELTA = 0.0122;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map_test extends Component {
  constructor(props) {
    super(props);
    this.socket = io(socketURL);
    this.state = {
        markerCoordinates : [],
        InitialRegion:[],
        RegionChange:[]
    };
  }

  componentDidMount(){
      const socket = this.socket;
      if (!socket) return;

      socket.on("disconnect", console.log("****Cilent disconnected!!"));

      socket.on("locationUpdated", (locationState) => {
          const newMarkerCoordinates  = Object.values(locationState).map(item => ({
              latitude: item.lat,
              longitude: item.lng
          }));
        //   console.log('newMarkerCoordinates', newMarkerCoordinates)
          this.setState({ markerCoordinates: newMarkerCoordinates});
          
          const newRegion = Object.values(locationState).map(item => ({
              latitude: item.lat,
              longitude: item.lng,
              latitudeDelta: 0.0052,
              longitudeDelta: item.lat * 0.00005
          }));
          this.setState({ InitialRegion: newRegion});
            // console.log('******InitialRegion index 0:', this.state.InitialRegion[0])
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView
            provider= {PROVIDER_GOOGLE}
            initialRegion= {this.state.InitialRegion[0]}
            style= {styles.MapView}
            showsUserLocation={true}
            showsBuildings={true}
            showsCompass={true}
            scrollEnabled={true}
            showsIndoors={true}
            showsMyLocationButton={true}
            followUserLocation = { true }
            tracksInfoWindowChanges={true}
        >
            {this.state.markerCoordinates.map((coord, index) => (
                <Marker
                    key={index}
                    coordinate={coord}
                    centerOffset={{ x: 25, y: 25}}
                    anchor={{ x: 0.5, y: 0.5}}
                >
                    <Image 
                        source={DRONE}
                        style={{width: 35, height: 35}}
                    />
                    <Callout tooltip
                    >
                        <View>
                            <View style={styles.bubble}>
                        <Text style={{fontSize: 12, fontWeight: 'bold',textAlign: 'center'}}>YOUR DRONE</Text>
                            </View>
                        </View>
                        <View style={styles.arrowBorder}/>
                        <View style={styles.arrow}/>
                    </Callout>
                </Marker>
            ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    MapView: {
        width: '25%',
        height: '52%',
        position: 'relative',
        left: 5,
        top: 5,
    },
      bubble: {
          alignSelf: 'flex-start',
          backgroundColor: 'rgba(153,204,255,1)',
          borderRadius: 6,
          borderColor: 'rgba(153,188,255,1)',
          borderWidth: 0.5,
          padding: 5,
          width: 100,
      },
      arrow: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 16,
          alignSelf:'center',
          marginTop: -45
      },
      arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: 'rgba(153,204,255,1)',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
      }
});