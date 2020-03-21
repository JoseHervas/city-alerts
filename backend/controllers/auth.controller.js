const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secrets = require('../config/secrets');
const users = require('../models/users.model');
const { validationResult } = require('express-validator');

mongoose.connect(secrets.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//2 objetivo: 
// - autentificar (iniciar sesión - login)
exports.login = async (req, res) => {
    const bodyErrors = validationResult(req);
    if (bodyErrors.isEmpty()) {
        try {
            const user = await users.find({
                "username": req.body.username
            });
            const isPasswordValid = await bcrypt.compare(req.body.password, user[0].hash);
            if (isPasswordValid) {
                //crear el token de sesion
                jwt.sign(
                    { _id: user[0]._id },
                    secrets.jwt_clave,
                    (error, token) => {
                        res.cookie("sello", token);
                        res.send({ 
                            "ok": "contraseña correcta", 
                            "token": token
                        })
                    }
                )
            } else {
                res.status(400).send({ "error": "contraseña incorrecta" })
            }
        } catch (error) {
            console.log(error)
            res.send({
                "error": "No se ha podido comprobar la identidad del usuario",
                "causa": error
            })
        }
    } else {
        res.status(400).send({ "error": "body mal formado" })
    }
}

// - validar tokens (mantener abierta sesión)
exports.validateToken = (req, res, next) => {
    if (req.cookies["sello"] !== undefined) {
        jwt.verify(
            req.cookies["sello"],
            secrets.jwt_clave,
            (error, validToken) => {
                if (validToken) {
                    next();
                } else {
                    res.send({"error": "token no válido"})
                }
            }  
        )
    } else {
        res.status(401).send({"error": "usuario no logeado"})
    }
}