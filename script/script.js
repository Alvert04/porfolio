// --- CONFIGURACIÓN & DATOS ---
const translations = {
    en: {
        loading: "Loading System...",
        aboutIcon: "About Me", projectsIcon: "Projects", skillsIcon: "Skills", 
        programsIcon: "Programs", educationIcon: "Education", achievementsIcon: "Achievements", 
        socialIcon: "Social", contactIcon: "Contact", cvIcon: "CV",
        aboutTitle: "About Me", projectsTitle: "Projects",
        greeting: "Hi, I'm Alberto 👋",
        bio1: "Programmer with experience in game development and backend.",
        bio2: "Indie developer since 2018 (C#, Python, JS).",
        genreLabel: "Genre:", skillsLabel: "Skills:",
        sendBtn: "Send", contactMsg: "Send me a direct message:",
        // Añade el resto de tus traducciones aquí...
    },
    es: {
        loading: "Cargando Sistema...",
        aboutIcon: "Sobre mí", projectsIcon: "Proyectos", skillsIcon: "Habilidades",
        programsIcon: "Programas", educationIcon: "Educación", achievementsIcon: "Logros",
        socialIcon: "Redes", contactIcon: "Contacto", cvIcon: "CV",
        aboutTitle: "Sobre mí", projectsTitle: "Proyectos",
        greeting: "Hola, soy Alberto 👋",
        bio1: "Programador con experiencia en desarrollo de videojuegos y backend.",
        bio2: "Desarrollador indie desde 2018 (C#, Python, JS).",
        genreLabel: "Género:", skillsLabel: "Habilidades:",
        sendBtn: "Enviar", contactMsg: "Envíame un mensaje directo:",
        // Añade el resto de tus traducciones aquí...
    }
};
const projectsData = [
  {
    id: "proj1",
    title: "Beyond Salvation: Remnant Protocol",
    type: "image",
    src: "img/Proyectos/BeyondVR.jpeg",
    genre: "VR Survival Horror",
    skills: "C#, Texturing, 3D Modeling, Animation, Level Design, VR Optimization, VR Interaction",
    duration: "3 months",
    role: "Technical Artist"
  },
  {
    id: "proj2",
    type: "image",
    src: "img/Proyectos/Deadly.png",
    title: "Deadly Tiles (Game Jam Project)",
    genre: "Puzzle, Horror",
    skills: "Texturing, Animation, Lighting, 3D Modeling, Optimization, Shaders",
    duration: "1 month",
    role: "Lead Artist / Technical Artist"
  },
  {
    id: "proj3",
    type: "video",
    src: "img/Proyectos/Glitched.mp4",
    title: "The Glitched Attraction",
    genre: "Survival Horror",
    skills: "Set Dressing, 3D Modeling, Animation, Texturing, Enemy & Environment Logic, Optimization",
    duration: "3 years 4 months",
    role: "Lead Artist"
  },
  {
    id: "proj4",
    type: "image",
    src: "img/Proyectos/OverScaled.png",
    title: "Overscaled (Game Jam Project)",
    genre: "3D Platformer, Puzzle",
    skills: "Environment Creation, Level Design, Game Logic, Programming",
    duration: "4 days",
    role: "Lead Artist / Technical Artist"
  },
  {
    id: "proj5",
    type: "video",
    src: "img/Proyectos/Beyond.mp4",
    title: "Beyond Salvation",
    genre: "Survival Horror",
    skills: "3D Modeling, Texturing, Level Design, Game Logic",
    duration: "2 years",
    role: "Lead Artist / Technical Artist"
  },
  {
    id: "proj6",
    type: "image",
    src: "img/Proyectos/Noah.png",
    title: "Noah's Countdown",
    genre: "2D Platformer",
    skills: "Level Design, Environment Creation, 2D Modeling, Texturing",
    duration: "1 month",
    role: "Lead Artist"
  },
  {
    id: "proj7",
    type: "video",
    src: "img/Proyectos/Christmas.mp4",
    title: "Christmas with Freddy's",
    genre: "2D Point-and-Click, Horror",
    skills: "Set Dressing, Texturing, 3D/2D Modeling, Programming",
    duration: "5 months",
    role: "Artist & Level Designer"
  },
  {
    id: "proj8",
    type: "image",
    src: "img/Proyectos/Purgatory.webp",
    title: "The Purgatory and the Stolen Souls",
    genre: "2D Run and Gun",
    skills: "Animation, 2D Modeling, Level Design, Game Logic",
    duration: "5 months",
    role: "Programmer & Level Designer"
  }
];

