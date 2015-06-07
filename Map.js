/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    MapView,
    StyleSheet,
    Text,
    View,
} = React;

var Map = React.createClass({
  componentDidMount() {
    this.props.eventEmitter.on('setPressed', this._onLocationSet);
  },  
  
  componentWillUnmount() {
    this.props.eventEmitter.removeAllListeners('setPressed');
  },
  
  getInitialState() {
      return {
          mapRegion: this.props.mapRegion,
      };
  },
  
  _onLocationSet() {
    this.props.onLocationSet(this.state.mapRegion);
    this.props.navigator.pop();
  },

  _onRegionChangeComplete(region) {
    this.setState({
      mapRegion: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }
    });
  },

  render() {
      return (
        <View style={styles.container}>
          <MapView
            ref="map"
            style={{flex: 1, alignSelf: 'stretch'}}
            region={this.props.mapRegion}
            showsUserLocation={this.state.mapRegion === null}
            onRegionChangeComplete={this._onRegionChangeComplete}
          />
        </View>
      );
  },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

module.exports = Map;
