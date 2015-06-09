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
    MapView,
    StyleSheet,
    Text,
    TabBarIOS,
    TouchableHighlight,
    View,
} = React;

var Tasks = React.createClass({

    getInitialState() {
        var datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          datasource: datasource.cloneWithRows(TaskStorage.all()),
          tab: 'listTab',
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
    
    _taskAnnotations() {
      var annos = TaskStorage.all().map((task) => {
        if (task.location) {
          return {title: task.description,
            latitude: task.location.latitude, longitude: task.location.longitude};
        }
        return null;
      }).filter((t)=>{return t != null});
      return annos;
    },
    
    _tasksRegion() {
      var tasks = TaskStorage.all().filter((t)=> {return t.location});
      if (tasks.length == 0) {
        return null;
      }
      var lats = tasks.map((t)=>t.location.latitude);
      var lons = tasks.map((t)=>t.location.longitude);
      var minLat = Math.min.apply(Math, lats);
      var maxLat = Math.max.apply(Math, lats);
      var minLon = Math.min.apply(Math, lons);
      var maxLon = Math.max.apply(Math, lons);
      var region = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLon + maxLon) / 2,
        latitudeDelta: 1.2 * (maxLat - minLat),
        longitudeDelta: 1.2 * (maxLon - minLon),
      };
      return region;
    },

    render() {
        return (
        <View style={styles.container}>
          <TabBarIOS
              style={{flex: 1, alignSelf: 'stretch'}}
          >
            <TabBarIOS.Item
              systemIcon='history'
              style={{flex: 1, alignSelf: 'stretch'}}
              title='Words'
              selected={this.state.tab == 'listTab'}
              onPress={() => {
                  this.setState({tab: 'listTab'});
              }}
            >
              <ListView
                dataSource={this.state.datasource}
                initialListSize={24}
                style={styles.list}
                renderRow={this._renderRow}
              />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon='downloads'
              style={{flex: 1, alignSelf: 'stretch'}}
              title='Map'
              selected={this.state.tab == 'mapTab'}
              onPress={() => {
                  this.setState({tab: 'mapTab'});
              }}
            >
              <MapView
                style={{flex: 1, alignSelf: 'stretch'}}
                region={this._tasksRegion()}
                annotations={this._taskAnnotations()}
              />
            </TabBarIOS.Item>
          </TabBarIOS>
          </View>
        );
    },

    _renderRow(task, sectionId: number, rowId: number) {
        var p = Math.round(255 * task.priority / 100);
        var color = `rgb(${p}, ${255 - p}, 0)`;
        return (
          <TouchableHighlight 
            style={styles.row}
            underlayColor='#f4f4f4'
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
    marginTop: 65,
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
