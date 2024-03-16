const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./user.model');

const config = require('../../config.json');
const util = require("../util");




//GET /user/:id
const getUsersById = async (req, res) => {
    const { params, query } = req;
    const id = params.id;

    const includeSnippets = util.queryToBoolean(query.snippets);
    const includeBookmarks = util.queryToBoolean(query.bookmarks);

  // find users in the array of user objects by matching the id
    

    try {
        const virtuals = [];
        // virtuals.push('hey');
        if (includeSnippets) {
            virtuals.push('snippets');
            if(includeBookmarks) {
                virtuals.push('bookmarks')
            }
            // console.log(virtuals);
        } 
        const user = await User.findOne({ _id: id }).select('-password').populate(virtuals);
        // console.log(virtuals);
        

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: `no user found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

//create / register a new user
const registerUser = async (req, res) => {
    const { body } = req;
    const { username, password } = body;

    if (!password || !username) {
        return res.status(400).json({error: 'username and password are required' });
    }

    try {
        // gen salt which changes each time the function is called
        const salt = await bcrypt.genSalt(10);
        // use the passwaord + salt to create a hashed password
        const hashed = await bcrypt.hash(password, salt);

        const userDoc = new User({ ...body, password: hashed });
        const saved = await userDoc.save();
        // toObject() converts a Mongoose doc into a plain javascript object
        const user = saved.toObject();
        // remove the password key
        delete user.password;
        res.json(user);
    } catch (error) {

        res.status(500).json({ error: error.toString() });
    }
};

//login an existing user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username: username.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const authenticated = await bcrypt.compare(
            password,
            user.password
        );

        if (authenticated) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                config.jwtsecret,
                { expiresIn: '24h'}
            );

            const authorized = user.toObject();

            delete authorized.password;

            res.header('Authorization', `Bearer ${token}`).json(authorized);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}


// update an existing user
const updateUser = async (req, res) => {
    const { params, body } = req;
    const id = params.id;

    try {
        delete body.password;

        const user = await User.findOneAndUpdate({ _id: id }, body, {
            new: true
        }).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: `No User found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = {
    getUsersById,
    registerUser,
    loginUser,
    updateUser
}