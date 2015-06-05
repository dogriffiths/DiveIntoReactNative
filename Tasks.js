/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var TaskStorage = require('./TaskStorage');
var React = require('react-native');
var {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} = React;

var Tasks = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        TaskStorage.load(()=>{
          this.setState({datasource: ds.cloneWithRows(TaskStorage.all())});
        });
        return {
            ds,
            selected: null,
            datasource: ds.cloneWithRows(TaskStorage.all()),
        };
    },
    
    refresh() {
      this.setState({datasource: this.state.ds.cloneWithRows(TaskStorage.all())});
    },

    _pressRow(rowID, rowStuff) {
    },

    render() {
        return (
                <View style={styles.container}>
                <ListView
            dataSource={this.state.datasource}
            initialListSize='24'
            style={styles.list}
            renderRow={this._renderRow}
                 />
            </View>
        );
    },

    _renderRow(rowStuff, sectionID: number, rowID: number) {
        var style = styles.listText;
        if (rowID == this.state.selected) {
            style=styles.listTextSelected;
        }
        return (
          <TouchableHighlight onPress={() => this._pressRow(rowID, rowStuff)}>
            <Text numberOfLines='1' style={style}>{rowStuff.description}</Text>
          </TouchableHighlight>);
    }
});

var styles = StyleSheet.create({
    list: {
        height: 100,
        alignSelf: 'stretch',
    },
    listText: {
        fontSize: 16,
        lineHeight: 32,
        marginLeft: 5,
    },
    listTextSelected: {
        fontSize: 28,
        color: 'red',
        containerBackgroundColor: '#ccffff',
    },
    overlay: {
        containerBackgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontSize: 32,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Tasks;
