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

export var SelectableList = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  },

  getDOWIndex(items, day) {
    return items.map(function(e) { return e.title }).indexOf(day);
  },

  listenForItems(list) {
    list.on('value', (snap) => {

      var items = [];
      snap.forEach((child) => {
        if (child.key != 'completed') {
          items.push({
            title: child.key,
            completed: child.val().completed
          });
        }
      });

      // Sort days of hte week.
      if (items.filter(function(e) {return e.title === 'Monday'}).length > 0) {
        var newArr = [];
        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (var d = 0; d < 6; d++) {
          newArr.push(items[this.getDOWIndex(items, days[d])]);
        }
        items = newArr;
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  },

  componentWillMount() {
    this.listenForItems(constants.database.ref(this.props.nav));
  },

  _renderItem(item) {
    var nav = this.props.nav + '/' + item.title
    return (
      <ListItem
        title={item.title}
        nav={nav}
        completed={item.completed}
        navigator={this.props.navigator} />
    );
  },

  render() {
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this._renderItem}
        style={{flex: 1}}
        enableEmptySections={true}
      />
    );
  }
});