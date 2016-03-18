'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./list.controller');
var auth = require('../../auth/auth.service');

router.get('/:boardId', auth.isAuthenticated(), controller.showLists);
router.post('/create', auth.isAuthenticated(), controller.create);
router.post('/update/:listId', auth.isAuthenticated(), controller.edit);
router.post('/delete', auth.isAuthenticated(), controller.delete);

module.exports = router;
