/* ========== 1) HORLOGE GLOBALE (index + accueil) ========== */

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
          window.location.href = "accueil.html";
        }, 500);
      }
    }, 40); // durée du chargement
  });
}

/* ===============================
   3) POPUPS PROJETS
   =============================== */
document.querySelectorAll(".icones_accueil .icone").forEach(icone => {
  icone.addEventListener("click", () => {
    const popupClass = icone.getAttribute("data-popup");
    if (!popupClass) return; // ignore les icônes sans data-popup
    const popup = document.querySelector("." + popupClass);
    if (popup) popup.classList.remove("hidden");
  });
});

// Fermeture des popups via croix ou bouton OK
document.querySelectorAll(".popup-close, .popup-ok").forEach(btn => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup-overlay");
    if (popup) popup.classList.add("hidden");
  });
});


/* ===============================
   4) NOTIFICATION + CLOCHE
   =============================== */
const notif = document.getElementById("notification");
const bell = document.getElementById("notifBell");
const popupStage = document.getElementById("popupStage");

// Affichage de la notification après 5s
if (notif) {
  setTimeout(() => {
    notif.classList.remove("hidden");
    requestAnimationFrame(() => notif.classList.add("show"));
  }, 5000);

  notif.addEventListener("click", () => {
    if (popupStage) popupStage.classList.remove("hidden");
    closeNotification();
  });
}

// Fonction pour fermer notification et montrer cloche
function closeNotification() {
  if (notif) {
    notif.classList.remove("show");
    notif.classList.add("hidden");
  }
  if (bell) {
    bell.classList.remove("hidden");
    requestAnimationFrame(() => bell.classList.add("show"));
  }
}

// Clic sur la cloche → rouvre popup
if (bell) {
  bell.addEventListener("click", () => {
    if (popupStage) popupStage.classList.remove("hidden");
  });
}

// Fermeture popup stage via boutons
if (popupStage) {
  popupStage.querySelectorAll(".popup-close, .popup-ok").forEach(btn => {
    btn.addEventListener("click", () => {
      popupStage.classList.add("hidden");
      closeNotification();
    });
  });
}
