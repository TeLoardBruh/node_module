var socket = io();
// Elements
const $messageForm = document.querySelector('#inputMessage');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $geoLocation = document.querySelector('#send_location');
const $messages = document.querySelector('#messages');



// templates
const messageTemplates = document.querySelector('#message_template').innerHTML;
const messageTemplates_links = document.querySelector('#message_template_links').innerHTML;
const sideBarTemplae = document.querySelector('#sidebar_template').innerHTML;

// Options 
const {
    username,
    room
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// function auto scroll()
const autoScroll = () => {
    // new Message element 
    const $newMessage = $messages.lastElementChild;

    // get the height of the message 
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // visable height 
    const visibleHeight = $messages.offsetHeight;

    // Height of messages container
    const containerHeight = $messages.scrollHeight;

    // How far have i scroll 
    const scrollOffset = $messages.scrollTop + visibleHeight;

    // take whole container check with the last message 
    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    // console.log(message);
    const html = Mustache.render(messageTemplates, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoScroll();
})

socket.on('locationMessage', (message) => {
    // console.log(message);
    const html = Mustache.render(messageTemplates_links, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);

    autoScroll();
})

// list user on sidebar 
socket.on('roomData', ({
    room,
    users
}) => {
    const html = Mustache.render(sideBarTemplae, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html;
})
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // disable the button when send 
    $messageFormButton.setAttribute('disabled', 'disabled');
    const msg = e.target.elements.message.value;

    socket.emit('sendMessage', msg, (error) => {
        // when it get correct send then enable again
        $messageFormButton.removeAttribute('disabled');
        // set field empty after send data 
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        } else {
            console.log("message has delivered !");
        }
    });
})
// my style 
// socket.on('shareLocation',(position)=>{
//     console.log(position);
// })

$geoLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not support by your browser")
    } else {
        $geoLocation.setAttribute('disabled', 'disabled');
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            console.log("Latitude : " + position.coords.latitude + " Longtitude : " + position.coords.longitude);
            socket.emit('shareButton', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                $geoLocation.removeAttribute('disabled');
                console.log("Location shared!");

            })
        })
    }
})

socket.emit('join', {
    username,
    room
}, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
})