let forms = document.querySelectorAll('form');
const loginForm = forms[0];
const registerForm = forms[1];

loginForm.addEventListener('submit',requestLogin );
registerForm.addEventListener('submit',requestRegistration );