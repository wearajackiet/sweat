import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import * as firebase from 'firebase';

var constants = require('./constants.js');
import {
  ListItem,
  NavBar
} from './components.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75
  },
  sectionTitle: {
    fontFamily: 'Sofia Pro',
    color: constants.colors.white,
    fontSize: 30
  },
  workout: {
    backgroundColor: constants.colors.blue
  },
  stretch: {
    backgroundColor: constants.colors.pink
  },
  habits: {
    backgroundColor: constants.colors.teal
  }
});

export var HomePage = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Section 
          title='workout' 
          style={styles.workout} 
          navigator={this.props.navigator} />
        <Section 
          title='stretch' 
          style={styles.stretch} 
          navigator={this.props.navigator} />
        <Section 
          title='habits' 
          style={styles.habits} 
          navigator={this.props.navigator} />
      </View>
    );
  }
});

var Section = React.createClass({
  getImage() {
    switch (this.props.title) {
      case 'workout':
        return require('../assets/workout.png');
      case 'stretch':
        return require('../assets/stretch.png');
      case 'habits':
        return require('../assets/habits.png');
    }
  },

  _onPress() {
    this.props.navigator.push({
      title: this.props.title,
      nav: '/'+this.props.title
    });
  },

  render() {
    var section = this.props.title;
    return (
      <TouchableWithoutFeedback 
        style={{flex:1}}
        ref={section}
        onPress={() => this._onPress(section)}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{flex:1}} resizeMode='cover'
           source={this.getImage()}>
            <View style={[styles.section, this.props.style]}>
              <Text style={styles.sectionTitle}>{section}</Text>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
})