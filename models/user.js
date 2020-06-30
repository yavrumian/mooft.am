const _ = require('lodash'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,

    saltRounds = 10;

const schema = new Schema({
    username: {type: String, min: 4, max: 20, required: true},
    fullname: {type: String, min: 5, max: 50, required: true},
    age: {type: Number, min: 18, required: true},
    gender: {type: String, enum: ['m', 'f']},
    password: {type: String, required: true, trim: true},
    credits: {type: Number, default: 3},
    phone: {type: Number, required: true},
    history: [{type: mongoose.Schema.Types.ObjectID, ref: 'Mooft', required: true}],
});

schema.pre('save', async function(next) {
	const user = this;
	try {
		const hash = await bcrypt.hash(user.password, saltRounds)
		user.password = hash
	} catch (e) {
		return next(e)
	}
})

schema.statics.auth = async function(username, password){
	try{
		const user = await Model.findOne({username})
		if(!user) throw 'No user found'
		const res = await bcrypt.compare(password, user.password)
		if(res) return _.pick(user, ['_id', 'username', 'fullname'])
		else throw 'Invalid credentials'
	}catch(e){
		console.log(e);
		return e
	}
}

const Model = mongoose.model('User', schema)

module.exports = {Model}
