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
    connectionName: {
        type: DataTypes.STRING
    },
    dataSourceName:{
        type: DataTypes.STRING
    },
    credentialJson:{
        type:DataTypes.JSON
    },
    ProjectId:{
        type: DataTypes.STRING 
    },
    DatasetId:{
        type: DataTypes.STRING  
    },
    TableId:{
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
