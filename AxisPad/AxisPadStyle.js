import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get("window");

export default StyleSheet.create({
    wrapper: {
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        /* backgroundColor: '#00000033', */
        backgroundColor: 'rgba(160,160,160,0.6)',
        /* position: 'relative', */
        bottom : 40,
        /* right: width*0.35 */
    },
    handler: {
        width: "80%",
        height: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        /* backgroundColor: '#00000066' */
        backgroundColor: 'rgba(64,64,64,0.6)'
    },
    wrapperRight: {
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000033',
        position: 'relative',
        bottom : 50,
        left: width*0.35
    },
    handlerRight: {
        width:"80%",
        height: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#00000066'
    }
});