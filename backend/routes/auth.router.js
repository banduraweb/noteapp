const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registration);
router.get('/login', UserController.login);

module.exports = router;
