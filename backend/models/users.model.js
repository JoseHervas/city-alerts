const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const usersSchema = new mongoose.Schema({
    "_id": {
        type: types.ObjectId,
        required: [true, "Falta el ID"]
    },
    "username": {
        type: types.String,
        required: [true, "Falta el username"],
        minlength: [3, "El username es muy corto"],
        maxlength: [100, "El username es muy largo"]
    },
    "hash": {
        type: types.String,
        required: [true, "Falta el hash de la password"],
        minlength: [3, "El hash de la password es muy corta"],
        maxlength: [60, "El hash de la password es muy larga"]
    },
    "email": {
        type: types.String,
        required: [true, "Falta el email"],
        minlength: [3, "El email es muy corto"],
        maxlength: [255, "El email es muy largo"]
    }
})

module.exports = mongoose.model("user", usersSchema)