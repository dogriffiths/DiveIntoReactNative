/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var TaskInput = require('./TaskInput');
var EventEmitter = require('events').EventEmitter;
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
        var datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            datasource: datasource.cloneWithRows(TaskStorage.all()),
        };
    },

    componentDidMount() {
      TaskStorage.on(TaskStorage.CHANGE_EVENT, this._refresh);

      TaskStorage.load();
    },

    componentWillUnmount() {
      TaskStorage.removeListener(TaskStorage.CHANGE_EVENT, this._refresh);
    },

    _refresh() {
      this.setState({datasource: this.state.datasource.cloneWithRows(TaskStorage.all())});
    },

    _pressRow(rowId, task) {
      var eventEmitter = new EventEmitter();
      var nav = this.props.navigator;
      nav.push({
        title: 'Edit task',
        component: TaskInput,
        passProps: {ref: 'editTask', task: task, eventEmitter},
        rightButtonTitle: 'Save',
        onRightButtonPress: (() => {
          eventEmitter.emit('saveClicked');
        }),
      });
    },

    render() {
        return (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.datasource}
              initialListSize={24}
              style={styles.list}
              renderRow={this._renderRow}
            />
          </View>
        );
    },

    _renderRow(task, sectionId: number, rowId: number) {
        var p = Math.round(255 * task.priority / 100);
        var color = `rgb(${p}, ${255 - p}, 0)`;
        return (
          <TouchableHighlight 
            style={styles.row}
            onPress={() => this._pressRow(rowId, task)}
          >
            <View style={{marginLeft: 5}}>
              <Text numberOfLines={1} style={{fontSize: 16}}>
                {task.description}
              </Text>
              <Text style={{fontSize: 12, color,}}>{Math.round(task.priority)}%</Text>
            </View>
          </TouchableHighlight>);
    }
});

var styles = StyleSheet.create({
  list: {
      height: 100,
      alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

module.exports = Tasks;
