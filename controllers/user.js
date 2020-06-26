const _ = require('lodash'),

    r = require('../utils/response'),

    User = require('../models/user').Model


exports.reg = async(req, res) => {
    const body = _.pick(req.body, ['fullname', 'age', 'gender', 'phone', 'password', 'username']);

	try{
		await new User(body).save();
		res.send(r('success', 'User registered successfuly'))
	}catch(e){
		res.status(400).send(e)
	}
}

exports.auth = async(req, res) => {
	const body = _.pick(req.body, ['username', 'password'])

	try{
		const result = await User.auth(body.username, body.password)
		if(result.status) throw result
		if(!result._id) throw result

		req.session._id = result._id
		req.session.save()
		res.send(result)
	}catch(e){
		console.log(e);
		if(e.message) e = e.message
		return res.status(400).send(r('failed', e))
	}
	// next()
}

exports.check = async(req, res) => {
	if(req.session._id) {
		let user = await User.findById(req.session._id, '_id username')
		if(!user) user = "guest"
		res.send(r('success', user))
	}
	else res.send(r('failed', 'Not logged in'))
}

exports.getUser = async(req, res) => {
	const _id = req.query.id

	try{
		const user = await User.findById(_id, '-password')
		if(!user) throw 'No user is found with given ObjectID'

		res.send(user)
	}catch(e){
		console.log(e);
		if(e.message) e = e.message
		res.status(400).send(r('failed', e))
	}
}

exports.logout = async(req, res) => {
	if(req.session){
		req.session.destroy(function(e){
			if(e) res.status(400).send(e)
			res.send(r('success', 'You\'re logged out'))
		})
	}else res.send(r('failed', 'You\'re not logged in'))
}
