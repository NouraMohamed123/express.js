
// let {courses} = require('../data/courses');
const Course = require('../model/model.cources');

const { validationResult } = require('express-validator')

const getAllCourses = async (req, res) => {
   try {
      const query = req.query;
      const limit = query.limit || 2;
      const page = query.page || 1;
      const skip = (page - 1) * limit;
      const courses = await Course.find({ __v: false }).limit(limit).skip(skip); //using {} to query filter or opton
      return res.status(200).json(courses);
      if (!course) return res.status(404).json({ message: "Course not found" });

      res.json(course);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }

}

const getCourse = async (req, res) => {
   //  const course = courses.find((course) => course.id == req.params.id);
   // if (!course) return res.status(404).json({ message: "Course not found" });
   try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });

      res.json(course);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}


const AddCourse = async (req, res) => {
   //    console.log(req.body);
   //     const errors = validationResult(req);

   //     if (!errors.isEmpty()) {
   //         return res.status(400).json({ errors: errors.array() });
   //     }
   //     if (!req.body.title) return res.status(404).json({ message: "title not found" });

   //    const course = { id: courses.length + 1, ...req.body };
   //     courses.push(course);
   try {
      const newcourse = new Course(req.body);
      await newcourse.save();
      return res.status(200).json(newcourse);
   } catch (error) {
      return res.status(500).json({ message: error.message });

   }

}

const UpdateCourse = async (req, res) => {


   //let course = courses.find((course) => course.id == id);
   // course = { ...course, ...req.body }

   try {
      const id = req.params.id;
      const updateCourse = await Course.findByIdAndDelete(id, req.body, { new: true });

      return res.status(200).json({ message: 'Course updated successfully updated', updateCourse });
      if (!updateCourse) return res.status(404).json({ message: "Course not found" });

   } catch (error) {
      return res.status(500).json({ message: error.message });

   }
}

const DeleteCourse = async (req, res) => {


   // let courses = courses.filter((course) => course.id != id);
   try {
      const id = req.params.id;
      await Course.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted succeffuly" });

   } catch (error) {
      return res.status(500).json({ message: error.message });

   }

}

module.exports = {
   getAllCourses,
   getCourse,
   AddCourse,
   UpdateCourse,
   DeleteCourse
}