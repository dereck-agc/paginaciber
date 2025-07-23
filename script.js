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
let keyPressed = false;

// Escribir línea a línea pantalla de booteo
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
        setTimeout(typeNextLine, 400);
      }
    }, 30);
  } else {
    document.addEventListener("keydown", continueOnce);
  }
}

// Solo continuar una vez al presionar tecla
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
  showSection('intro');
}

// Guardar texto original en dataset para efecto máquina
function saveOriginalTexts() {
  sections.forEach(section => {
    section.querySelectorAll('p').forEach(p => {
      p.dataset.fullText = p.textContent.trim();
      p.textContent = '';
      p.style.visibility = 'hidden';
    });
    section.querySelectorAll('ul').forEach(ul => {
      ul.dataset.fullHtml = ul.innerHTML.trim();
      ul.innerHTML = '';
      ul.style.visibility = 'hidden';
    });
    // Títulos visibles directo
    section.querySelectorAll('h1, h2, h3').forEach(title => {
      title.style.visibility = 'visible';
    });
  });
}

// Efecto máquina para texto simple
function typeText(element, text) {
  return new Promise(resolve => {
    element.style.visibility = 'visible';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 25);
  });
}

// Efecto máquina para listas
function typeList(element, fullHtml) {
  return new Promise(resolve => {
    element.style.visibility = 'visible';
    element.innerHTML = '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fullHtml;
    const items = Array.from(tempDiv.querySelectorAll('li'));

    let index = 0;

    function writeNextItem() {
      if (index >= items.length) {
        resolve();
        return;
      }
      const li = document.createElement('li');
      element.appendChild(li);
      let text = items[index].textContent;
      let charIndex = 0;

      const interval = setInterval(() => {
        li.textContent += text.charAt(charIndex);
        charIndex++;
        if (charIndex === text.length) {
          clearInterval(interval);
          index++;
          setTimeout(writeNextItem, 150);
        }
      }, 25);
    }
    writeNextItem();
  });
}

// Escribe todo el contenido (p y ul) de una sección con efecto máquina
async function typeSectionContent(section) {
  // Mostrar títulos directamente
  section.querySelectorAll('h1, h2, h3').forEach(title => {
    title.style.visibility = 'visible';
  });

  const paragraphs = Array.from(section.querySelectorAll('p'));
  const lists = Array.from(section.querySelectorAll('ul'));

  // Escribimos párrafos
  for (const p of paragraphs) {
    await typeText(p, p.dataset.fullText);
  }

  // Escribimos listas
  for (const ul of lists) {
    await typeList(ul, ul.dataset.fullHtml);
  }
}

// Mostrar una sección (solo una visible)
async function showSection(id) {
  // Ocultamos todas las secciones
  sections.forEach(section => {
    section.classList.remove('active');
  });
  // Mostramos la que corresponde
  const currentSection = document.getElementById(id);
  currentSection.classList.add('active');

  // Limpia textos antes de reescribir (importante si vuelves a la sección)
  currentSection.querySelectorAll('p').forEach(p => {
    p.textContent = '';
    p.style.visibility = 'hidden';
  });
  currentSection.querySelectorAll('ul').forEach(ul => {
    ul.innerHTML = '';
    ul.style.visibility = 'hidden';
  });

  // Escribir contenido con efecto máquina
  await typeSectionContent(currentSection);
}

// Event listeners para menú
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-target');
    showSection(target);
  });
});

// Guardamos los textos originales al cargar para el efecto máquina
saveOriginalTexts();

// Iniciamos la pantalla de booteo
typeNextLine();
