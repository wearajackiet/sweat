import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';

var constants = require('./constants.js');
import {
  NavBar,
  ListItem
} from './components.js';

export var HabitsPage = React.createClass({
  render() {
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this._renderItem}
        style={{flex: 1}}
      />
    );
  }
});