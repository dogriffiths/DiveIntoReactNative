/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AlertIOS,
  AsyncStorage,
} = React;

var STORAGE_KEY='ReactTasks:tasks';

var _tasks = [];

var TaskStorage = {

  load(callback) {
    AsyncStorage.getItem(STORAGE_KEY)
    .then((tasksString) => {
      if (tasksString !== null) {
        _tasks = JSON.parse(tasksString);
      }
      callback();
    })
    .catch((error) => {
      AlertIOS.alert('Reading tasks', error.message);
    })
    .done();

  },
  
  all() {
    return _tasks;
  },
  
  save(newTask, callback) {
    newTask.id = _tasks.length;
    _tasks.push(newTask);
    this._saveTasks();
    if (callback) {
      callback();
    }
  },
  
  _saveTasks() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_tasks))
    .catch((error) => {
      AlertIOS.alert('Storing tasks', error.message);
    })
    .done();
  },

};

module.exports = TaskStorage;
