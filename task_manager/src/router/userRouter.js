const express = require('express');
const User = require('../models/User');
const router = new express.Router();

router.get('/',async(req,res)=>{
    // console.log(req.body);
    try{
        const user = await User.find({});
        res.status(201).send(user)
    } catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send();
    // });
})
router.get('/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const user = await User.findById({_id});
        if(!user) {res.status(400).send()}
        res.status(201).send(user)
    } catch(e){
        res.status(500).send()
    }

    // console.log(req.body);
    // console.log(req.params);
    // const _id = req.params.id;
    // User.findById({_id}).then((user)=>{
    //     if(!user){
    //         res.status(404).send();
    //     }
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(500).send();
    // });
})
router.post('/postUser',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.status(201).send(user)
    } catch(e){
        res.status(500).send()
    }

    // const user = new User(req.body);
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
})

router.patch('/updateUser/:id',async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdate = ["name","email","password"];
    const isValidateOperator = updates.every((update)=>{
        return allowUpdate.includes(update);
    })
    if(!isValidateOperator){
        return res.status(400).send({error:"Invalid update"})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if(!user){
            return res.status('404').send()
        }
        res.send(user);

    }
    catch(e){
        res.status(400).send();
    }
})

router.delete('/deleteUser/:id',async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;