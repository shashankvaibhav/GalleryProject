/**
 * This will show complete image.
 * It will have Image with Zoom in/out feature
 */

import React, { Component } from 'react';
import { View, Image, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';

//Image Zoom
import ImageZoom from 'react-native-image-pan-zoom';


export default class ImageViewerScene extends Component {
    render() {
        return (
            <ImageZoom
                style={styles.imageZoom}
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={300}
                imageHeight={300}>
                <Image style={styles.image} source={{ uri: this.props.uri }} />
            </ImageZoom>

        );
    }
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
    },
    imageZoom: {
        marginTop: -100
    }
  });
  