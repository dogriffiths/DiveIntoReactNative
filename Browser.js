'use strict';

var React = require('react-native');
var {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View,
  WebView,
} = React;

var Map = React.createClass({
  componentDidMount() {
    this.props.eventEmitter.on('setPressed', this._onUrlSet);
  },  
  
  componentWillUnmount() {
    this.props.eventEmitter.removeAllListeners('setPressed');
  },
  
  getInitialState() {
    return {
      url: this.props.url || 'http://www.google.com',
    };
  },
  
  _onUrlSet() {
    this.props.onUrlSet(this.state.url);
    this.props.navigator.pop();
  },

  _onNavigationStateChange(navigationState) {
    this.setState({
      url: navigationState.url,
    });
  },

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          url={this.state.url}
          onNavigationStateChange={this._onNavigationStateChange}
        />
      </View>
    );
  },
});

module.exports = Map;
