const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const UserModel = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    // city: {
    //     type: DataTypes.INTEGER
    // },
    // country: {
    //     type: DataTypes.INTEGER
    // },
    // zipcode: {
    //     type: DataTypes.INTEGER
    // },
    // birthdate: {
    //     type: DataTypes.DATEONLY
    // },
    // last_login_at: {
    //     type: DataTypes.DATE
    // },
    // facebook_url: {
    //     type: DataTypes.STRING(200)
    // },
    // twitter_url: {
    //     type: DataTypes.STRING(200)
    // },
    // credit_card_limit: {
    //     type: DataTypes.DECIMAL(2)
    // },
    // voucher_limit: {
    //     type: DataTypes.DECIMAL(2)
    // },
    // banking_limit: {
    //     type: DataTypes.DECIMAL(2)
    // },
    e_wallet_limit:{
        type:DataTypes.DECIMAL(2)
    },
    querylimit:{
        type: DataTypes.INTEGER
    },
    matrix_of_intrest:{
        type: DataTypes.STRING(2000)
    },
    field:{
        type: DataTypes.STRING(200)
    },
    role:{
        type:DataTypes.ENUM(['CEO',
        'COO',
        'CTO',
        'CMO',
        'CFO',
        'VP of Sales',
        'Product Manager',
        'UX/UI Designer',
        'Software Engineer/Developer',
        'Data Analyst/Scientist',
        'Customer Support Representative',
        'Supply Chain Manager',
        'Digital Marketing Specialist',
        'Content Writer/Copywriter',
        'QA Tester',
        'Finance Analyst',
        'Legal Counsel',
        'HR Manager',
        'Business Analyst',
        'Community Manager',
        'Marketing Manager',
        'Monetization Manager',
        'Localization Specialist',
        'Server and Network Engineer',
        'Legal Counsel',
        'Finance Manager',
        'IT Support',
        'Store Manager',
        'Assistant Store Manager',
        'Inventory Manager',
        'Retail Sales Associate',
        'Customer Service Representative',
        'District Manager',
        'Regional Manager',
        'Store Operations Manager',
        'Manager'
        ])
    },
    company:{
        type: DataTypes.STRING(200)
    },
    profile_image:{
        type:DataTypes.BLOB('long')
    },
    profile_image_type:{
        type:DataTypes.STRING(100)
    },
    auth_type:{
        type:DataTypes.ENUM(['LOCAL','GOOGLE','FACEBOOK'])
    },
    reset_token:{
        type:DataTypes.STRING(100)
    }
});
//UserModel.sync({alter:true});
module.exports = UserModel;
