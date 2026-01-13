// TRADUCTION ANGLAIS

const translations = {
    fr: {
        "titre-webinventory": "Site WebInventory.exe",
        "titre-campagne" : "Campagne de communication.exe",
        "titre-motion-design" : "Motion Design - Les Petites Légendes.exe",
        "titre-court-metrage" : "Court-Métrage.exe",
        "titre-dataviz" : "Site ORBIS.exe",
        "paragraphe-interview" : `Lors de mon premier semestre, j’ai travaillé sur un projet scolaire d’interview vidéo avec quatre camarades. Nous avons d'abord rédigé une dizaine de questions, avant de tourner dans les locaux de l’intervenant. Afin de proposer des réalisations uniques, nous avons tous réalisé nos propres montages seuls sur Adobe Premiere Pro, dont le mien est le suivant. <br> <br>
        Cette expérience m’a permis de développer mes compétences en montage vidéo (découpe des plans, transitions, gestion du rythme) mais aussi d’apprendre à mettre en valeur le discours de l’interviewé à travers les enchaînements et les choix d’image, pour mieux faire ressentir son message. Elle m’a également donné envie d’approfondir mes connaissances en audiovisuel et de progresser en laissant davantage ma créativité et ma personnalité s’exprimer à travers mes prochains montages.`,
        "bouton-langue": "Change to English",
        "bouton-fermer": "Fermer"
    },
    en: {
        "titre-webinventory": "Inventory Website.exe",
        "titre-campagne" : "Communication Campaign.exe",
        "titre-motion-design" : "Motion Design.exe",
        "titre-court-metrage" : "Short Film.exe",
        "titre-dataviz" : "ORBIS Website.exe",
        "paragraphe-interview": `During my first semester, I worked on a school video interview project with four classmates. We first drafted about ten questions before filming at the speaker's premises. To provide unique results, we all created our own edits individually using Adobe Premiere Pro; mine is as follows. <br> <br>
        This experience allowed me to develop my video editing skills (cutting shots, transitions, rhythm management) but also to learn how to highlight the interviewee's speech through sequences and image choices, to better convey their message. It also made me want to deepen my knowledge of audiovisual production and to progress by letting my creativity and personality express themselves more through my future edits.`,
        "bouton-langue": "Passer en Français",
        "bouton-fermer": "Close"
    }
};

// 1. Correction du sélecteur (on cible la classe car tu n'as pas d'ID dans le HTML)
const btnLang = document.querySelector('.taskbar-english');
let currentLang = localStorage.getItem('selectedLang') || 'fr';

// 2. Fonction pour appliquer la traduction
function applyTranslations() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            // Utilisation de innerHTML pour garder les sauts de ligne si besoin
            element.innerHTML = translations[currentLang][key];
        }
    });
    
    // Mise à jour du texte du bouton avec la bonne clé
    if (btnLang) {
        btnLang.textContent = translations[currentLang]["bouton-langue"];
    }
}

// 3. Au clic sur le bouton
if (btnLang) {
    btnLang.addEventListener('click', () => {
        currentLang = (currentLang === 'fr') ? 'en' : 'fr';
        localStorage.setItem('selectedLang', currentLang);
        applyTranslations();
    });
}

// 4. AU CHARGEMENT
applyTranslations();