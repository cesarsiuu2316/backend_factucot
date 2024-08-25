const express = require('express');
const userController = require('../controladores/user.controllers');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/username/:username', userController.getUserByUsername);
router.post('/login', userController.loginUser);
router.post('/users', userController.CreateUser);

module.exports = router;
