(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./requests":6,"./url":7,"jwt-decode":8}],2:[function(require,module,exports){
const API_URL = require('./url');

async function renderHabits(data) {
  const feed = document.getElementById('habbit-list');
  const habits = document.createElement('div');


  const allHabits = (habitData) => {
    let format_c_date;
    if (habitData.streak_complete) {
      const complete_date = new Date(habitData.streak_complete)
      format_c_date = formatDate(complete_date)
    } else {
      format_c_date = 'Not completed yet.'
    }
    const end_date = new Date(habitData.streak_end)
    let format_e_date = formatDate(end_date)

    const habit = document.createElement('div');
    habit.id = habitData.id;
    habit.className = "single-habit";
    const name = document.createElement('h3');
    name.textContent = habitData.name;
    name.className = "habbit-name";
    const desc = document.createElement('p');
    desc.textContent = habitData.desc;
    desc.className = "habbit-desc";
    const freq = document.createElement('p');
    freq.textContent = `Frequency: ${habitData.frequency}`;
    freq.className = "habbit-freq";
    const track = document.createElement('p');
    track.id = `count-${habitData.id}`
    track.textContent = `Streak: ${habitData.streak_track}`;
    track.className = "habbit-track";
    const startDate = document.createElement('p');
    startDate.textContent = `When you can next complete this habbit: ${format_c_date}`;
    startDate.className = "habbit-complete-date";
    const endDate = document.createElement('p');
    endDate.textContent = `Streak end date: ${format_e_date}`;
    endDate.className = "habbit-streak-end";
    endDate.style = 'margin-bottom: 10px;'
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.for=`complete-${habitData.id}`;
    checkBoxLabel.textContent = 'Mark as complete: '
    checkBoxLabel.className = "habbit-check-label";
    const checkBox = document.createElement('input');
    checkBox.className = "habbit-checkbox";

    const current_date = new Date();
    const old_date = new Date(habitData.streak_complete)
    checkBox.type = "checkbox";
    checkBox.id = `complete-${habitData.id}`;
    checkBox.name = `complete-${habitData.id}`;
    if(old_date && old_date > current_date) {
      checkBox.checked = true;
      checkBox.disabled = true;
    } else {
      checkBox.disabled = false;
    }
    console.log(updateHabitClient);
    console.log(checkBox);
    checkBox.addEventListener('change', updateHabitClient)

    habit.appendChild(name);
    habit.appendChild(desc);
    habit.appendChild(freq);
    habit.appendChild(track);
    habit.appendChild(startDate);
    habit.appendChild(endDate);
    habit.appendChild(checkBoxLabel);
    habit.appendChild(checkBox);

    feed.prepend(habit);
  }

  data.forEach(allHabits);
}

async function updateHabitClient(e) {
    e.target.disable = true;
    const habit_id = e.target.parentElement.id;
    try {
        const options = {
            method: 'PATCH',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch(`${API_URL}/${habit_id}`, options);
        const data = await response.json();
        console.log(data);
        if (data.err){ throw Error(data.err) }
        updateStreak(data);
    } catch (err) {
        console.warn(err);
    }
}

async function updateStreak(data) {
  let id = localStorage.getItem('id')
  let count = data.streak_track;
  let checkedBox = document.getElementById(`complete-${data.id}`);
  checkedBox.disabled = true;
  let theCounter = document.getElementById(`count-${data.id}`)
  theCounter.textContent = count;
}


function formatDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const format_date = month  + '\n'+ day  + ',' + year;
  return format_date;
}

module.exports = {renderHabits, updateStreak};

},{"./url":7}],3:[function(require,module,exports){
const { requestLogin, requestRegistration, logout } = require('./auth')
const { postHabit } = require('./requests');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const habitForm = document.getElementById('habit-form');
const signOutButton = document.getElementById('sign-out')

loginForm.addEventListener('submit', requestLogin)

registerForm.addEventListener('submit', requestRegistration)

habitForm.addEventListener('submit', postHabit)

signOutButton.addEventListener('click', logout)
},{"./auth":1,"./requests":6}],4:[function(require,module,exports){
require('./auth');
require('./habits');
require('./handlers');
require('./login');
require('./requests');
require('./url');
},{"./auth":1,"./habits":2,"./handlers":3,"./login":5,"./requests":6,"./url":7}],5:[function(require,module,exports){
$('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('MATCHING').css('color', 'green');
    } else 
      $('#message').html('NOT MATCHING').css('color', 'red');
  });

  
},{}],6:[function(require,module,exports){
const { renderHabits,  updateStreak } = require('./habits');
const API_URL = require('./url');

async function postHabit(e){
    e.preventDefault();
    try {
        let formData = new FormData(e.target)
        let userID = localStorage.getItem('id')
        formData.append('id', userID);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        const r = await fetch(`${API_URL}/habits`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        renderHabits([data]);
    } catch (err) {
        console.warn(err);
    }
}


async function getAllHabbits(){
    try {
        let id = localStorage.getItem('id')
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch(`${API_URL}/habits/${id}`, options);
        const data = await response.json();
        if (data.err){ throw Error(data.err) }
        renderHabits(data);
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabbits, postHabit }
},{"./habits":2,"./url":7}],7:[function(require,module,exports){
module.exports = 'https://hobbit-api.herokuapp.com'
// module.exports = 'http://localhost:3000'

},{}],8:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[4]);
