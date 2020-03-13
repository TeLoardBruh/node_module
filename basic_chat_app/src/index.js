const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const Filter = require('bad-words');
const io = socketio(server);
// connect to directory for path to use
const pDir = path.join(__dirname, '../public');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/messages');
const {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
} = require('./utils/users')
const PORT = process.env.PORT || 3000


// set env for node 
app.use(express.static(pDir));

// connection to io 
io.on('connection', (socket) => {
    console.log("New user connection with socket");

    // join username & room
    socket.on('join', (options, callback) => {
        // add user 
        const {
            error,
            user
        } = addUser({
            id: socket.id,
            ...options
        });

        if (error) {
            return callback(error)
        }

        socket.join(user.room);

        // send hello in console when user enter 
        socket.emit('message', generateMessage('Admin','Welcome to my app!'));
        // broadcast 
        socket.broadcast.to(user.room).emit('message',
            generateMessage(`${user.username} has join the room`));
        io.to(user.room).emit('roomData',{
            room:user.room,
            users: getUserInRoom(user.room)
        })

        callback()
    })
    // get data and send to another user
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed ! ');
        }
        const user = getUser(socket.id);
        if(user){
            io.to(user.room).emit('message', generateMessage(user.username,message));
            callback();
        }

    })
    // disconnect 
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left!`));
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUserInRoom(user.room)
            })
        }
    })
    // share location 
    socket.on('shareButton', (coords, callback) => {
        const user = getUser(socket.id);
        if(user){
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
            callback();
        }

    })

});



app.get('/', async (req, res) => {
    res.render("index")
})

server.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}/`);
})