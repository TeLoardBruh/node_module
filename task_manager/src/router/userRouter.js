const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth')
const router = new express.Router();

router.get('/',auth,async(req,res)=>{
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

router.get('/me',auth,async(req,res)=>{
   res.send(req.user)
   
})

router.post('/login',async (req,res)=>{
    try {
        const user = await User.findUserByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    } catch (error) {
        res.status(400).send();
    }
})
router.post('/logout',auth, async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/logoutAll',auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})
router.post('/postUser',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token })
    } catch(e){
        res.status(500).send(e)
    }

    // const user = new User(req.body);
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
})

router.patch('/updateUser/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdate = ["name","email","password"];
    const isValidateOperator = updates.every((update)=>{
        return allowUpdate.includes(update);
    })
    if(!isValidateOperator){
        return res.status(400).send({error:"Invalid update"})
    }
    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save()
        res.send(req.user);

    }
    catch(e){
        res.status(400).send();
    }
})

router.delete('/me',auth,async(req,res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(404).send();
        // }
        await req.user.remove()
        res.send(req.user);
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;