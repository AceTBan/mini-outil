'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // 1. Sélection des éléments HTML
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        buyReleaseBtn = document.querySelector('#buy-release'),
        buyEnterBtn = document.querySelector('#buy-enter'),
        buyLeaveBtn = document.querySelector('#buy-leave'),
        buyHoldBtn = document.querySelector('#buy-hold');

    // 2. Variables d'état du jeu
    let candyCounter = 0,
        releaseUnlocked = false,
        enterUnlocked = false,
        leaveUnlocked = false,
        holdUnlocked = false,
        releaseCost = 100,
        enterCost = 50,
        leaveCost = 50,
        holdCost = 200,
        holdInterval = null;

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

    // Relâchement (Jour 2) + Stop maintien
    starter.addEventListener('mouseup', function() {
        if (releaseUnlocked) ajouterBonbon();
        stopperMaintien();
    });

    // Entrée du curseur (Jour 3)
    starter.addEventListener('mouseenter', function() {
        if (enterUnlocked) ajouterBonbon();
    });

    // Sortie du curseur (Jour 3) + Stop maintien
    starter.addEventListener('mouseleave', function() {
        if (leaveUnlocked) ajouterBonbon();
        stopperMaintien();
    });

    // --- ACHATS EN BOUTIQUE ---

    // Achat Jour 2 : Relâchement
    buyReleaseBtn.addEventListener('click', function() {
        if (candyCounter >= releaseCost && !releaseUnlocked) {
            candyCounter -= releaseCost;
            releaseUnlocked = true;
            buyReleaseBtn.innerText = 'Point au relâchement : Activé ✔️';
            buyReleaseBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat Jour 3 : Entrée du bouton
    buyEnterBtn.addEventListener('click', function() {
        if (candyCounter >= enterCost && !enterUnlocked) {
            candyCounter -= enterCost;
            enterUnlocked = true;
            buyEnterBtn.innerText = 'Entrée du bouton : Activée ✔️';
            buyEnterBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat Jour 3 : Sortie du bouton
    buyLeaveBtn.addEventListener('click', function() {
        if (candyCounter >= leaveCost && !leaveUnlocked) {
            candyCounter -= leaveCost;
            leaveUnlocked = true;
            buyLeaveBtn.innerText = 'Sortie du bouton : Activée ✔️';
            buyLeaveBtn.disabled = true;
            maintienAffichage();
        }
    });

    // Achat Jour 4 : Pression Prolongée
    buyHoldBtn.addEventListener('click', function() {
        if (candyCounter >= holdCost && !holdUnlocked) {
            candyCounter -= holdCost;
            holdUnlocked = true;
            buyHoldBtn.innerText = 'Pression Prolongée : Activée ✔️';
            buyHoldBtn.disabled = true;
            maintienAffichage();
        }
    });
});