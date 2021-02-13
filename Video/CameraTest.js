import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import io from 'socket.io-client';

const {width} = Dimensions.get("window");
const height = width*0.3;

export default class CameraTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vdo_pathquery: '',
      vdo_array: []
    };
  }

/*   async componentDidMount(){
    httpClient
    .get('/Vdo')
    .then( response => {
      const result = response.data;
      console.log('result form api is', result[0]);

      var row = result[0]
      if(result != null){
        this.setState({
          vdo_pathquery: row.vdo_path
        });
        console.log('row vdo_pathquery',vdo_pathquery)
      }
    })
    .catch(error => {
      console.log(error);
    });
  } */

  render() {
    //dummy vdo_path
    var vdo_path = 'https://static.videezy.com/system/resources/previews/000/007/474/original/4K_UHD_Drover_Over_Downtown_Portland_Sign_and_Old_Town_Water_Tower_and_Pink_Skyscraper_and_Skyline_RYAN.mp4'
    return (
      <View style={styles.container}>
        <Video
            source={{ uri: vdo_path}}
            rate={1.0}
            volume={0.5}
            isMuted={false}
            resizeMode="cover"
            shouldPlay 
            isLooping
            /* useNativeControls */
            style={styles.VideoView}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        /* alignItems:'center',
        justifyContent: 'center', */
        position:'relative',
    },
    VideoView: {
        width: width*1.2,
        height: height*2.2
    }
});

