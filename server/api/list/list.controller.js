'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Board = require('../board/board.model');
var User = require('../user/user.model');
var List = require('./list.model');
var Todo = require('../todo/todo.model');
var errorHandler = require('../../error/error.handling');

exports.showLists = function (req, res) {
  var boardId = req.params.boardId;
  Board.findOne({_id: boardId})
  .populate('_lists')
  .exec(function (error, foundLists) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (foundLists) {
      console.log(foundLists);
      res.json(foundLists);
    }
  })
}

exports.create = function (req, res) {
  console.log(req.body.boardId);
  var boardId = req.body.boardId;
  var id = mongoose.Types.ObjectId(boardId);
  var list = new List ({
    name: req.body.name,
    _board: id
  });

  list.save(function (error, lists) {
    if (error) {
      errorHandler.handle(res, error, 500);
    } else if (lists) {
      console.log(lists);
      res.json(lists)
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