'use strict';

var config = require('../config/environment');

exports.handle = function (res, error, status) {
  res.status(status).json({error: error});
}