require('../src/db/mongoose');
const User = require('../src/models/User');

User.findByIdAndUpdate('5e61f5a9f5a7c9495014f180',{name: 'reak1'}).then((user)=>{
    console.log(user);
    return User.countDocuments({name:'reak'});
}).then((result)=>{
    // console.log(result);
}).catch((error)=>{
    console.log(error);
})

// update using async and await 
const updateById = async(id,name)=>{
    const user = await User.findByIdAndUpdate(id,{name});
    const count = await User.countDocuments({name:'reak24'});
    return count
}

updateById('5e6204119a503e47c076ad7e','reak24').then((count)=>{
    console.log(count);
}).catch((err)=>{
    console.log(err);
})