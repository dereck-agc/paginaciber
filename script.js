const bootLines = [
  "Iniciando Ciberseguridad v1.0...",
  "Cargando módulos esenciales...",
  "Estableciendo conexiones de red...",
  "Inicializando interfaz de usuario...",
  "Preparando contenido principal...",
  "Listo, bienvenido al Colegio Técnico Profesional Jesús Ocaña Rojas.",
  "Presiona cualquier tecla para continuar..."
];

const bootScreen = document.getElementById("boot-screen");
const mainContent = document.getElementById("main-content");
const sections = document.querySelectorAll(".section");
const menuLinks = document.querySelectorAll("nav a");

let lineIndex = 0;
let keyPressed = false; // Para que funcione solo 1 vez

function typeNextLine() {
  if (lineIndex < bootLines.length) {
    const line = document.createElement("div");
    bootScreen.appendChild(line);

    let charIndex = 0;
    const interval = setInterval(() => {
      line.textContent += bootLines[lineIndex][charIndex];
      charIndex++;
      if (charIndex === bootLines[lineIndex].length) {
        clearInterval(interval);
        lineIndex++;
        setTimeout(typeNextLine, 500);
      }
    }, 30);
  } else {
    // Esperar a que presionen una tecla, solo 1 vez
    document.addEventListener("keydown", continueOnce);
  }
}

function continueOnce() {
  if (!keyPressed) {
    keyPressed = true;
    showMainContent();
    document.removeEventListener("keydown", continueOnce);
  }
}

function showMainContent() {
  bootScreen.style.display = "none";
  mainContent.style.display = "block";
  showSection('intro'); // Muestra la primera sección al iniciar
}

function showSection(id) {
  sections.forEach(section => {
    if (section.id === id) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

// Añadir evento click a cada enlace del menú
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-target");
    showSection(target);
  });
});

// Iniciar efecto de booteo
typeNextLine();
