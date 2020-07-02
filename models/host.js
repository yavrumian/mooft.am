const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
    cords: {
        lat: Number,
        long: Number
    },
    parameters: {
        tar: Number,
        nicotine: Number
    },
    desc: String,
    count: Number,
    type: String
});


const Model = mongoose.model('Host', schema)

module.exports = {Model}
