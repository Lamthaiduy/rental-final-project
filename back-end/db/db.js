const mongoose = require('mongoose');


const db = {
    connect: async (connectionString) => {
        try {
            await mongoose.connect(connectionString);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = db;