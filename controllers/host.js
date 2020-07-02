const _ = require('lodash'),

    r = require('../utils/response'),

    Host = require('../models/host').Model


exports.start = async(req, res) => {
    const body = _.pick(req.body, ['user', 'cords', 'count', 'type']);

	try{
		await new Host(body).save();
		res.send(r('success', 'Host registered successfuly'))
	}catch(e){
		res.status(400).send(e)
	}
}

exports.stop = async(req, res) => {
    const id = req.query.id

	try{
		await Host.findOneAndRemove({user: id})
		res.send(r('success', 'Host deleted successfuly'))
	}catch(e){
		res.status(400).send(e)
	}
}
