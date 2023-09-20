'use strict';
const serverless = require('serverless-http');
const app=require('./index')
module.exports.hello =  serverless(app);
