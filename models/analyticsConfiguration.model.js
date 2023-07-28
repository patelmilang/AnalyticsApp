const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const User = require('./user.model');

const AnalyticsConfigurationModel = sequelize.define('AnalyticsConfiguration', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'userId'
        }
     }
});
AnalyticsConfigurationModel.sync();
module.exports = AnalyticsConfigurationModel;
