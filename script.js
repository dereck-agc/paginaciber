const signInButton = document.getElementById('login');
const signUpButton = document.getElementById('register');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('active');
});
