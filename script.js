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
/* ========== NOTIFICATION + POPUP + CLOCHETTE (accueil2.html) ========== */

const notif = document.getElementById("notification");
const popup = document.getElementById("popupStage");
const popupOkBtn = document.getElementById("popupOkBtn");
const popupCloseBtn = document.getElementById("popupCloseBtn");
const bell = document.getElementById("notifBell");

// 1) Afficher la notif après 5 secondes
if (notif) {
  setTimeout(() => {
    notif.classList.remove("hidden");
    requestAnimationFrame(() => {
      notif.classList.add("show");
    });
  }, 1000);

  // clic sur la notif → ouvrir la popup
  notif.addEventListener("click", () => {
    if (popup) {
      popup.classList.remove("hidden");
    }
  });
}

// 2) Fonction commune : fermer la popup, cacher la notif, montrer la cloche
function closePopupAndShowBell() {
  if (popup) {
    popup.classList.add("hidden");
  }
  if (notif) {
    notif.classList.remove("show");
    notif.classList.add("hidden"); // disparaît pour de bon
  }
  if (bell) {
    bell.classList.remove("hidden");
    requestAnimationFrame(() => {
      bell.classList.add("show");
    });
  }
}

// bouton "J'ai compris"
if (popupOkBtn) {
  popupOkBtn.addEventListener("click", closePopupAndShowBell);
}

// bouton X
if (popupCloseBtn) {
  popupCloseBtn.addEventListener("click", closePopupAndShowBell);
}

// 3) Clic sur la cloche → rouvre juste la popup, la cloche reste
if (bell) {
  bell.addEventListener("click", () => {
    if (popup) {
      popup.classList.remove("hidden");
    }
    // on ne touche pas à la notif → elle reste cachée
  });
}

