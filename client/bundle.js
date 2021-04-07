(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const jwt_decode = require('jwt-decode');
const { renderHabits } = require('./habits');

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
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
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
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

    const landing = document.getElementById('landing');
    landing.className = "hide-page";
    const habit = document.getElementById('habit-page');
    habit.className = "";

    renderHabits();
}

function logout(){
    localStorage.clear();
}

function currentUser(){
    const id = localStorage.getItem('id')
    return id;
}

module.exports = { requestLogin, requestRegistration}
},{"./habits":2,"jwt-decode":7}],2:[function(require,module,exports){
const { getAllHabbits } = require('./requests')

async function renderHabits() {
  const feed = document.getElementById('habbit-list');
  const habits = document.createElement('div');
  const testData = [{
    id: 1,
    name: "Water Break",
    habit_desc: "Take a water break",
    frequency: "daily",
    streak_track: 4,
    streak_start: "test",
    streak_end: "test",
    user_id: 1
  }]
  const userHabits = await getAllHabbits();

  const allHabits = (habitData) => {
    const habit = document.createElement('div');
    habit.id = habitData.id;
    habit.className = "single-habit";
    const name = document.createElement('h3');
    name.textContent = habitData.name;
    const desc = document.createElement('p');
    desc.textContent = habitData.habit_desc;
    const freq = document.createElement('p');
    freq.textContent = `Frequency: ${habitData.frequency}`;
    const track = document.createElement('p');
    track.textContent = habitData.streak_track;
    const startDate = document.createElement('p');
    startDate.textContent = habitData.streak_start;
    const endDate = document.createElement('p');
    endDate.textContent = habitData.streak_end;
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.for=`complete-${habitData.id}`;
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.id = `complete-${habitData.id}`;
    checkBox.name = `complete-${habitData.id}`;

    habit.appendChild(name);
    habit.appendChild(desc);
    habit.appendChild(freq);
    habit.appendChild(track);
    habit.appendChild(startDate);
    habit.appendChild(endDate);
    habit.appendChild(checkBox);

    habits.appendChild(habit);
  }

  userHabits.forEach(allHabits);
  feed.appendChild(habits);
}

module.exports = {renderHabits};
},{"./requests":6}],3:[function(require,module,exports){
const { requestLogin, requestRegistration } = require('./auth')

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', requestLogin)

registerForm.addEventListener('submit', requestRegistration)
},{"./auth":1}],4:[function(require,module,exports){
require('./auth');
require('./habits');
require('./handlers');
require('./login');
require('./requests');
},{"./auth":1,"./habits":2,"./handlers":3,"./login":5,"./requests":6}],5:[function(require,module,exports){
$('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('MATCHING').css('color', 'green');
    } else 
      $('#message').html('NOT MATCHING').css('color', 'red');
  });


},{}],6:[function(require,module,exports){
async function postHabit(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/habits`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
    } catch (err) {
        console.warn(err);
    }
}




async function getAllHabbits(){
    try {
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch('http://localhost:3000/habits', options);
        const data = await response.json();
        if (data.err){ throw Error(data.err) }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabbits, postHabit }
},{}],7:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[4]);
