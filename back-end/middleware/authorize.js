const UserModel = require('../models/user');


function authorize(roles = []) {
    if(typeof roles === 'string') {
        roles = [roles];
    }
    return function(req, res, next) {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denined' });
        }
        next();
    }
}

module.exports = authorize;