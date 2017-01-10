import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Navigator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import * as firebase from 'firebase';
// import { Drawer } from 'react-native-drawer';

var constants = require('./src/constants.js');
import { NavBar } from './src/components.js';

import { HomePage } from './src/home.js';
import { SelectableList } from './src/selectableList.js';

import { StretchPage, ExercisePage } from './src/page.js';

var routes = [{title: 'sweat'}]

export var sweat = React.createClass({

  renderScene(route, navigator) {
    // Home Page
    if (route.title == 'sweat') {
      return <HomePage navigator={navigator} />
    }

    else if (route.nav.match(/\/sweat\/.*/g) != null) {
      return (
        <StretchPage 
          nav={route.nav}
          navigator={navigator}/>
      );
    }

    else if (route.nav.match(/\/workout\/.*week.*\/.*/g) != null) {
      return (
        <ExercisePage 
          nav={route.nav}
          navigator={navigator}/>
      );
    }

    // List Pages
    else {
      return (
        <SelectableList 
          navigator={navigator} 
          title={route.title}
          nav={route.nav}/>
      );
    }
  },

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={constants.colors.blue} barStyle='light-content' />
        <NavBar style={constants.navStyles.container} title='sweat' />

        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          style={{flex: 1}}
          renderScene={ this.renderScene }
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromRight
          }
        />
      </View>
    );
  }
});

AppRegistry.registerComponent('sweat', () => sweat);