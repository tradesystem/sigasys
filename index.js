/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import Navigator from './src/navigator'

AppRegistry.registerComponent(appName, () => Navigator)
