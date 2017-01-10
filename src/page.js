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
    flexDirection: 'row',
    height: 125,
    borderBottomColor: constants.colors.white,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  textContainer: {
    flex: 10,
    backgroundColor: constants.colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: constants.colors.white,
    fontSize: 20,
    fontFamily: constants.fonts.sofia
  },
  moreBtnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  moreBtn: {
    flex: 1,
    backgroundColor: constants.colors.darkteal,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolbar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.pink
  },
  startBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: constants.colors.darkpink,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: constants.colors.white,
    fontSize: 25,
    fontFamily: constants.fonts.sofia
  }
});

var ExerciseListItem = React.createClass({
  render() {
    return (
      <View style={exerciseStyle.container}>
        <View style={exerciseStyle.textContainer}>
          <Text style={exerciseStyle.title}>{this.props.exercise.title}</Text>
        </View>
        <TouchableWithoutFeedback style={exerciseStyle.moreBtnContainer}>
          <View style={exerciseStyle.moreBtn}>
            <Text style={{color:constants.colors.white, fontSize: 20}}> > </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});

var ExerciseToolbar = React.createClass({
  render() {
    return (
      <View style={exerciseStyle.toolbar}>
        <TouchableWithoutFeedback>
          <View style={exerciseStyle.startBtn}>
            <Text style={exerciseStyle.btnText}>start</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
})

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

  listenForItems(list) {
    list.on('value', (snap) => {

      var items = [];
      snap.forEach((child) => {
        console.log("-----------------------");
        if (child.key === 'Cool Down') {
          console.log('Cool Down');
          console.log(child.val());
        }
        else if (child.key === 'completed') {
          console.log('Completed?');
          console.log(child.val());
        }
        else if (child.key === 'workout') {
          for (var i in child.val()) {
            var ex = child.val()[i]
            items.push({
              title: ex['exercise'],
              completed: ex['completed'],
              reps: ex['reps']
            });
          };
          console.log(items);
        }
        else if (child.key === 'exercise' || child.key === 'time') {
          if (child.key === 'exercise') {
            items.push({
              title: child.val()
            });
          } else {
            items.push({
              time: child.val()
            })
          }
          console.log(items);
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

  _renderItem(item) {
    if (item.hasOwnProperty('time')) {
      return (
        <View style={{flex:1}}>
          <Text>{item.title}</Text>
          <Text>{item.time}</Text>
        </View>
      );
    } else {
      return (
        <ExerciseListItem exercise={item}/>
      );
    }
  },

  render() {
    if (this.state.dataSource._cachedRowCount )
    return (
      <View style={{flex:1}}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this._renderItem}
          style={{flex: 1}}
          enableEmptySections={true}
        />
        <ExerciseToolbar />
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