const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {type: String, enum: [process.env.ADMIN, process.env.USER, process.env.SELLER], default: process.env.USER},
    fullname: String,
   
},  {
    timestamps: true
})


UserSchema.pre('save', async function(next) {
   try {
    const user = this;
    if(!user.isModified('password')) {
        next();
    }
    user.password = await bcrypt.hash(user.password, process.env.SECRET_KEY);
    next();
   } catch (error) {
       console.log(error);
   }
})

UserSchema.method.verifyPassword = async function(password, next) {
    try {
        const verify = await bcrypt.compare(password, this.password);
        if(verify) {
            next(null, this);
        }
        else {
            next(null, false);
        }
    } catch (error) {
        next(error);
    }
}

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;