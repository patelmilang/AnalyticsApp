const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validatons/auth.validation');
const validate = require('../utils/validator.util');
const uploadfile=require('../middleware/upload.middleware')
const bodyParser = require("body-parser");
router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login', validate(schema.login),ErrorHandler(AuthController.login));
router.post('/google_login', ErrorHandler(AuthController.googlelogin));
router.get('/verify/:id/:token', ErrorHandler(AuthController.verify_account));
router.get('/detail', AuthGuard, ErrorHandler(AuthController.getUser));
// router.get('/all', AuthGuard, ErrorHandler(AuthController.getUser));
router.get('/logout', AuthGuard, ErrorHandler(AuthController.logout));
router.put('/reset-password', AuthGuard, ErrorHandler(AuthController.resetpassword));
router.post('/update' ,   AuthGuard, uploadfile.upload.single('profile_image'),AuthController.update);

router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.' }))

module.exports = router;