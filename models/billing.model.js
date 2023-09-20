const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const User = require('./user.model');

const BillingModel = sequelize.define('Billing', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    billingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    DueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    plan: {
        type: DataTypes.ENUM(['BIGINER','INTERMIDIATE','ADVANCE'])
    },
    totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }, 
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DE-ACTIVE'])
    }
});
//BillingModel.sync();
module.exports = BillingModel;
