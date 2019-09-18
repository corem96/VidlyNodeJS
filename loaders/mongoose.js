const mongoose = require('mongoose');
const config = require('../config');

async function mongodbConnection() {
    try {
        return await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        return new Error(`Something went wrong: ${error.message}`);
    }
}

module.exports.getConnection = mongodbConnection;