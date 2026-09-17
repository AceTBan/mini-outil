'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // 1. Sélection des éléments HTML
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        buyReleaseBtn = document.querySelector('#buy-release'),
        buyEnterBtn = document.querySelector('#buy-enter'),
        buyLeaveBtn = document.querySelector('#buy-leave'),
        buyHoldBtn = document.querySelector('#buy-hold'),
        buyMoveBtn = document.querySelector('#buy-move'),
        buyAutoBtn = document.querySelector('#buy-auto'),
        buyWheelBtn = document.querySelector('#buy-wheel');

    // 2. Variables d'état du jeu
    let candyCounter = parseInt(localStorage.getItem('candyScore')) || 0,
        releaseUnlocked = false,
        enterUnlocked = false,
        leaveUnlocked = false,
        holdUnlocked = false,
        releaseCost = 100,
        enterCost = 50,
        leaveCost = 50,
        holdCost = 200,
        holdInterval = null,
        moveUnlocked = false,
        autoUnlocked = false,
        moveCost = 400,
        autoCost = 800,
        wheelUnlocked = false,
        wheelCost = 200;

    // 3. Fonction pour ajouter un bonbon + animation
    function ajouterBonbon() {
        candyCounter++;
        maintienAffichage();

        let pop = document.createElement('span');
        pop.innerText = ' +1 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        setTimeout(() => pop.remove(), 800);
    }

    // 4. Mise à jour de l'affichage et de l'état des boutons
    function maintienAffichage() {
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy ! ';
        
        if (!releaseUnlocked) buyReleaseBtn.disabled = candyCounter < releaseCost;
        if (!enterUnlocked) buyEnterBtn.disabled = candyCounter < enterCost;
        if (!leaveUnlocked) buyLeaveBtn.disabled = candyCounter < leaveCost;
        if (!holdUnlocked) buyHoldBtn.disabled = candyCounter < holdCost;
        if (!moveUnlocked) buyMoveBtn.disabled = candyCounter < moveCost;
        if (!autoUnlocked) buyAutoBtn.disabled = candyCounter < autoCost;
        if (!wheelUnlocked) buyWheelBtn.disabled = candyCounter < wheelCost;

        localStorage.setItem('candyScore', candyCounter);
    }

    // Stop le timer du clic maintenu quand on relâche ou qu'on sort du bouton
    function stopperMaintien() {
        if (holdInterval) {
            clearInterval(holdInterval);
            holdInterval = null;
        }
    }

    // --- ÉVÉNEMENTS DU BOUTON PRINCIPAL ---

    // Clic Appui + Gestion de la Pression Prolongée (Jour 4)
    starter.addEventListener('mousedown', function() {
        ajouterBonbon();

        // Si l'option Pression Prolongée est achetée, on lance la génération automatique en continu
        if (holdUnlocked && !holdInterval) {
            holdInterval = setInterval(ajouterBonbon, 150); // 1 bonbon toutes les 150ms
        }
    });

    // Relâchement  + Stop maintien
    starter.addEventListener('mouseup', function() {
        if (releaseUnlocked) ajouterBonbon();
        stopperMaintien();
    });

    // Entrée du curseur 
    starter.addEventListener('mouseenter', function() {
        if (enterUnlocked) ajouterBonbon();
    });

    // Sortie du curseur + Stop maintien
    starter.addEventListener('mouseleave', function() {
        if (leaveUnlocked) ajouterBonbon();
        stopperMaintien();
    });

        // Survol Turbo (Pixel par pixel)
    starter.addEventListener('mousemove', function() {
        if (moveUnlocked) ajouterBonbon();
    });

    // Auto-Clicker Passif (Génère 1 bonbon/sec sans rien faire)
    setInterval(function() {
        if (autoUnlocked) ajouterBonbon();
    }, 1000);


    // --- ACHATS EN BOUTIQUE ---

    // Achat : Relâchement
    buyReleaseBtn.addEventListener('click', function() {
        if (candyCounter >= releaseCost && !releaseUnlocked) {
            candyCounter -= releaseCost;
            releaseUnlocked = true;
            buyReleaseBtn.innerText = 'Point au relâchement : Activé ✔️';
            buyReleaseBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat : Entrée du bouton
    buyEnterBtn.addEventListener('click', function() {
        if (candyCounter >= enterCost && !enterUnlocked) {
            candyCounter -= enterCost;
            enterUnlocked = true;
            buyEnterBtn.innerText = 'Entrée du bouton : Activée ✔️';
            buyEnterBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat : Sortie du bouton
    buyLeaveBtn.addEventListener('click', function() {
        if (candyCounter >= leaveCost && !leaveUnlocked) {
            candyCounter -= leaveCost;
            leaveUnlocked = true;
            buyLeaveBtn.innerText = 'Sortie du bouton : Activée ✔️';
            buyLeaveBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat : Pression Prolongée
    buyHoldBtn.addEventListener('click', function() {
        if (candyCounter >= holdCost && !holdUnlocked) {
            candyCounter -= holdCost;
            holdUnlocked = true;
            buyHoldBtn.innerText = 'Pression Prolongée : Activée ✔️';
            buyHoldBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat Survol Turbo
    buyMoveBtn.addEventListener('click', function() {
        if (candyCounter >= moveCost && !moveUnlocked) {
            candyCounter -= moveCost;
            moveUnlocked = true;
            buyMoveBtn.innerText = 'Survol Turbo : Activé ✔️';
            buyMoveBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat Auto-Clicker Passif
    buyAutoBtn.addEventListener('click', function() {
        if (candyCounter >= autoCost && !autoUnlocked) {
            candyCounter -= autoCost;
            autoUnlocked = true;
            buyAutoBtn.innerText = 'Auto-Clicker : Activé ✔️';
            buyAutoBtn.disabled = true;
            maintienAffichage();
        }
    });
// Événement molette sur le bouton
starter.addEventListener('wheel', function() {
    if (wheelUnlocked) ajouterBonbon();
});

// Achat boutique
buyWheelBtn.addEventListener('click', function() {
    if (candyCounter >= wheelCost && !wheelUnlocked) {
        candyCounter -= wheelCost;
        wheelUnlocked = true;
        buyWheelBtn.innerText = 'Action Molette : Activée ✔️';
        buyWheelBtn.disabled = true;
        maintienAffichage();
    }
});
});