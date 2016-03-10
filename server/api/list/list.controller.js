'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Board = require('../board/board.model');
var User = require('../user/user.model');
var List = require('./list.model');
var Todo = require('../todo/todo.model');
var errorHandler = require('../../error/error.handling');

exports.showLists = function (req, res) {
  console.log('made it to show list controller server side');
  var loggedUserId = req.user._id;
  console.log('loggedUserId', loggedUserId);
  var boardId = req.params.boardId;
  console.log('req.params.boardId', boardId);
  User.findOne({ _id: loggedUserId})
    .exec(function (error, foundUser) {
      if (error) {
        console.log(error);
        errorHandler.handle(res, error, 404);
      } else if (foundUser) {
        console.log(foundUser);
        List.find({ _board: boardId})
        .populate('todos')
        .exec(function (error, lists) {
          if (error) {
            errorHandler.handle(res, error, 404);
          } else if (lists) {
            res.json(lists)
          }
        })
      }
    });
}

exports.create = function (req, res) {
  var boardId = req.body.boardId;
  var list = new List ({
    name: req.body.name,
    description: req.body.description,
    _board: boardId
  });

  list.save(function (error, list) {
    if (error) {
      errorHandler.handle(res, error, 500);
    } else if (list) {
      res.json(list)
    }
  })
}

exports.edit = function (req, res) {
  var list = { _id: req.params.listId};
  List.update(list, {name: req.body.name}, {description: req.body.description}, function (error, list) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (list) {
      List.find({}, function (error, lists) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (lists) {
          res.json(lists)
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