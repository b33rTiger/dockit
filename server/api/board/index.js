'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./board.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.showBoards);
router.post('/create', auth.isAuthenticated(), controller.create);
router.post('/update/:boardId', auth.isAuthenticated(), controller.edit);
router.post('/delete/:boardId', auth.isAuthenticated(), controller.delete);

module.exports = router;
