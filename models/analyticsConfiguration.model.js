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
    connectionSource:{
        type:DataTypes.ENUM(['BIG QUERY','AMAZON S3','MY SQL','GOOGLE CLOUD STORAGE','GOOGLE ADS'])
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
    projectId:{
        type: DataTypes.STRING 
    },
    datasetId:{
        type: DataTypes.STRING  
    },
    tableId:{
        type: DataTypes.STRING  
    },
    is_active:{
        type:DataTypes.BOOLEAN
    },
    status:{
        type:DataTypes.ENUM(['ON','OFF','CLOSE','ACTIVE','DE-ACTIVE','CONNECTED','DISCONNECTED'])
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
//AnalyticsConfigurationModel.sync();
module.exports = AnalyticsConfigurationModel;
