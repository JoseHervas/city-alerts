const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const types = mongoose.Schema.Types;

const alertsSchema = new mongoose.Schema({
    "_id": {
        type: types.ObjectId,
        required: [true, "Falta el ID"]
    },
    "fecha": {
        type: types.Date,
        required: [true, "Falta la fecha"]
    }, 
    "calle": {
        type: types.String,
        required: [true, "Falta la calle"],
        maxlength: [255, "La calle es demasiado larga"],
        minlength: [5, "La calle es demasiado corta"],
    },
    "tipoIncidencia": {
        type: types.String,
        required: [true, "Falta el tipo de incidencia"],
        enum: ["robo", "asesinato", "agresion"]
    },
    "user": {
        ref: "users",
        type: types.ObjectId,
        autopopulate: true
    }
})

alertsSchema.plugin(autopopulate);

module.exports = mongoose.model('alerts', alertsSchema);