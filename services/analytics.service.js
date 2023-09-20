
const AnalyticsConfigurationModel = require('../models/analyticsConfiguration.model');
const { BigQuery } = require('@google-cloud/bigquery');
const Pagination=require('../utils/pagination.util')

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
  async testBigQueryConnection(req) {
    try {
      const bigqoptions = {
        //keyFilename: 'public/asset/service_account.json',
        projectId: req.body.projectId,//'analytics-models-309317',
        credentials: {
          client_email: req.body.credentialJson.client_email,//'analytics-model-ec2@analytics-models-309317.iam.gserviceaccount.com',
          private_key: req.body.credentialJson.private_key,//'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdgTjV+zaZ2Ibd\nQSlmdg5tc/qiKTJEkmUsa/3qpjCmdXM8rXpfp8NNKuPctIosn4J9mGzUQhPgPHij\n8HqRcDoS3NZr3fdJwTgo328U2JIdQWBccmVj8L4F7EZM3WbeaLvfXjYqakVX5hAw\ndf0E05LftdsLY+Two0SNUdpAB7bAEqIQEuKpYafTUWosxxtNV9/hrHyIH1oOEc0e\nE3OQZuzcl3l+L9s64CEv9Cz8a8NXPf0ZUiguHNYW55SfbQ8Z0ItbxuWVaoH9+Fzv\nQEzZ4mseSwII7lVpS1+weLWCV5lWhy+DJWZV9AbgqKD6U5hS++JK1ZhbLXSc8xef\nPmd3RoeTAgMBAAECggEABWcw1CTDBPIPMx927enjQtDCUOli4ESGLfwiZytLHfRU\nS+LGzbZxyUyAXP2tUJL3cgGJmJp2F7COkhxZlNjc7r3rde9uYHXwmQ5ZJcW49XUp\nrhVkJWwiLw47UL9QaRUxfk8hqPQH676brZEbaRzGiOAYyVvXt1DFtQ3EYLZWOy6B\nB9byrFt9+sG42mox7vgmQcIc0GLAyIVbKa3BXKr6z2GVxbIu1cafvTTFD8qMNkRw\n4r/B5Pkfb4oRPCmowGZpIm6mQ3HSp8ixmImgisMMMvBjaTBJm29zpK8cBkn66+8U\nFfTGSIfpNHKl30LO9bdY6StltBkHCpODhfSSmYlpKQKBgQDaEaFi4bKw8AyLHd8Y\nhfeZ0zhw9XibHfC7QVUEtmfg42vA3MmSE1KBSgPVUVORjDSPPxA2+8N2dgl4JdIb\nyq8xb51xdyTZNnonu0JE+lv1/RwjxUOgs1qVTVVtwrr7bo86+gL37pAE8SvgWQyy\nvfP+50Ae9NuKC4Puxsccd+7+XQKBgQC45r0BDgNHtNJdGHFpMk/xHuwWxDAkwEnT\nRqa4i3qbv6UQr/rY0PAV1xPz8kjFRjynFY46t+R/XjJyCF0D+QblRTWO717+v96c\njAKlDxnO7ZoXxU6EpOBWxamcQxtlr/2Z0uRSm5yP6XI9dqKgkDxycMfF7ngu45WX\nIY8S6nrerwKBgDUb4Bst7pALFnL3JnNZhTDQcUmJbwMQKqXgRm1sYyYxHPgOjYTm\n8cwNE5vrP5gN9msAp9lMPZFnM+0wANjF5x76GPUeWDoSe3ObtosIEkd5ilXn4A2O\nQLxl5i1iJJnBll59ryVk02xwtAfiiCYr/vWQqlwftCwNm+cWQD3ds7X9AoGAX8DG\nMkyicDj5E9L7sGGoupKr6qJQ2EdoM+yLnFhG929IuRqZSjzxiC3onFVlUBwufsyP\n6mKfB0Kt1xXzrYICCytLMClQRZbxXpq3J+lpERtEyHiaT+DeeLFGQ7EQ+BkquMVZ\nDlqdun1HdwL/9yya0R0Mp7j2LjoXlrt/T2l0lesCgYANW1OsRuRv7aNmTk6CEtnG\nGnvMa/wXa/yE4vKPkffygPXMdQU9BFSWxmWUZKtrmx4J2RBoay8KKmyMIiTj9lIi\ny8horcakQaMs7OarhHcidMkEb0KZIdlq2CAd+K8c/tK6+4qb9SjgjSL+4JZmWqrn\nhQtEXhwHbnhMu41ikgMqiQ==\n-----END PRIVATE KEY-----\n'
        }
      };
      const bigquery = new BigQuery(bigqoptions);
      //const query = `SELECT * FROM ${req.body.projectId}.${req.body.datasetId}.${req.body.tableId} limit 1`;
      //`SELECT * FROM \`bigquery-public-data.google_analytics_sample.ga_sessions_20170801\`limit 1000`
      //const query = `SELECT * FROM \`bigquery-public-data.google_analytics_sample.ga_sessions_20170801\` limit 100`;
      const query = `SELECT * 
                    FROM \`${req.body.projectId}.${req.body.datasetId}.${req.body.tableId}\` 
                    LIMIT 100`;

      const options = {
        query: query,
        location: 'US',
      };

      const [job] = await bigquery.createQueryJob(options);


      const [rows] = await job.getQueryResults();
      return {
        result: true,
        message: 'connected successfully!'
      }
    }
    catch (e) {
      console.log(e.message);
      return {
        result: false,
        message: e.message
      };
    }
  }

  async getall(page,size) {
   const p= Pagination.getPagination(page,size)
   console.log(p);
    return AnalyticsConfigurationModel.findAndCountAll({
      limit:p.limit,
      offset:p.offset,
      
    });
  }
  async getbyId(id)
{
  return AnalyticsConfigurationModel.findByPk(id);
}
}
module.exports = AnalyticsService;