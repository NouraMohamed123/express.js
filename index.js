const express = require('express');

const app = express();
const { body, validationResult } = require('express-validator')



app.use(express.json());

let courses = [
    {
        id: 1,
        title: 'Java',
        description: 'Java is a general-purpose, high-level, object-oriented programming language.'
    },
    {
        id: 2,
        title: 'php',
        description: 'php is a general-purpose, high-level, object-oriented programming language.'
    },
    {
        id: 3,
        title: 'C++',
        description: 'C++ is a general-purpose, high-level, object-oriented programming language.'
    }
]
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((course) => course.id == req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
});
app.post('/api/courses', [
    body('title')
    .notEmpty()
    .withMessage('tittle is required ')
    .isLength({ min: 2 })
    .withMessage('length not correct')
]
, (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.body.title) return res.status(404).json({ message: "title not found" });

   const course = { id: courses.length + 1, ...req.body };
    courses.push(course);
    res.json(course);
});
 app.patch('/api/courses/:id',(req,res)=>{
  const id = req.params.id;
  let course = courses.find((course) => course.id == id);
  if (!course) return res.status(404).json({ message: "Course not found" });
    course = {...course, ...req.body}
    res.json(course);
 });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

