const jwt_decode = require('jwt-decode');
const { getAllHabbits } = require('./requests');
const API_URL = require('./url');


async function requestLogin(e){
    e.preventDefault();
    
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }

        const r = await fetch(`${API_URL}/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        const r = await fetch(`${API_URL}/auth/register`, options)
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
    document.getElementById('login').style.display='none'
    document.querySelector('.header-buttons').style.display='none'

    getAllHabbits();
}

function logout(){
    localStorage.clear();
    location.reload();
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = {requestLogin, requestRegistration, logout, currentUser, login}
