const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validate = require('../middleware/validation');
const { isGuest } = require('../middleware/auth');

router.get('/register', isGuest, authController.registerPage);
router.post('/register', isGuest, registerValidator, validate, authController.register);

router.get('/login', isGuest, authController.loginPage);
router.post('/login', isGuest, loginValidator, validate, authController.login);

router.get('/logout', authController.logout);

module.exports = router;
