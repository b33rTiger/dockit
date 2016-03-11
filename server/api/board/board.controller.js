'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Board = require('./board.model');
var User = require('../user/user.model');
var List = require('../list/list.model');
var Todo = require('../todo/todo.model');
var errorHandler = require('../../error/error.handling');

exports.showBoards = function (req, res) {
  var loggedUserId = req.user._id;
  User.findOne({ _id: loggedUserId})
    .populate('_boards')
    .exec(function (error, foundUser) {
      if (error) {
        errorHandler.handle(res, error, 404);
      } else if (foundUser) {
        console.log(foundUser);
        res.json(foundUser._boards);
      }
    });
}

exports.create = function (req, res) {
  var owner = req.user._id;
  var board = new Board ({
    name: req.body.name,
    _owner: owner
  });

  board.save(function (error, data) {
    if (data) {
      User.findOne({_id: owner}, function (error, owner) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else {
          var id = mongoose.Types.ObjectId(owner._id);
          owner._boards.push(data._id);
          owner.save();
          res.json(data);
        }
      });
    } else if (error) {
      errorHandler.handle(res, error, 500);
    }
  });
}

exports.edit = function (req, res) {
  var board = { _id: req.params.boardId};
  Board.update(board, {name: req.body.name}, {description: req.body.description}, function (error, board) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (board) {
        res.json(board)
    }
  })
}

exports.delete = function (req, res) {
  var todo = new Todo ({ _list: req.params.listId});
  todo.remove(function (error, todo) {
    if (error) {
      errorHandler.handle(res, error, 404);
    } else if (todo) {
      var list = new List ({ _board: req.params.boardId})
      list.remove(function (error, list) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else if (list) {
          var board = new Board ({ _id: req.params.boardId})
          board.remove(function (error, board) {
            if (error) {
              errorHandler.handle(res, error, 404);
            } else if (board) {
              res.json(board)
            }
          })
        }
      })
    }
  })
}