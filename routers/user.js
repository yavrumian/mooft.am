const express = require('express'),
    router = express.Router(),
    {body, query} = require('express-validator'),

	checkError = require('../middlewares/checkError'),
    controller = require('../controllers/user'),
    validator = require('../utils/validator')

router.post('/reg',[
    body('username', 'String from 4 characters to 20')
        .isLength({min: 4, max: 20})
        .custom(val => validator.isUnique('User', {username: val}))
        .withMessage('username already exists'),
    body('fullname', 'String from 5 to 50 characters')
        .isLength({min: 5, max: 50}),
    body('age', 'Integer, min 18')
        .isInt({min: 18}),
    body('gender', 'Can take one of the following values: "m", "f"')
        .optional()
        .isIn(['m', 'f']),
    body('phone', 'Valid phone number')
        .isInt(),
    body('password', 'String, min 6 characters')
        .isLength({min:6})
], checkError, controller.reg);


module.exports = router;
