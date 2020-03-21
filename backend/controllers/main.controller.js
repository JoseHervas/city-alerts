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

        //Comprobar si el usuario ya existe
        const potentialDuplicate = await users.find({
            $or: [
                { "username": req.body.username },
                { "email": req.body.email }
            ]
        });
        if (potentialDuplicate.length > 0) {
            res.status(400).send({ "error": "usuario ya existente" })
        } else {
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
        }
    } else {
        res.status(400).send({ "error": "Body mal formado" })
    }
}

// 2.- Get single user
exports.getUserById = async (req, res) => {
    const _id = req.params._id;
    try {
        const result = await users.findById(_id);
        res.send(result)
    } catch (error) {
        res.send({
            "error": "No se ha podido encontrar al usuario",
            "causa": error
        })
    }
}

//3.- Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const result = await users.find();
        res.send(result)
    } catch (error) {
        res.send({
            "error": "No se ha podido encontrar al usuario",
            "causa": error
        })
    }
}

//4.- Update user
exports.updateUser = async (req, res) => {
    //validar el body
    const bodyErrors = validationResult(req);
    if (bodyErrors.isEmpty()) {
        const _id = req.body._id;

        const changes = {
            "username": req.body.username,
            "email": req.body.email,
        }

        //Comprobar si se quiere cambiar la contraseña
        if (req.body["password"] !== undefined) {
            const hash = await bcrypt.hash(req.body["password"], 14);
            changes["hash"] = hash;
        }

        try {
            const result = await users.findByIdAndUpdate(_id, {
                $set: changes
            })
            res.send({"ok": `usuario con el id ${result._id} actualizado!`})
        } catch (error) {
            res.send(
                {
                    "error": "Error interno al actualizar el usuario",
                    "causa": error
                }
            )
        }
    } else {
        res.status(400).send({ "error": "Body mal formado" })
    }
}