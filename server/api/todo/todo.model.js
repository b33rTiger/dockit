'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  name: { type: String, required: true },
  _list: [{ type: Schema.Types.ObjectId, ref: 'List'}],
  completed: Boolean
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = mongoose.model('Todo', todoSchema);