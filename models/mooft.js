const _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,;

const schema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
    to: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    cords: {
        lat: Number,
        long: Number
    },
    count: Number,
    type: String
});


const Model = mongoose.model('Mooft', schema)

module.exports = {Model}
