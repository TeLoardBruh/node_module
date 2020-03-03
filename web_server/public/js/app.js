// select n get info from the hbs 
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const para_1 = document.querySelector('#forcast');
const para_2 = document.querySelector('#location');

para_1.textContent = '';
para_2.textContent = '';

weatherForm.addEventListener('submit',(e)=>{
    // prevent from refreshing the page
    e.preventDefault();
    // preapre for geting user input 
    const location = searchInput.value;
    fetch('http://localhost:3000/weather?address='+location+'').then(res => {
    console.log(res.json().then((data)=>{
        if(data.err){
            para_1.textContent = data.err;
            console.log(data.err);
        }else{
            para_1.textContent = data.forcast;
            para_2.textContent = data.location;
        }
    }));
});
})