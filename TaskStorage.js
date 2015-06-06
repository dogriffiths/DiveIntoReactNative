/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var React = require('react-native');
var {
  AlertIOS,
  AsyncStorage,
} = React;

var STORAGE_KEY='ReactTasks:tasks';

var _tasks = [];

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
    return _tasks;
  },
  
  save(task) {
    if (task.id !== null) {
      _tasks[task.id] = task;
    } else {
      task.id = _tasks.length;
      _tasks.push(task);
    }
    this._saveTasks();
  },
  
  _saveTasks() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_tasks))
    .catch((error) => {
      AlertIOS.alert('Storing tasks', error.message);
    })
    .done();

    this.emit(this.CHANGE_EVENT);
  },

});

module.exports = TaskStorage;
