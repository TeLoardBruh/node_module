const express = require('express');
const app = express();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("./db/mongoose");
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const port = process.env.PORT || 3000;

app.use(express.json());
// user
app.use('/users',userRouter);

// task
app.use('/tasks',taskRouter);


app.listen(port,()=>{
    console.log(`running on http://localhost:3000/`);
})

