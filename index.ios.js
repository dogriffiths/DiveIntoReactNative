/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  DatePickerIOS,
  ScrollView,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  View,
} = React;

var ReactTasks = React.createClass({
  getInitialState() {
    return {
      description: '',
      dueDate: new Date(),
      active: true,
    };
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={[styles.text, styles.note]}
          multiline='true'
          placeholder='Enter description...'
          value={this.state.description}
          onChangeText={(description)=>this.setState({description})}
        />
        <Text style={[styles.text, styles.label]}>Due date</Text>
        <DatePickerIOS
          date={this.state.dueDate}
          mode='date'
          onDateChange={(dueDate)=>this.setState({dueDate})}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          }}>
          <SwitchIOS
            value={this.state.active}
            onValueChange={(active)=>this.setState({active})}
          />
          <Text style={[styles.text, {marginLeft: 15, fontSize: 16}]}>Active</Text>
        </View>
      </ScrollView>
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
