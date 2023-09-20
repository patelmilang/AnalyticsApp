const BillingService = require('../services/billing.service');

let billingService = new BillingService();



 

exports.getall = async (req, res) => {
    const result = await billingService.getall(req.params.pageid,10);
     return res.json({
        data: result,
        message: 'Success.'
    });
}
