/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TaskInput = require('./TaskInput');
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
  getInitialState() {
    AsyncStorage.removeItem('tasks');
    return {};
  },

  _onSaveTask() {
    var nav = this.refs.navigator;
    var newTask = nav.refs.newTask.state;
    AsyncStorage.getItem('tasks')
    .then((tasksString)=> {
      var tasks = null;
      if (tasksString !== null) {
        tasks = JSON.parse(tasksString);
        tasks.push(newTask);
      } else {
        tasks = [newTask];
      }
      AsyncStorage.setItem('tasks', JSON.stringify(tasks))
      .catch((error) => {
        AlertIOS.alert('Storing tasks', error.message);
      });
      nav.pop();
    })
    .catch((error) => {
      AlertIOS.alert('Reading tasks', error.message);
    });
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
          component: View,
          title: 'Tasks',
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
