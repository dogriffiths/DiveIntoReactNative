/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    Image,
    TouchableHighlight,
    View,
} = React;

var Checkbox = React.createClass({
  getInitialState() {
      return {
          value: this.props.value,
          onValueChange: this.props.onValueChange,
      };
  },
  
  render() {
      return (
        <TouchableHighlight 
          underlayColor='#f4f4f4'
          onPress={() => {
            var value = !this.state.value;
            this.setState({value});
            this.state.onValueChange(value);
          }}
        >
          <Image 
            style={{width: 25, height: 25, margin: 15,}} 
            source={{uri: this.state.value ? 'Checked' : 'Unchecked'}} />
        </TouchableHighlight>
      );
  },
});

module.exports = Checkbox;
