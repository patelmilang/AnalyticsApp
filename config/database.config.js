// require('dotenv').config();

module.exports = {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'cryptodb',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'pass#123'
}