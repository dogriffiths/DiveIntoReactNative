/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Tasks = require('./Tasks');
var TaskInput = require('./TaskInput');
var {
  AlertIOS,
  AppRegistry,
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
    var newTask = this.refs.navigator.refs.newTask.saveTask();
    this.refs.navigator.pop();
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
