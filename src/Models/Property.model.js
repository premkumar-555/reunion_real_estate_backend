const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
title: {type: String, required: true},
price: {type: Number, required: true},
type: {type: String, required: true},
area_sqmtr: {type: String, required: true},
bed_rooms: {type: Number, required: true},
bath_rooms: {type: Number, required: true},
location: {type: String, required: true},
city: {type: String, required: true},
available_from: {type: Date, required: true},
owner_ID: {type: mongoose.Schema.Types.ObjectId, required: true},
}, {
    timeStamps: true,
    versionKeys: false
})

const propertyModel = mongoose.model('Property', propertySchema);

module.exports = propertyModel;