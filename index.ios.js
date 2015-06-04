/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  DatePickerIOS,
  LinkingIOS,
  ScrollView,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var canDial = false;

LinkingIOS.canOpenURL('tel:11111', (supported) => {canDial = supported;});


var ReactTasks = React.createClass({
  getInitialState() {
    return {
      description: '',
      dueDate: new Date(),
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
  
  _onPressDial() {
    if (this.state.phone) {
      var dialUrl = `tel:${this.state.phone}`;
      LinkingIOS.openURL(dialUrl);
    }
  },
  
  _renderDialButton() {
    if (canDial) {
      if (this.state.phone) {
        return (
          <View style={{marginLeft: 15}}>
            <TouchableHighlight style={styles.button} onPress={this._onPressDial}>
              <Text style={{color: touchTint}}>Dial</Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={[styles.disabledButton, {marginLeft: 15}]}>
            <Text style={{color: '#c0c0c0'}}>Dial</Text>
          </View>
        );
      }
    }
    return null;
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={[styles.textField, styles.note]}
          multiline='true'
          placeholder='Enter description...'
          value={this.state.description}
          onChangeText={(description)=>this.setState({description})}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}>
          <Text style={styles.label}>Active</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <SwitchIOS
              value={this.state.active}
              onValueChange={(active)=>this.setState({active})}
            />
          </View>
        </View>
        <View style={styles.withSideLabel}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.textField, {flex: 1}]}
            placeholder='XX-XXX-XXXX'
            value={this.state.phone}
            onChangeText={(phone)=>this.setState({phone})}
            keyboardType='phone-pad'
          />
          {this._renderDialButton()}
        </View>
        <View style={styles.withSideLabel}>
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
        <View style={styles.withSideLabel}>
          <Text style={styles.label}>Due date</Text>
        </View>
        <DatePickerIOS
          date={this.state.dueDate}
          mode='date'
          onDateChange={(dueDate)=>this.setState({dueDate})}
        />
      </ScrollView>
    );
  }
});

var touchTint = '#007aff';

var styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  textField: {
    fontSize: 18,
    //padding: 15,
    borderColor: '#c0c0c0', 
    borderWidth: 1,
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
  },
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
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
  note: {
    marginTop: 50,
    marginBottom: 15,
    padding: 5,
    height: 100,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  withSideLabel: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: '#c0c0c0',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderWidth: 1, 
    borderRadius: 5,
    borderColor: touchTint,
  },
  disabledButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderWidth: 1, 
    borderRadius: 5,
    borderColor: '#c0c0c0'
  },
});

AppRegistry.registerComponent('ReactTasks', () => ReactTasks);
