
let {courses} = require('../data/courses');

const { validationResult } = require('express-validator')

const getAllCourses =  (req, res) => {
    res.json(courses);
}

const getCourse = (req, res) => {
    const course = courses.find((course) => course.id == req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
}


const AddCourse = (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.body.title) return res.status(404).json({ message: "title not found" });

   const course = { id: courses.length + 1, ...req.body };
    courses.push(course);
    res.json(course);
}

const UpdateCourse = (req,res)=>{
    const id = req.params.id;
    let course = courses.find((course) => course.id == id);
    if (!course) return res.status(404).json({ message: "Course not found" });
      course = {...course, ...req.body}
      res.json(course);
   }

const DeleteCourse = (req,res)=>{
    const id = req.params.id;

    let course = courses.filter((course) => course.id != id);
    res.json(course);

 }

 module.exports = {
    getAllCourses,
    getCourse,
    AddCourse,
    UpdateCourse,
    DeleteCourse
 }