'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var Todo = require('./todo.model');
var List = require('../list/list.model');

var errorHandler = require('../../error/error.handling');

exports.index = function (req, res) {
  var loggedUserId = req.user._id;
  var listId = req.query.listId;
  User.findOne({ _id: loggedUserId})
  .exec(function (error, foundUser) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (foundUser) {
      Todo.find({ _list: listId})
      .exec(function (error, todos) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (todos) {
          res.json(todos);
        }
      })
    }
  })
}

exports.create = function (req, res) {
  var listId = req.body.listId;
  var todo = new Todo({
    name: req.body.name,
    _list: listId
  })
  todo.save(function (error, todo) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (todo) {
      List.findOne({ _id: listId}, function (error, list) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (list) {
          var id = mongoose.Types.ObjectId(todo._id);
          list.todos.push(id)
          list.save()
          res.json(todo)
        }
      })
    }
  })
}

exports.edit = function (req, res) {
  var listId = req.body.listId;
  var todo = { _id: req.params.todoId};
  Todo.update(todo, {name: req.body.name}, function (error, todo) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (todo) {
      Todo.find({_list: listId}, function (error, todos) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (todos) {
          res.json(todos)
        }
      })
    }
  })
}

exports.delete = function (req, res) {
  var todo = new Todo ({ _list: req.params.listId});
  todo.remove(function (error, todo) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (todo) {
      var list = new List ({ _id: req.params.listId})
      list.remove(function (error, list) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (list) {
          res.json(list)
        }
      })
    }
  })
}