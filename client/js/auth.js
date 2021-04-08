const jwt_decode = require('jwt-decode');
const { getAllHabbits } = require('./requests');

async function requestLogin(e){
    e.preventDefault();
    
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }

        console.log(options.body);
        const r = await fetch(`http://localhost:3000/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    console.log('Test');
    e.preventDefault();
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        console.log(options.body);
        const r = await fetch(`http://localhost:3000/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("username", user.username);

    const landing = document.getElementById('landing');
    landing.className = "hide-page";
    const habit = document.getElementById('habit-page');
    habit.className = "";
    document.getElementById('register').style.display='none'

    getAllHabbits();
}

function logout(){
    localStorage.clear();
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = {requestLogin, requestRegistration}