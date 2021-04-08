const { requestLogin, requestRegistration } = require('./auth')
const { postHabit } = require('./requests');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const habitForm = document.getElementById('habit-form');

loginForm.addEventListener('submit', requestLogin)

registerForm.addEventListener('submit', requestRegistration)

habitForm.addEventListener('submit', postHabit)
