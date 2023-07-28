const logger = require('../logger/logger');

module.exports = fn => (req, res, next) => {
     
    fn(req, res, next).catch((err) => {
        logger.error(err)
        res.status(500).json({ 
            message: err?.message || 'Something went wrong.' 
        });
    });
}
