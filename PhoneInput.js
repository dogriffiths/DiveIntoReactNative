/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AlertIOS,
  LinkingIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var canDial = false;

LinkingIOS.canOpenURL('tel:11111', (supported) => {canDial = supported;});

var PhoneInput = React.createClass({
  getInitialState() {
    return {
      phone: this.props.value,
      onValueChange: this.props.onValueChange,
    };
  },
  
  _onPressDial() {
    AlertIOS.alert('Phone', `Dial ${this.state.phone}?`, [
      {text: 'OK', onPress: () => {
        if (this.state.phone) {
          var dialUrl = `tel:${this.state.phone}`;
          LinkingIOS.openURL(dialUrl);
        }
      }},
      {text: 'Cancel'},
    ]);
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
      <View style={styles.row}>
        <TextInput
          style={[styles.textField, styles.phone]}
          placeholder='Phone'
          value={this.state.phone}
          onChangeText={(phone)=>{
            this.setState({phone});
            if (this.props.onValueChange) {
              this.props.onValueChange(phone);
            }
          }}
          keyboardType='phone-pad'
        />
        {this._renderDialButton()}
      </View>
    );
  }
});

var touchTint = '#007aff';

var styles = StyleSheet.create({
  textField: {
    fontSize: 18,
    containerBackgroundColor: 'rgba(0, 0, 0, 0)',
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

module.exports = PhoneInput;
