//here we are going to setu our routes.
const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const middleware = require('./middleware');

//here we are creatin our auth token.
const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, 'mysecrettoken');
}

//here we are going to set up our routes.

//our main route.
router.get('/', async (req, res) => {
    const users = await Users.getAll();
    res.json(users);
});

//here we are going to setup our register route.
router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await Users.insert(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

//here we are going to setup our login route.
router.post('/login', async (req, res) => {
    try {
        const user = Users.getByEmail(req.body.email);
        if (user === undefined) {
            res.json({
                error: 'Error, email or password not found'
            });
        } else {
            const equals = bcrypt.compareSync(req.body.password, user.password);
            if (!equals) {
                res.json({
                    error: 'Wrong password'
                });
            } else {
                res.json({
                    succesfull: createToken(user),
                    done: 'Login Correct'
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
});

//here we are using the validation middleware we just created. We must use it under our register and login routes, since it will ask use for a token that we haven't create in case we use it  before handeling those routes.
router.use(middleware.validateToken);

//this will handle the main user route after a succesful login.
router.get('/mainuser', async (req, res) => {
    try {
        await Users.getById(req.user.id);
        res.json(req.body);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;