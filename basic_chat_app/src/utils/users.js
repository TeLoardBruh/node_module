const users = [];

// addUser
const addUser =({ id , username, room})=>{
    // clean the data 
    username = username.trim().toLowerCase();
    // clean room 
    room = room.trim().toLowerCase();

    // validation 
    if(!username || !room){
        return {
            error: 'Usernname and Room are required!'
        }
    }

    // check for existing user 
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })
    // validated username
    if(existingUser){
        return{
            error:'Username is in used!',
        }
    }
    // storeUser
    const user = {id,username,room}
    users.push(user)
    return {user}
}

// create Dummy user 
// addUser({
//     id:22,
//     username:'testing1',
//     room:'lib1'
// })
// addUser({
//     id:11,
//     username:'testing2',
//     room:'lib1'
// })
// addUser({
//     id:33,
//     username:'testing3',
//     room:'lib2'
// })


// removeUser 
const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id == id 
    })
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// getUser
const getUser =(id)=>{
    return users.find((user)=>{
        return user.id === id ;
    });
}

// getUserInRoom

const getUserInRoom =(room)=>{
    room = room.trim().toLowerCase();
    return users.filter((user)=>{
        return user.room === room})
}


module.exports ={
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}