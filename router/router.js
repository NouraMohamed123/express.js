const express = require("express");
const router = express.Router();
const coursesController = require('../controller/courses_contrller')
const verfyToen = require('../middelware/verfyToen');
const allowedTo = require('../middelware/allowedTo');
// const {validationSchma} = require('../middelware/validationSchma')
router.get('/',coursesController.getAllCourses);

router.get('/:id',coursesController.getCourse );

router.post('/', coursesController.AddCourse);
 router.put('/:id',coursesController.UpdateCourse);

 router.delete('/:id',verfyToen,allowedTo('admin','manger'),coursesController.DeleteCourse)


 module.exports = router;