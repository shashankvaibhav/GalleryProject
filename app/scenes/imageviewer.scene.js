/**
 * This will show complete image.
 * It will have Image with Zoom in/out feature
 */

import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';

//Image Zoom
import ImageZoom from 'react-native-image-pan-zoom';

import { LOADING_TEXT } from '../constants/string.constant'


export default class ImageViewerScene extends Component {
    constructor(props) {
        super(props)
        this.state = { loaded: false }
    }

    _onLoad = () => {
        this.setState(() => ({ loaded: true }))
    }

    render() {
        return (
            <View>
                {!this.state.loaded ? (
                    <View style={styles.loadingWrapper}>
                        <Text>{LOADING_TEXT }</Text>
                    </View>
                ) : (
                        null
                    )}

                <ImageZoom
                    style={styles.imageZoom}
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={300}
                    imageHeight={300}>
                    <Image style={styles.image} source={{ uri: this.props.uri }} onLoad={this._onLoad} />
                </ImageZoom>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    imageZoom: {
        marginTop: -100
    },
    loadingWrapper:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, 
        justifyContent:'center', 
        alignItems:'center'
    }
});
