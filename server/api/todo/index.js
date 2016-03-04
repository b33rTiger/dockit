'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./todo.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/create', auth.isAuthenticated(), controller.create);
router.post('/update/:todoId', auth.isAuthenticated(), controller.edit);
router.post('/delete/:todoId', auth.isAuthenticated(), controller.delete);


module.exports = router;
