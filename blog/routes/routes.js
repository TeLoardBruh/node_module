const router = require('express').Router();
const blog = require('../models/blog');



router.get('/',(req,res)=>{
    blog.find({}).then(function(result){
        let publishblog = result.filter(function(blog){
            return blog.publish;
        })
        res.render('index',{publishblog: publishblog});
    })
})



// posting blog
router.get('/postBlog',(req,res)=>{
    blog.find({}).then(function(result){
        let blogS = result.filter(function(blog){
            return !blog.publish;
        })
        let publishblog = result.filter(function(blog){
            return blog.publish;

        })
        res.render('post_blog',{blogS: blogS, publishblog: publishblog});
    })
})
router.post('/postBlog',(req,res)=>{
    let newBlog = new blog({title: req.body.title, des:req.body.des, img_link: req.body.img_link, link:req.body.link});

    console.log(newBlog);
    // res.redirect('/');
    newBlog.save().then(function(result){
        console.log(result);
        res.redirect('/postBlog');

    }).catch(function(err){
        console.log(err);

        res.redirect('/postBlog');
    })
})

router.post('/publishBlog/:id/published',(req,res)=>{
    let blogPub = req.params.id;

    blog.findById(blogPub).exec().then(function(result){
        result.publish =! result.publish;
        return result.save();
    }).then(function(result){
        res.redirect('/postBlog');
    });
    console.log(req.param);
})




module.exports = router;