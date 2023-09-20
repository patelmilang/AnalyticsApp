
const BillingModel = require('../models/billing.model');
const Pagination=require('../utils/pagination.util')

class BillingService {


  async getall(page,size) {
   const p= Pagination.getPagination(page,size)
   console.log(p);
    return BillingModel.findAndCountAll({
      limit:p.limit,
      offset:p.offset,
      
    });
  }
}
module.exports = BillingService;