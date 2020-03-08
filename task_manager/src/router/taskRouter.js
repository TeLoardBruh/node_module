const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/',auth,async(req,res)=>{
    const completed = req.query.completed;
    
    // setting the result to match as the query
    // skip also 
    const match ={}
    const sort ={}
    if(completed){
        match.completed = completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : +1  
    }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(201).send(req.user.tasks)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((error)=>{
    //     res.status(500).send();
    // })
})

router.get('/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const owner = req.user._id;
        const task = await Task.findOne({_id, owner});
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

router.post('/postTask',auth,async(req,res)=>{
    // this one is requesting everything from body then put into owner property by calling its id
    const task  = new Task({
        ...req.body,
        owner: req.user._id
    })
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

router.patch('/updateTask/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdate = ["description","completed"];
    const isValidateOperator = updates.every((update)=>{
        return allowUpdate.includes(update);
    })
    if(!isValidateOperator){
        return res.status(400).send({error:"Invalid update"})
    }

    try{
        
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id});


        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if(!task){
            return res.status('404').send("Unautherize")
        }
        updates.forEach((update)=>{
            task[update] = req.body[update];
        })
        await task.save();
        res.send(task);

    }
    catch(e){
        res.status(400).send();
    }
})

router.delete('/deleteTask/:id',auth,async(req,res)=>{
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send("Unautherize");
        }
        res.send(task);
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;