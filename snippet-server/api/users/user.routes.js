const router = require('express').Router();

const controller = require('./user.controller');
const middleware = require('../middleware/authorization');

// GET /users
// router.get('/', controller.getUsers);

// GET /users/:id
router.get('/:id', controller.getUsersById);

// POST /users/register
router.post('/register', controller.registerUser);

// POST /users/login
router.post('/login', controller.loginUser)

// PUT /users/:id
router.put('/:id', middleware.verifyToken, controller.updateUser);

module.exports = router;