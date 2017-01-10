import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
var constants = require('./constants.js');

export var NavBar = React.createClass({
  render() {
    var rightImage = require('../assets/menu.png');
    return (
      <View style={this.props.style}>
        <Image style={constants.navStyles.menu}
            source={require('../assets/menu.png')}
            resizeMode='contain' />
        <Text style={constants.navStyles.title}>{this.props.title}</Text>
        <Image style={constants.navStyles.right}
            source={rightImage}
            resizeMode='contain' />
      </View>
    );
  }    
});

const listItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: constants.colors.white,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: constants.colors.pink
  },
  title: {
    color:constants.colors.white,

  }
});

export var ListItem = React.createClass({
  _onPress() {
    this.props.navigator.push({
      title: this.props.title,
      nav: this.props.nav
    });
  },

  render() {
    return (
      <TouchableWithoutFeedback 
        style={{flex:1}}
        onPress={() => this._onPress()}>
        <View style={listItemStyle.container}>
          <Text style={listItemStyle.title}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});