const skillsData = {
    technical: [
        { name: "C#", value: 90 },
        { name: "Unity", value: 85 },
        { name: "JavaScript", value: 75 }
    ],
    artistic: [
        { name: "3D Modeling", value: 80 },
        { name: "Photoshop", value: 70 }
    ]
};

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    // Simular carga
    setTimeout(() => {
        const loader = document.getElementById("loadingScreen");
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 1500);

    // Reloj
    setInterval(updateClock, 1000);
    updateClock();

    // Renderizar Skills Iniciales
    renderSkills('technical');

    // Renderizar Proyectos
    renderProjects();

    // Idioma inicial
    setLanguage('es');

    // Inicializar Drag para ventanas (Solo Desktop)
    initDraggableWindows();
});


// --- FUNCIONES DE VENTANA ---
let zIndexCounter = 100;

function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    
    win.style.display = 'flex';
    bringToFront(win);
    
    // Si estamos en desktop, posición aleatoria ligera para que no se solapen perfecto
    if(window.innerWidth >= 768 && !win.hasAttribute('data-positioned')) {
        const randomOffset = Math.floor(Math.random() * 50);
        win.style.top = (100 + randomOffset) + 'px';
        win.style.left = (200 + randomOffset) + 'px';
        win.setAttribute('data-positioned', 'true');
    }
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function bringToFront(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}

// --- ARRASTRE DE VENTANAS (SOLO DESKTOP) ---
function initDraggableWindows() {
    const windows = document.querySelectorAll('.window');
    const desktop = document.querySelector('.desktop');

    windows.forEach(win => {
        const header = win.querySelector('.title-bar');
        
        // Evento Mouse (Desktop)
        header.addEventListener('mousedown', (e) => {
            // Ignorar si estamos en móvil (position fixed)
            if (window.getComputedStyle(win).position === 'fixed') return;

            bringToFront(win);
            
            let shiftX = e.clientX - win.getBoundingClientRect().left;
            let shiftY = e.clientY - win.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                // Límites básicos
                let newLeft = pageX - shiftX;
                let newTop = pageY - shiftY;
                
                // Evitar salir por arriba a la izquierda
                if(newTop < 0) newTop = 0;
                if(newLeft < 0) newLeft = 0;

                win.style.left = newLeft + 'px';
                win.style.top = newTop + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        });
    });
}

// --- RENDERIZADO DE CONTENIDO ---
function renderProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = '';
    
    // Obtenemos textos traducidos actuales (simple)
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang];

    projectsData.forEach(p => {
        const div = document.createElement('div');
        div.className = 'project-card';
        
        let mediaHtml = '';
        if(p.type === 'video') {
            // Nota: autoplay videos requieren muted
            mediaHtml = `<video src="${p.src}" autoplay muted loop playsinline></video>`;
        } else {
            mediaHtml = `<img src="${p.src}" onerror="this.src='https://via.placeholder.com/150'">`;
        }

        div.innerHTML = `
            ${mediaHtml}
            <div class="project-info">
                <h4>${p.title}</h4>
                <p><small><strong>${t.genreLabel || 'Genre:'}</strong> ${p.genre}</small></p>
                <p><small><strong>${t.skillsLabel || 'Skills:'}</strong> ${p.skills}</small></p>
                <p>${p.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSkills(type) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    
    // Ordenar por valor
    const skills = skillsData[type].sort((a,b) => b.value - a.value);

    skills.forEach(skill => {
        const div = document.createElement('div');
        // Cálculo de color (Rojo -> Verde)
        // Simple interpolación CSS o clase estática
        const color = skill.value > 75 ? '#28a745' : (skill.value > 50 ? '#ffc107' : '#dc3545');
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:2px;">
                <span>${skill.name}</span>
                <span>${skill.value}%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" style="width:${skill.value}%; background-color:${color};"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Evento cambio tipo skill
document.getElementById('skillsType').addEventListener('change', (e) => {
    renderSkills(e.target.value);
});

// --- IDIOMA & RELOJ ---
document.getElementById('langSelect').addEventListener('change', (e) => {
    setLanguage(e.target.value);
    renderProjects(); // Re-renderizar para actualizar etiquetas
});

function setLanguage(lang) {
    const t = translations[lang];
    if(!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(t[key]) el.innerText = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(t[key]) el.placeholder = t[key];
    });
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    document.getElementById('clock').innerHTML = `${timeString}<br><span style="font-size:10px">${dateString}</span>`;
}