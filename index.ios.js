/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Tasks = require('./Tasks');
var TaskInput = require('./TaskInput');
var TaskStorage = require('./TaskStorage');
var {
  AlertIOS,
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  ScrollView,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var ReactTasks = React.createClass({

  _onSaveTask() {
    var nav = this.refs.navigator;
    var newTask = nav.refs.newTask.state;
    TaskStorage.save(newTask, ()=>{nav.refs.tasks.refresh(); nav.pop();});
  },
  
  _onNewTask() {
    this.refs.navigator.push({
      title: 'New task',
      component: TaskInput,
      passProps: {ref: 'newTask'},
      rightButtonTitle: 'Save',
      onRightButtonPress: this._onSaveTask,
    });
  },
  
  render: function() {
    return (
      <NavigatorIOS
        ref="navigator"
        initialRoute={{
          component: Tasks,
          title: 'Tasks',
          passProps: {ref: 'tasks'},
          rightButtonTitle: 'New',
          onRightButtonPress: this._onNewTask,
          }}
        style={{flex: 1}}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    marginLeft: 15,
    marginRight: 9,
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

AppRegistry.registerComponent('ReactTasks', () => ReactTasks);
