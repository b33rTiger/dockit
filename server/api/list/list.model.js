'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
  name: { type: String, required: true },
  _todos: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
  description: String,
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
})

var List = mongoose.model('List', listSchema);

module.exports = mongoose.model('List', listSchema);