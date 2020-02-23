const router = require('express').Router();
const ToDo = require('../models/todo');

router.get('/',(req,res)=>{
    ToDo.find({}).then(function(result){
        let todos = result.filter(function(todo){
            return !todo.done;
        })
        let doneToDo = result.filter(function(todo){
            return todo.done;
        })
        res.render('index',{toDos: todos, doneToDo:doneToDo});
    })
})

router.post('/postToDo',(req,res)=>{
    // res.json(req.body);
    let newToDo = new ToDo ({description: req.body.description});
    newToDo.save().then(function(result){
        console.log(result);
        res.redirect('/');

    }).catch(function(err){
        console.log(err);

        res.redirect('/');
    })
})
// mark as done 
router.post('/toDo/:id/completed',(req,res)=>{
    let toDoId = req.params.id;
    ToDo.findById(toDoId).exec().then(function(result){
        result.done =! result.done;
        return result.save();
    }).then(function(result){
        res.redirect('/');
    });
    console.log(req.params);    
})

module.exports = router;