'use strict';

var React = require('react-native');
var PropTypes = require('ReactPropTypes');

var {
  Image,
  TouchableHighlight,
  Text,
  View,
} = React;

var SWITCH = 'switch';

var Checkbox = React.createClass({
  propTypes: {
    onValueChange: PropTypes.func,
  },
  
  getDefaultProps() {
    return {
      value: false,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  _onChange: function(newValue) {
    this.setState({value: newValue});
    this.props.onValueChange && this.props.onValueChange(newValue);
    this.props.value = newValue;
  },
  
  render() {
    return (
      <TouchableHighlight 
        underlayColor='#f4f4f4'
        onPress={() => {
          this._onChange(!this.state.value);
        }}
      >
        <View>
        <Image 
          style={{width: 25, height: 25, margin: 15,}} 
          source={{uri: this.props.value ? 'Checked' : 'Unchecked'}} />
        </View>
      </TouchableHighlight>
    );
  },
});

module.exports = Checkbox;
