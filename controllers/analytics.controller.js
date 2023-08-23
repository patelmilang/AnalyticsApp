const AnalyticsService = require('../services/analytics.service');

let analyticsService = new AnalyticsService();
 



exports.createAnalytics = async (req, res) => {
    try {
        const testResult = this.testBigQueryConnection(req);
        if (testResult.data) {
            const result = await analyticsService.createAnalytics(req.body);
            return res.json({
                data: result,
                message: 'User registered successfully.'
            });
        }
        else {
            return res.json({
                data: [],
                message: testResult.message
            });
        }
    } catch (err) {
        return res.json({
            data: [],
            message: `Test Connection Fail. Error : ${err.message}`
        });
    }

}


exports.testBigQueryConnection = async (req, res) => {
    try {
        const result = await analyticsService.testBigQueryConnection(req.body);
        return res.json({
            data: true,
            message: ''
        });
    } catch (err) {
        return res.json({
            data: false,
            message: `Test Connection Fail. Error : ${err.message}`
        });
    }

}