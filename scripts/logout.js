import * as cookie from "./cookie.mjs";

if(cookie.getAuthToken() === null){
    document.querySelector('#logout-btn').setAttribute('hidden',true); //приховано
    document.querySelector('#profile-btn').setAttribute('hidden',true);
}else{
    document.querySelector('#login-btn').setAttribute('hidden',true);
    document.querySelector('#reg-btn').setAttribute('hidden',true);
}

function logout(){
    cookie.clearCookie('access_token');
    fetch('http://127.0.0.1:5000/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.status === 200) {
            cookie.clearCookie('access_token');
            return response.json();
        }
        throw response.status;
    });
}
document.querySelector('#logout-btn').addEventListener('click',logout);