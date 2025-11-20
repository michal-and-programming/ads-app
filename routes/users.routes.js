const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');

router.get('/user', users.infoUser);

module.exports = router;