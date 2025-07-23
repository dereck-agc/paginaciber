const signInButton = document.getElementById('login');
const signUpButton = document.getElementById('register');
const container = document.getElementById('container');

// Evita múltiples clics rápidos
let isTransitioning = false;

signUpButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    container.classList.add('active');
    console.log("Activado: registro");
    setTimeout(() => {
        isTransitioning = false;
    }, 500); // Tiempo de transición
});

signInButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    container.classList.remove('active');
    console.log("Activado: login");
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
});
