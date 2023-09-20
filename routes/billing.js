const express = require('express');
const router = express.Router();

const BillingController = require('../controllers/billing.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
 
 
router.get('/all/:pageid', AuthGuard, ErrorHandler(BillingController.getall));
router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.' }))

module.exports = router;