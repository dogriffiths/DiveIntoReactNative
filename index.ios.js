/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TaskInput = require('./TaskInput');
var {
  AppRegistry,
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
    return {
      task: {
        description: '',
        active: true,
        priority: 50,
        phone: null,
      }
    };
  },
  
  render: function() {
    return (
      <ScrollView style={styles.container}>
        <TaskInput 
          value={this.state.task}
        />
      </ScrollView>
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
