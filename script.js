/* ========== 1) HORLOGE GLOBALE (index + accueil2) ========== */

function updateClockGlobal() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const timeText = `${h}:${m}`;

  const heureVerrou = document.getElementById("heure_verrouillage");
  const heureBureau = document.getElementById("heure_bureau");

  if (heureVerrou) {
    heureVerrou.textContent = timeText;
  }
  if (heureBureau) {
    heureBureau.textContent = timeText;
  }
}

// on lance une fois au chargement
updateClockGlobal();
// puis toutes les secondes
setInterval(updateClockGlobal, 1000);



/* ========== 2) CHARGEMENT SUR index.html + REDIRECTION ========== */

const boutonVerrouillage = document.getElementById("bouton_verrouillage");
const ecranChargement = document.getElementById("chargement");

if (boutonVerrouillage && ecranChargement) {
  const containerVerrouillage = document.querySelector(".container_verrouillage");
  const progression = ecranChargement.querySelector(".progression");
  const compteur = document.getElementById("compteur");

  boutonVerrouillage.addEventListener("click", (e) => {
    e.preventDefault(); // on bloque le lien <a>

    // cacher l'écran de verrouillage
    if (containerVerrouillage) {
      containerVerrouillage.style.display = "none";
    }

    // afficher l'écran de chargement
    ecranChargement.classList.remove("hidden");

    let width = 0;

    const interval = setInterval(() => {
      width += 2;
      if (progression) progression.style.width = width + "%";
      if (compteur) compteur.textContent = width + "%";

      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = "accueil2.html";
        }, 500);
      }
    }, 60); // ~3s
  });
}

/* ========== 3) NOTIFICATION 5 SECONDES APRÈS CHARGEMENT (accueil2.html) ========== */

/* ========== NOTIFICATION + POPUP (accueil2.html) ========== */

const notif = document.getElementById("notification");
const popup = document.getElementById("popupStage");
const popupOkBtn = document.getElementById("popupOkBtn");
const popupCloseBtn = document.getElementById("popupCloseBtn");

if (notif) {
  // 5 secondes après l'arrivée sur la page d'accueil2
  setTimeout(() => {
    notif.classList.remove("hidden");
    // petit délai pour déclencher la transition
    requestAnimationFrame(() => {
      notif.classList.add("show");
    });
  }, 1000);

  // clic sur la notification -> ouvre la fenêtre
  notif.addEventListener("click", () => {
    if (popup) {
      popup.classList.remove("hidden");
    }
  });
}

// Bouton "J'ai compris" -> ferme la fenêtre + la notif
if (popupOkBtn) {
  popupOkBtn.addEventListener("click", () => {
    if (popup) popup.classList.add("hidden");
    if (notif) notif.classList.add("hidden");
  });
}

// Bouton X -> ferme juste la fenêtre
if (popupCloseBtn) {
  popupCloseBtn.addEventListener("click", () => {
    if (popup) popup.classList.add("hidden");
  });
}

/* ========== CLOCHETTE QUI RÉACTIVE LA NOTIF ========== */

const bell = document.getElementById("notifBell");

function afficherCloche() {
  if (!bell) return;
  bell.classList.remove("hidden");
  requestAnimationFrame(() => {
    bell.classList.add("show");
  });
}

function masquerCloche() {
  if (!bell) return;
  bell.classList.remove("show");
  setTimeout(() => bell.classList.add("hidden"), 200);
}

// Quand on ferme la popup → afficher la cloche

if (popupOkBtn) {
  popupOkBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    notif.classList.add("hidden");
    afficherCloche();
  });
}

if (popupCloseBtn) {
  popupCloseBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    afficherCloche();
  });
}

// Clic cloche → remettre la notification

if (bell) {
  bell.addEventListener("click", () => {
    // masquer la cloche
    masquerCloche();

    // afficher la notification
    notif.classList.remove("hidden");

    requestAnimationFrame(() => {
      notif.classList.add("show");
    });
  });
}

