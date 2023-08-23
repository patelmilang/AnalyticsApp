
const AnalyticsConfigurationModel = require('../models/analyticsConfiguration.model');
 

class AnalyticsService {

    
    async loginwithGoogle(token) {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();
        const user = {
            name: name,
            email: email,
            picture: picture
        }
        return user;
    }

    async createAnalytics(analytics) {
        return AnalyticsConfigurationModel.create(analytics);
    }

    async findAnalyticsById(id) {
        return AnalyticsConfigurationModel.findByPk(id);
    }
async testBigQueryConnection(req){
    return {
        result:true
    }
}
    
}
module.exports = AnalyticsService;