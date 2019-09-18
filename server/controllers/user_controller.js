const UserSchema = require('../models/user_model');
const bcrypt = require('bcrypt');
const session = require('express-session');

signUp = (req, res) => {
    let {firstname, lastname, email, passwordHash} = req.body; // this is called destructuring. We're extracting these variables and their values from 'req.body'

    let userData = {
        firstname,
        lastname,
        passwordHash: bcrypt.hashSync(passwordHash, 5), // we are using bcrypt to hash our password before saving it to the database
        email
    };

    let newUser = new UserSchema(userData);
    newUser.save().then(error => {
        if (!error) {
            return res.status(201).json('signup successful')
        } else {
            if (error.code ===  11000) { // this error gets thrown only if similar user record already exist.
                return res.status(409).send('user already exist!')
            } else {
                console.log(JSON.stringify(error, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
                return res.status(500).send('error signing up user')
            }
        }
    })
}

/*
2. User Sign in
=============
*/
logIn = (req, res) => {
  let {email, passwordHash} = req.body;
    UserSchema.findOne({email: email}, 'firstname lastname email passwordHash', (err, userData) => {
    	if (!err) {
        	let passwordCheck = bcrypt.compareSync(passwordHash, userData.passwordHash);
        	if (passwordCheck) { // we are using bcrypt to check the password hash from db against the supplied password by user
                req.session.user = {
                  email: userData.email,
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                  id: userData._id
                }; // saving some user's data into user's session
                req.session.user.expires = new Date(
                  Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
                );
                res.status(200).send('You are logged in, Welcome!');
            } else {
            	res.status(401).send('incorrect password');
            }
        } else {
        	res.status(401).send('invalid login credentials')
        }
    })
}

getProfilById = (req, res) => {
    let id = req.params.id;
    UserSchema.findOne(id, function(err, todo) {
        res.json(todo);
    });
};

getProfilByEmail = (req, res) => {
    let email = req.params.email;
    UserSchema.findOne({email: email}, function(err, userData) {
        res.json(userData);
    });
};

getUsers = async (req, res) => {
    await UserSchema.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    signUp,
    logIn,
    getProfilById,
    getProfilByEmail,
    getUsers
};
