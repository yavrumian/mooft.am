const mongoose = require('mongoose'),
   Schema = mongoose.Schema;

const schema = new Schema({
   name: {type: String, min: 5, max: 50, required: true},
   age: {type: Number, min: 18, required: true}
   gender: {type: String, enum: ['m', 'f']},
   credits: Number,
   phone: {type: Number, required: true}
});

const Model = mongoose.model('User', schema)

module.exports = {Model}
