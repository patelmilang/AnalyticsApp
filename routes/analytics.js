const express = require('express');
const router = express.Router();

const AnalyticsController = require('../controllers/analytics.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validatons/auth.validation');
const validate = require('../utils/validator.util');
const uploadfile=require('../middleware/upload.middleware')

router.post('/create', AuthGuard, uploadfile.uploadJson.single('credentialJson'), ErrorHandler(AnalyticsController.createAnalytics));
router.get('/detail/:id', AuthGuard, ErrorHandler(AnalyticsController.getbyId));
router.get('/update', AuthGuard, ErrorHandler(AnalyticsController.getUser));
router.get('/all/:pageid', AuthGuard, ErrorHandler(AnalyticsController.getall));
router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.' }))

module.exports = router;