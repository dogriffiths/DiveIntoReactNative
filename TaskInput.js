/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var PhoneInput = require('./PhoneInput');
var Map = require('./Map');
var TaskStorage = require('./TaskStorage');
var {
  ScrollView,
  SliderIOS,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var TaskInput = React.createClass({
  getInitialState() {
    var state = {
      id: null,
      description: '',
      active: true,
      priority: 50,
      phone: null,
    };
    var task =  this.props.task;
    if (task) {
      state = {
        id: task.id,
        description: task.description,
        active: task.active,
        priority: task.priority,
        phone: task.phone,
      };
    }
    return state;
  },
  
  componentDidMount() {
    this.props.eventEmitter.on('saveClicked', () => {
      var state = this.state;
      var task = {
        id: state.id,
        description: state.description,
        active: state.active,
        priority: state.priority,
        phone: state.phone,
      };
      TaskStorage.save(task);
      this.props.navigator.pop();
    });
  },  
  
  componentWillUnmount() {
    this.props.eventEmitter.removeAllListeners('saveClicked');
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
  
  _onPressDelete() {
    TaskStorage.delete(this.state.id);
    this.props.navigator.pop();
  },
  
  _onPressLocation() {
      var nav = this.props.navigator;
      nav.push({
        title: 'Location',
        component: Map,
        passProps: {
          mapRegion: {latitude: 0, longitude: 0, latitudeDelta: 20, longitudeDelta: 20},
        },
        rightButtonTitle: 'Set',
        onRightButtonPress: (() => {
        }),
      });
  },
  
  _renderDeleteButton() {
    if (this.state.id) {
      return (
        <View>
          <TouchableHighlight style={styles.button} onPress={this._onPressDelete}>
            <Text style={{color: '#ee0000'}}>Delete</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return null;
  },
  
  render: function() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={[styles.textField, styles.description]}
          multiline={true}
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
            minimumValue={0}
            maximumValue={100}
            value={this.state.priority}
            onValueChange={(priority)=>this.setState({priority})}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={this._onPressLocation}>
            <Text style={[styles.label, {color: '#007aff'}]}>Location</Text>
          </TouchableHighlight>
        </View>
        {this._renderDeleteButton()}
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 9,
  },
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
  button: {
    width: 63,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderWidth: 1, 
    borderRadius: 5,
    borderColor: '#ee0000',
  },
});

module.exports = TaskInput;
