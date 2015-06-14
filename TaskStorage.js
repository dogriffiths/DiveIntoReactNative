'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var uuid = require('node-uuid');
var React = require('react-native');
var {
  AlertIOS,
  AsyncStorage,
} = React;

var STORAGE_KEY='ReactTasks:tasks';

var _tasks = {};

var TaskStorage = assign({}, EventEmitter.prototype, {

  CHANGE_EVENT: 'change',

  load(callback) {
    AsyncStorage.getItem(STORAGE_KEY)
    .then((tasksString) => {
      if (tasksString !== null) {
        _tasks = JSON.parse(tasksString);

        this.emit(this.CHANGE_EVENT);
      }
    })
    .catch((error) => {
      AlertIOS.alert('Reading tasks', error.message);
    })
    .done();
  },
  
  all() {
    var tasksArray = [];

    for (var taskId in _tasks) {
      if (_tasks.hasOwnProperty(taskId)) {
        tasksArray.push(_tasks[taskId]);
      }
    }
    
    return tasksArray.sort((a, b) => {
      return b.priority - a.priority;
    });
  },
  
  get(id) {
    return _tasks[id];
  },
  
  save(task) {
    if (task.id === null) {
      task.id = uuid.v4();
    }
    _tasks[task.id] = task;
    this._saveTasks();
  },
  
  delete(taskId) {
    delete _tasks[taskId];
    this._saveTasks();
  },
  
  _saveTasks() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_tasks))
    .catch((error) => {
      AlertIOS.alert('Storing tasks', error.message);
    }).done();

    this.emit(this.CHANGE_EVENT);
  },

});

module.exports = TaskStorage;
