const mongoose = require('mongoose');
const express = require('express');

const connectionURL = 'mongodb://127.0.0.1:27017/task_app';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex:true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect to database");
    } else
    console.log("Connected");
    // define Schema
    var BookSchema = mongoose.Schema({
        name: String,
        price: Number,
        quantity: Number,
        outofstock: Boolean
    });

    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');


    // ============================================= prepare insert
    // make one by one model then use save to push one by one
    var book1 = new Book({
        name: 'Introduction to Mongoose',
        price: 10,
        quantity: 25
    });
    var book2 = new Book({
        name: 'Introduction 1 to Mongoose',
        price: 50,
        quantity: 10
    });
    var book3 = new Book({
        name: 'Introduction 2 to Mongoose',
        price: 100,
        quantity: 90
    });
    // =============================================end prepare insert

    // save model to database
    book1.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });
    book2.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });
    book3.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });

    // make as array push all in once
    var books = [{
            name: 'Demo data 1',
            price: 50,
            quantity: 10,
            outofstock: false
        },
        {
            name: 'Demo data 2',
            price: 50,
            quantity: 10,
            outofstock: false
        },
        {
            name: 'Demo data 3',
            price: 50,
            quantity: 10,
            outofstock: false
        },
    ]
    Book.collection.insert(books, (err, docs) => {
        if (err) return console.log(err);
        else console.log("Inserting multiple data in array");
    })

    // =============================================insert end

    // =============================================
    Book.collection.findOne({name: "Demo data 1"},(err, docs)=>{
        if(err){
            return console.log(err);
        }else{
            console.log(docs);
        }
    });
    Book.findOne({price: 70},(err,docs)=>{
        if(err){
            return console.log(err);
        }
        else{
            console.log(docs);
        }
    });
    Book.find({price: 50},(err,count)=>{

        if(err){
            return console.log(err);
        }
        else{
            console.log(count);
        }
    });
    // =============================================end find

    // =============================================
    // update
    Book.updateOne({_id:'5e5f50fcad5d296bf7e433da'},{$set: {name:'testing 10'}}).then((docs)=>{
        if(docs) {
          console.log(docs);;
        } else {
          console.log(err);
        }
     }).catch((err)=>{
        console.log(err);
    })

    Book.updateMany({price : 50},{$set: {price: 60}}).then((docs)=>{
        if(docs) {
          console.log(docs);;
        } else {
          console.log(err);
        }
     }).catch((err)=>{
        console.log(err);
    })
    // =============================================end update

    // =============================================
    Book.deleteOne({_id:'5e5f50fcad5d296bf7e433da'}).then((docs)=>{
        if(docs) {
          console.log(docs);;
        } else {
          console.log(err);
        }
     }).catch((err)=>{
        console.log(err);
    })
    Book.deleteMany({price : 60}).then((docs)=>{
        if(docs) {
          console.log(docs);;
        } else {
          console.log(err);
        }
     }).catch((err)=>{
        console.log(err);
    })
    // =============================================end detele

})
