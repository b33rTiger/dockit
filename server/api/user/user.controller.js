'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var authService = require('../../auth/auth.service');
var User = require('./user.model');
var errorHandler = require('../../error/error.handling');

exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { errorHandler.handle(res, err, 500); }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  });
};

exports.getMe = function (req, res) {
  User.findById({_id: req.user._id})
    .populate('_boards')
    .exec(function (error, user) {
      if (error) {
        errorHandler.handle(res, error, 500);
      } else if (!user) {
        return res.json(401);
      }
      res.status(200).json(user);
    });
};
