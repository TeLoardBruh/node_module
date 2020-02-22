
// working with two files exporting module
const sum = (num1, num2) => num1 + num2;

const PI = 3.14;

class SomeObj {
    constructor() {
        console.log("object created");
    }
}


module.exports = {
    sum: sum,
    PI: PI,
    SomeObj: SomeObj
};