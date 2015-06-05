/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var PhoneInput = require('./PhoneInput');
var {
  ScrollView,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  View,
} = React;

var TaskInput = React.createClass({
  getInitialState() {
    return {
      description: '',
      active: true,
      priority: 50,
      phone: null,
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
      <View>
        <TextInput
          style={[styles.textField, styles.description]}
          multiline='true'
          placeholder='Enter description...'
          value={this.state.description}
          onChangeText={(description)=>this.setState({description})}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 6}}>
          <Text style={styles.label}>Active</Text>
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 6}}>
            <SwitchIOS
              value={this.state.active}
              onValueChange={(active)=>this.setState({active})}
            />
          </View>
        </View>
        <View style={styles.row}>
          <PhoneInput
            value={this.state.phone}
            onValueChange={(phone)=>this.setState({phone})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Priority</Text>
          {this._renderPriority()}
          <SliderIOS
            style={{flex: 1, alignItems: 'flex-end'}}
            minimumValue='0'
            maximumValue='100'
            value={this.state.priority}
            onValueChange={(priority)=>this.setState({priority})}
          />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  textField: {
    fontSize: 18,
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
  },
  label: {
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
    marginRight: 15, 
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  description: {
    marginBottom: 15,
    padding: 5,
    height: 100,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopColor: '#c0c0c0',
    borderTopWidth: 0.5,
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

module.exports = TaskInput;
