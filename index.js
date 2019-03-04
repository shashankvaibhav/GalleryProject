/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Index from './app/index.navigation.js';
import {name as appName} from './app.json';

/** 
 * First file which would be launched.
 * Initialize all third party libraries with their keys (Crash Reporter, Analytics) etc
 */

AppRegistry.registerComponent(appName, () => Index);
