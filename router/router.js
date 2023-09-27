const express = require("express");
const router = express.Router();
const coursesController = require('../controller/courses_contrller')

// const {validationSchma} = require('../middelware/validationSchma')
router.get('/',coursesController.getAllCourses);

router.get('/:id',coursesController.getCourse );
router.post('/',  [
    body('title')
    .notEmpty()
    .withMessage('tittle is required ')
    .isLength({ min: 2 })
    .withMessage('length not correct')
], coursesController.AddCourse);
 router.patch('/:id',coursesController.UpdateCourse);

 router.delete('/:id',coursesController.DeleteCourse)

 module.exports = router;