const mongoose = require('mongoose');
const UserModel = require('../models/user');
const data = require('./account.json');

const db = {
    connect: async (connectionString) => {
        try {
            await mongoose.connect(connectionString);
        } catch (error) {
            console.log(error)
        }
    },
    createDataSample: async () => {
        try {
            const countUser = await UserModel.estimatedDocumentCount();
            if(!countUser) {
                const createSampleAccount = data.map(async (account) => {
                    const newAccount = new UserModel({...account});
                    await newAccount.save();
                    return newAccount;
                })
                await Promise.all(createSampleAccount);
                console.log("Created sample data");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = db;