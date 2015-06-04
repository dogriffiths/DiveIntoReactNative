/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var ReactTasks = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.note}
          multiline='true'
          placeholder='Enter description...'
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  note: {
    marginTop: 50,
    height: 200,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('ReactTasks', () => ReactTasks);
