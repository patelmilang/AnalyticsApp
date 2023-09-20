const AnalyticsService = require('../services/analytics.service');

let analyticsService = new AnalyticsService();




exports.createAnalytics = async (req, res) => {
    try {
        let jsonCredential = JSON.parse(req.file.buffer.toString());

        req.body.credentialJson = jsonCredential;
        const testResult =await this.testBigQueryConnection(req);
         
        if (testResult.result) {
            const analyticsData={
                connectionName: req.body.connectionName,
                dataSourceName:req.body.dataSourceName,
                credentialJson:req.body.credentialJson,
                projectId:req.body.projectId,
                datasetId:req.body.datasetId,
                tableId:req.body.tableId,
                createdBy:req.user.id,
                is_active:true,
                connectionSource:req.body.connectionSource,
                status:'ACTIVE'
            };
            const result = await analyticsService.createAnalytics(analyticsData);
            return res.json({
                data: result,
                message: 'Connection save successfully.'
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
        
        const result = await analyticsService.testBigQueryConnection(req);
       
        return result;
    } catch (err) {
        return res.json({
            result: false,
            message: `Test Connection Fail. Error : ${err.message}`
        });
    }

}

exports.getall = async (req, res) => {
    const result = await analyticsService.getall(req.params.pageid,10);
     return res.json({
        data: result,
        message: 'Success.'
    });
}
exports.getbyId = async (req, res) => {
    const result = await analyticsService.getbyId(req.params.id);
     return res.json({
        data: result,
        message: 'Success.'
    });
}