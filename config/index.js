const dotenv = require('dotenv');

// Set NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("Couldn't find .env file");
}

module.exports = {
    // Favorite port
    port: parseInt(process.env.PORT, 10),

    // Mongodb connection string
    dbUrl: process.env.MONGODB_URI,

    // JWT Secret
    jwtsecret: process.env.JWT_SECRET,

    // API configs
    api: { prefix: '/api' }
};