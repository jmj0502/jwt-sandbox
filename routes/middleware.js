//here we are going to set up our jwt middleware.
const jwt = require('jwt-simple');
const moment = require('moment');

//here we are going to setup the middleware that will actually perform the athentication process.
const validateToken = (req, res, next) => {
    if (!req.headers['user_token']) {
        return res.json({
            error: 'You must include the header' 
        });
    }

    const token = req.headers['user_token'];
    let payload = null;
    try {
        payload = jwt.decode(token, 'mysecrettoken');
    } catch (err) {
        res.json({
            error: 'Invalid token'
        });
    }

    if (moment().unix() > payload.expiresAt) {
        return res.json({
            error: 'Expired token'
        });
    }

    req.userId = payload.userId;

    next()
};

module.exports = {
    validateToken: validateToken
};