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
  SliderIOS,
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
      priority: 50,
    };
  },
  
  _renderPriority() {
    var p = Math.round(255 * this.state.priority / 100);
    var color = `rgb(${p}, ${255 - p}, 0)`;
    return (
      <Text style={{
        width: 40, 
        color,
        }}>{Math.round(this.state.priority)}%</Text>
      );
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
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          }}>
          <Text style={[styles.text, {marginRight: 15, fontSize: 16}]}>Priority</Text>
          {this._renderPriority()}
          <SliderIOS
            style={{flex: 1}}
            minimumValue='0'
            maximumValue='100'
            value={this.state.priority}
            onValueChange={(priority)=>this.setState({priority})}
          />
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
