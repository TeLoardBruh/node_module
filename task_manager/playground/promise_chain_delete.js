require('../src/db/mongoose');
const Task = require('../src/models/Task');

Task.findByIdAndRemove('5e62178549d458f3e679dfe7').then((task)=>{
    console.log(task);
    return Task.countDocuments({completed: false});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})

// delete using async and await
const deleteById = async(id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteById('5e6206bb88558b625113817f').then((task)=>{
    console.log(task);
}).catch((err)=>{
    console.log(err);
})