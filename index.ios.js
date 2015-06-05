/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
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
          <TextInput
            style={[styles.textField, styles.phone]}
            placeholder='Phone'
            value={this.state.phone}
            onChangeText={(phone)=>this.setState({phone})}
            keyboardType='phone-pad'
          />
          {this._renderDialButton()}
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
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
  },
  container: {
    marginTop: 50,
    flex: 1,
    marginLeft: 15,
    marginRight: 9,
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
  phone: {
    marginRight: 5, 
    fontSize: 18,
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1, 
    alignSelf: 'stretch',
    height: 26,
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
