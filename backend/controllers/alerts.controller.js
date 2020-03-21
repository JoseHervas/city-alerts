const secrets = require('../config/secrets');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const alerts = require('../models/alerts.model');
const users = require('../models/users.model');
const jwt = require('jsonwebtoken');

mongoose.connect(secrets.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//CRRUD alerts

//1.- Crear alerta
exports.insertAlert = (req, res) => {
    const bodyErrors = validationResult(req);
    if (bodyErrors.isEmpty()) {
        //averiguar qué usuario me está haciendo la petición
        jwt.verify(
            req.cookies.sello,
            secrets.jwt_clave,
            async (error, decodedToken) => {
                const userId = decodedToken._id //saco el ID del usuario del JWT
                const now = new Date();
                const newAlert = new alerts({
                    "_id": mongoose.Types.ObjectId(),
                    "fecha": `${now.getFullYear()}-${now.getMonth() +1}-${now.getDate()}`,
                    "calle": req.body.calle,
                    "tipoIncidencia": req.body.tipoIncidencia,
                    "user":userId 
                })
                try {
                    const result = await newAlert.save();
                    res.send(result);
                } catch (error) {
                    console.log(error);
                    res.send({
                        "error": "No se ha podido guardar la alerta",
                        "causa": error
                    })
                }
            }
        )
    } else {
        res.send({"error": "Body mal formado"})
    }
}