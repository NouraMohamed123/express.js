require('dotenv').config()
const express = require('express');

const app = express();
const mongoose = require('mongoose');
try {

    const url = "mongodb://127.0.0.1/test";
    mongoose.connect(url).then(() => console.log('Connect success')).catch((error) => console.log('connect error', error));
} catch (error) {
    console.log(error);
}

app.use(express.json());
//global middelware for not found router 

const coursesRouter = require('./router/router');
app.use('/api/courses/', coursesRouter);
app.all('*', (req, res, next) => {
    res.send('not found');
});

//global middelware error handelr
// app.use((error,req,res,next)=>{
//     res.json(error);
// });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

