// this is a file where we work with events in node js emit event 
//first we create with '.on' then we execute by using '.emit' 


const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('listener', (num1, num2)=>{
    // console.log('listener called');
    console.log(num1+num2);
})
// how to pass it here we pass the listener then give the value;

eventEmitter.emit('listener', 1,2)

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name = name;

    }
    get name(){
        return this._name;
    }

}

let me = new Person ('meTest');
let you = new Person ('girl');
me.on('name', ()=>{
    console.log('my name is : ' + me.name);
})
you.on('name', ()=>{
    console.log('this is a girl :' + you.name);
})

me.emit('name');
you.emit('name');
