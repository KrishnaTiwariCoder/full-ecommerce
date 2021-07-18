const { check, validationResult } = require('express-validator');

exports.validateOtpRequest = [
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('phone')
        .notEmpty()
        .isLength({ max: 12, min: 10 })
    ,
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.validateVerifyRequest = [
    check('code')
        .notEmpty()
        .isLength({ max: 6, min: 4 })
];

exports.validateSigninRequest = [
    check('phone')
        .isLength({ max: 12, min: 10 })
        .withMessage('Valid phone is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}