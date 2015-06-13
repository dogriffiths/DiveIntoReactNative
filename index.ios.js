'use strict';

var React = require('react-native');
var EventEmitter = require('events').EventEmitter;
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

  _onSaveClicked() {
    this.refs.navigator.refs.newTask.saveTask();
    this.refs.navigator.pop();
  },
  
  _onNewTask() {
    var eventEmitter = new EventEmitter();
    this.refs.navigator.push({
      title: 'New task',
      component: TaskInput,
      passProps: {ref: 'newTask', eventEmitter},
      rightButtonTitle: 'Save',
      onRightButtonPress: (() => {
        eventEmitter.emit('saveClicked');
      }),
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

AppRegistry.registerComponent('ReactTasks', () => ReactTasks);
