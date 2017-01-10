import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
var constants = require('./constants.js');

const exerciseStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 5,
    backgroundColor: constants.colors.blue
  },
  moreBtn: {
    flex: 1,
    backgroundColor: constants.colors.pink
  }
});

var ExerciseListItem = React.createClass({
  render() {
    return (
      <View style={exerciseStyle.container}>
        <View style={exerciseStyle.textContainer}>
        </View>
        <TouchableWithoutFeedback style={exerciseStyle.moreBtn}>
          <View style={{flex:1}}>
            <Text> > </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});

export var StretchPage = React.createClass({
  _renderItem() {
    return (
      <ExerciseListItem />
    );
  },

  render() {
    return (
      <View style={{flex:1}}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this._renderItem}
          style={{flex: 1}}
          enableEmptySections={true}
        />
      </View>
    );
  }
});

export var ExercisePage = React.createClass({
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
        console.log(child.val());
        if (child.key == 'Cool Down') {
          console.log('Cool Down');
        }
        else if (child.key != 'completed') {
          items.push({
            title: 'Circuit ' + child.key,
            ex1: child.val().key
          });
        }
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  },

  componentWillMount() {
    this.listenForItems(constants.database.ref(this.props.nav));
  },
  _renderItem() {
    return (
      <ExerciseListItem />
    );
  },

  render() {
    return (
      <View style={{flex:1}}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this._renderItem}
          style={{flex: 1}}
          enableEmptySections={true}
        />
      </View>
    );
  }
});




// const listItemStyle = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 40,
//     borderColor: constants.colors.white,
//     borderStyle: 'solid',
//     borderTopWidth: 1,
//     padding: 10,
//     backgroundColor: constants.colors.blue
//   },
//   title: {
//     color:constants.colors.white,

//   }
// });

// export var ListItem = React.createClass({
//   _onPress() {
//     this.props.navigator.push({
//       title: this.props.title,
//       nav: this.props.nav
//     });
//   },

//   render() {
//     return (
//       <TouchableWithoutFeedback 
//         style={{flex:1}}
//         onPress={() => this._onPress()}>
//         <View style={listItemStyle.container}>
//           <Text style={listItemStyle.title}>{this.props.title}</Text>
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   }
// });