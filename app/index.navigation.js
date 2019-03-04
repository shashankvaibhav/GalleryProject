/**
 * This is the navigation page for the app.
 * Used navigation library is react native router flux
 * All the scenes would be defined here
 * This page would handle which screen to show first, deeplink, main loader, main notification bar
 */

/**
 * For our case this will have two screens HomeScreen and ImageViewerScreen and notification bar
 * Loader will be used 
 */

// React native 
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, NetInfo } from 'react-native';

// Router flux
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';

//Scenes
import HomeScene from './scenes/home.scene'
import ImageViewerScene from './scenes/imageviewer.scene'

//Others
import { SCENE_BACKGROUND } from './constants/colors.constant'
import GLOBAL from './GLOBAL'

export default class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.checkInternet()
  }

  checkInternet = () => {

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.handleFirstConnectivityChange(connectionInfo);
    });

    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = (connectionInfo) => {
    let online = false;
    if (connectionInfo && connectionInfo.type == 'none') {
        online = false;
        GLOBAL.INTERNET_AVAILABLE = false;
    } else {
        online = true;
        GLOBAL.INTERNET_AVAILABLE = true;
    }
}


  render() {
    return (
      <SafeAreaView style={styles.container}>

        <Router>
          <Stack key="root">
            <Scene key="HOME" initial component={HomeScene} title="ThoughtSpot" />
            <Scene key="IMAGE_VIEWER" component={ImageViewerScene} title="Image" />
          </Stack>
        </Router>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCENE_BACKGROUND,
  }
});
