import * as cookie from './cookie.mjs';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');
const username = document.querySelector('#username');
const phone = document.querySelector('#phone');

document.querySelector('.btn').onclick = function (event) {
    event.preventDefault();

    check();

    const usernameValue = username.value;
    const phoneValue = phone.value;
    const emailValue = email.value;
    const passwordValue = password.value;
 
    const new_user = {
        username: usernameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue
    };


    fetch('http://127.0.0.1:5000/registration', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_user)
    }).then(response => {
        if(response.status===200){
            return response.json();
        }
        throw response.status;
    }).then(data => {
        cookie.setCookie('access_token', data['access_token'], 60);
        window.location.replace('index.html');
    }).catch((error)=>{
        console.log(error);
        if(error === 403){
            alert('User with this email or username already registered');
        }
        if(error === 400){
            alert('Please fill in all fields');
        }
    });
}


function check(){
    if (password.value !== confirm_password.value) {
        password.value = '';
        password.placeholder = 'Passwords do not match';
        confirm_password.value = '';
        confirm_password.placeholder = 'Passwords do not match';
    }

    if (password.value.length < 6) {
        password.value = '';
        password.placeholder = 'Password must contain at least 6';
        confirm_password.value = '';
        confirm_password.placeholder = 'Password must contain at least 6';
    }

    if (email.value.length < 1) {
        email.value = '';
        email.placeholder = 'Fill in the field';
    }

    if (username.value.length < 1) {
        username.value = '';
        username.placeholder = 'Fill in the field';
    }

    if (phone.value.length < 1) {
        phone.value = '';
        phone.placeholder = 'Fill in the field';
    }
}

