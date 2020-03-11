const express = require('express');
const app = express();
require("./db/mongoose");
require('dotenv/config');
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

app.use(express.json());
// user
app.use('/users',userRouter);

// task
app.use('/tasks',taskRouter);



module.exports = app;
