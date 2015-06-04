/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var ReactTasks = React.createClass({
  getInitialState() {
    return {
      dueDate: new Date(),
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.text, styles.note]}
          multiline='true'
          placeholder='Enter description...'
        />
        <Text style={[styles.text, styles.label]}>Due date</Text>
        <DatePickerIOS
          date={this.state.dueDate}
          mode='date'
          onDateChange={(dueDate)=>this.setState({dueDate})}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  note: {
    marginTop: 50,
    marginLeft: -15,
    marginRight: -15,
    height: 200,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
});

AppRegistry.registerComponent('ReactTasks', () => ReactTasks);
