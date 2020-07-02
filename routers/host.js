const express = require('express'),
    router = express.Router(),
    {body, query} = require('express-validator'),

	checkError = require('../middlewares/checkError'),
    controller = require('../controllers/host'),
    validator = require('../utils/validator')

router.post('/start',[
    body('user', 'Must be valid user _id')
        .isMongoId().bail()
        .custom(val => validator.exists('User', {_id: val}))
        .not().custom(val => validator.exists('Host', {user: val})).withMessage('This host already exists'),
    body('cords.lat', 'Must be valid latitude value')
        .isFloat(),
    body('cords.long', 'Must be valid longitude value')
        .isFloat(),
    body('parameters.tar')
        .optional()
        .isFloat(),
    body('parameters.nicotine')
        .optional()
        .isFloat(),
    body('count', 'must be positive integer')
        .isInt(),
    body('type', '')
        .not().isEmpty()
], checkError, controller.start);

router.get('/stop', [
    query('id', 'must be valid user _id')
        .isMongoId().bail()
        .custom(val => validator.exists('Host', {user: val}))
], checkError, controller.stop)


module.exports = router;
