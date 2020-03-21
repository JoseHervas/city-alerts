const secrets = require('../config/secrets');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const users = require('../models/users.model');
const bcrypt = require('bcrypt');


mongoose.connect(secrets.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


//CRRUD de usuario

//1.- Create user
exports.insertUser = async (req, res) => {
    //validar el body
    const bodyErrors = validationResult(req);
    if (bodyErrors.isEmpty()) {
        const hash = await bcrypt.hash(req.body.password, 14)
        const newUser = new users({
            "_id": mongoose.Types.ObjectId(),
            "username": req.body.username,
            "hash": hash,
            "email": req.body.email
        });
        try {
            const result = await newUser.save();
            res.send(result);
        } catch (error) {
            res.send(
                {
                    "error": "Error interno al crear el usuario",
                    "causa": error
                }
            )
        }
    } else {
        res.status(400).send({ "error": "Body mal formado" })
    }
}
