const express = require('express');

const app = express();

app.use(express.json());
const coursesRouter = require('./router/router');
app.use('/api/courses/',coursesRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

