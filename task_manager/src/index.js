const express = require('express');
const app = express();
require("./db/mongoose");
require('dotenv/config');
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const port = process.env.PORT;

app.use(express.json());
// user
app.use('/users',userRouter);

// task
app.use('/tasks',taskRouter);


app.listen(port,()=>{
    console.log(`running on http://localhost:${port}/`);
})

