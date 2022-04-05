const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {type: String, enum: [process.env.ADMIN, process.env.USER, process.env.SELLER]},
    fullname: String,
    status: {type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending'},
    contact: String,
    avatar: String,
    address: String,
    gender: String,
    contact: String,
    birthday: {type: Date, default: new Date(1990, 1, 1)}
},  {
    timestamps: true
})


UserSchema.pre('save', async function(next) {
   try {
    const user = this;
    if(!user.isModified('password')) {
        next();
    }
    user.password = bcrypt.hashSync(user.password, 10, process.env.SECRET_KEY);
    next();
   } catch (error) {
       console.log(error);
   }
})

UserSchema.methods.verifyPassword = function(password, next) {
    try {
        const verify = bcrypt.compareSync(password, this.password);
        return verify;
    } catch (error) {
        next(error);
    }
}

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;