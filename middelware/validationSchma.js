const { body } = require('express-validator')
const validationResult = ()=> {
    return 
        [
            body('title')
            .notEmpty()
            .withMessage('tittle is required ')
            .isLength({ min: 2 })
            .withMessage('length not correct')
        ]
    
}

module.exports = {
    validationResult
}
