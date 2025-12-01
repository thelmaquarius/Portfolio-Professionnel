// HEURE SYNCHRONISEE

function updateClock() {
      const now = new Date();
      let h = String(now.getHours()).padStart(2, "0");
      let m = String(now.getMinutes()).padStart(2, "0");

      document.getElementById("heure_verrouillage").textContent = `${h}:${m}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

const chargement = document.getElementById("chargement");
const bureau = document.getElementById("bureau");
const progression = document.querySelector(".progression");
const compteur = document.getElementById("compteur");

let width = 0;
const interval = setInterval(() => {
  width += 2; // augmente de 2% à chaque intervalle
  progression.style.width = width + "%";
  compteur.textContent = width + "%"; // synchronise le texte avec la barre

  if (width >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      chargement.classList.add("hidden");
      bureau.classList.remove("hidden");
    }, 500);
  }
}, 60); // intervalle = 60ms → ~3 secondes pour aller de 0 à 100


const windows = document.querySelectorAll(".window");

windows.forEach((win) => {
  const header = win.querySelector(".window-header");
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = 1000;
    header.style.cursor = 'grabbing';
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Calcul de la nouvelle position
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // Limites pour ne pas sortir de l'écran
    const maxLeft = window.innerWidth - win.offsetWidth;
    const maxTop = window.innerHeight - win.offsetHeight - 40; // moins la barre des tâches
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    win.style.left = newLeft + "px";
    win.style.top = newTop + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    win.style.zIndex = "";
    header.style.cursor = 'grab';
  });
});

// Sélectionne toutes les icônes et les fenêtres
const icons = document.querySelectorAll('.icon');
const allWindows = document.querySelectorAll('.window');

// Quand on clique sur une icône du bureau
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const target = icon.dataset.window; // ex: "about" ou "projects"
    const win = document.querySelector(`.window.${target}`);
    if (win) {
      win.classList.remove('hidden'); // affiche la fenêtre
    }
  });
});

// Quand on clique sur le bouton de fermeture (✕)
allWindows.forEach(win => {
  const closeBtn = win.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      win.classList.add('hidden'); // cache la fenêtre
    });
  }
});


  // Palette de fonds possibles
  const backgrounds = [
    'linear-gradient(to bottom, #ff86d7, #752ca9)',
    'linear-gradient(to bottom, #191954, #00D7FD)',
    'linear-gradient(to bottom, #0f3bb4, #ff51c5)',
    'linear-gradient(to bottom, #B24DF1, #25E4DB)'
  ];

  let currentIndex = 0; // commence au premier fond

  const startBtn = document.querySelector('.start');


startBtn.addEventListener('click', () => {
  // passe au fond suivant
  currentIndex = (currentIndex + 1) % backgrounds.length;
  bureau.style.background = backgrounds[currentIndex];
});