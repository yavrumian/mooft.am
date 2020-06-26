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
