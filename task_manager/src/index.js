const express = require('express');
const app = express();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("./db/mongoose");
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{

//     if(req.method == "GET"){
//         res.send("Unable to use get");
//     }
//     else{
//         console.log(req.method, req.path);

//         next();
//     }


// })

app.use(express.json());
// user
app.use('/users',userRouter);

// task
app.use('/tasks',taskRouter);


app.listen(port,()=>{
    console.log(`running on http://localhost:3000/`);
})

const Task = require('./models/Task');
const User = require('./models/User');

const Main = async ()=>{
    // const task = await Task.findById("5e6496aaf1432a850b90f3c5");
    // await task.populate('owner').execPopulate()
    // console.log(task.owner);

    const user = await User.findById("5e63ca29b9c74368e74efa63");
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}


// Main()