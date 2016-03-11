'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
  name: { type: String, required: true },
  _lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
  description: String,
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

var Board = mongoose.model('Board', boardSchema);

module.exports = mongoose.model('Board', boardSchema);