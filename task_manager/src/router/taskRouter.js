const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();

router.get('/',async(req,res)=>{
    try{
        const task = await Task.find({});
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((error)=>{
    //     res.status(500).send();
    // })
})

router.get('/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const task = await Task.findById({_id});
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // const _id = req.params.id;
    // Task.findById({_id}).then((task)=>{
    //     if(!task){
    //         res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((error)=>{
    //     res.status(500).send();
    // })
})

router.post('/postTask',async(req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save();
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }
    // const task = new Task(req.body);
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
})

router.patch('/updateTask/:id',async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdate = ["description","completed"];
    const isValidateOperator = updates.every((update)=>{
        return allowUpdate.includes(update);
    })
    if(!isValidateOperator){
        return res.status(400).send({error:"Invalid update"})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if(!task){
            return res.status('404').send()
        }
        res.send(task);

    }
    catch(e){
        res.status(400).send();
    }
})

router.delete('/deleteTask/:id',async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;