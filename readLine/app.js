// this is a readLine module of node js 
const Readline = require('readline');

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}, );

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);

let answer = num1 + num2;

// function question 
rl.question(`Can you give me the answer of this ? ${num1} + ${num2} \n`, (userInput) => {
    // console.log(userInput);
    if (userInput.trim() == answer) {
        console.log('YAY you got a correct anwser');
        rl.close();
    } else {
        rl.setPrompt('Incorrect Answer PLEASE TRY AGAIN \n');
        rl.prompt();
        rl.on('line', (userInput) => {
            if (userInput == answer) {
                console.log('YAY you got a correct anwser \n');
                rl.close();
            } else {
                rl.setPrompt(`${userInput} is incorrect \n`);
                rl.prompt();
            }
        })
    }
});
