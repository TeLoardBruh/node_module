// toBe not working well with object , but toEqual work better 
const request = require('supertest');
const {userOne,userOneId,userFail,setUpDataBase} = require('./fixtures/db')
const app = require('../src/app');
const User = require('../src/models/User')
require('dotenv/config')

beforeEach(setUpDataBase);

test('Should sign up a new user', async () => {
    const res = await request(app).post('/users/postUser')
        .send({
            name: "me",
            email: "helloworld@gmail.com",
            password: "testing12341"
        }).expect(201);
    // check user
    const user = await User.findById(res.body.user._id);
    expect(user).not.toBeNull();
    //check the responsone
    expect(res.body).toMatchObject({
        user: {
            name: 'me',
            email: 'helloworld@gmail.com',
        },
        token: user.tokens[0].token
    });
    // test user if it save password in plain text or not 
    expect(user.password).not.toBe('testing12341');
})

test('Should login', async () => {
    const res = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    const user = await User.findById(res.body.user._id);
    expect(user).not.toBeNull();
    expect(res.body.token).toBe(user.tokens[0].token);
})

test('Should login fail', async () => {
    await request(app).post('/users/login')
        .send(userFail)
        .expect(400);
})

test('Should get user profile', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('Should get user profile fail', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should detele account for user', async () => {
    const res = await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();


})

test('Should detele account for user fail', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect({}).toEqual({});
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('Should update user ',async()=>{
    await request(app).patch('/users/updateUser/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'hello babe'
    })
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual("hello babe")
})


test('Should update user fail',async()=>{
    await request(app).patch('/users/updateUser/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Germany'
    })
    .expect(400)

   
})