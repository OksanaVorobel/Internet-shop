import * as cookie from './cookie.mjs';

const email = document.querySelector('#email');
const password = document.querySelector('#password');

document.querySelector('.btn').onclick = function (event) {
    event.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    const user = {
        email: emailValue,
        password: passwordValue
    };

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        throw response.status;
    }).then(data => {
        cookie.setCookie('access_token', data['access_token'], 60);
        window.location.replace('index.html');
    }).catch((error) => {
        console.log(error);
        if (error === 403) {
            alert('Wrong password');
        }
        if (error === 404) {
            alert(cookie.getAuthToken());
        }
    });
}