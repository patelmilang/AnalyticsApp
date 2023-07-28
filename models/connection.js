const { Sequelize } = require('sequelize');
const config = require('../config/database.config');

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     operatorsAliases: 'false',
//     logging: false

// });  

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'postgres',
  host: config.host,
});
// Validate and connect to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = sequelize