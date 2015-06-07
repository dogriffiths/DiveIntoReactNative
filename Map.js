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

    getInitialState() {
        return {
            mapRegion: this.props.mapRegion 
            || {latitude: 0, longitude: 0, latitudeDelta: 80, longitudeDelta: 80},
        };
    },

    render() {
        return (
                <View style={styles.container}>
                <MapView
            style={{flex: 1, alignSelf: 'stretch'}}
            region={this.state.mapRegion}
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
