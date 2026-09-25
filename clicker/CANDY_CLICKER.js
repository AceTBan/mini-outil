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
        releaseLvl = 0, 
        enterLvl = 0,
        leaveLvl = 0,
        holdLvl = 0,
        wheelLvl = 0,
        releaseCost = 100,
        enterCost = 50,
        leaveCost = 50,
        holdCost = 200,
        wheelCost = 200,
        holdInterval = null,
        moveLvl = 0,
        autoUnlocked = false,
        moveCost = 400,
        autoCost = 800;

    // 3. Fonction pour ajouter des bonbons + animation
    function ajouterBonbons(quantite) {
        if (quantite <= 0) return;
        candyCounter += quantite;
        maintienAffichage();

        let pop = document.createElement('span');
        pop.innerText = ' +' + quantite + ' 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        setTimeout(() => pop.remove(), 800);
    }

    // 4. Mise à jour de l'affichage et de l'état des boutons
    function maintienAffichage() {
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy ! ';
        
        // Release 
        buyReleaseBtn.disabled = candyCounter < releaseCost;
        if (document.getElementById('lvl-release')) {
            document.getElementById('lvl-release').innerText = releaseLvl;
            document.getElementById('cost-release').innerText = releaseCost;
        }

        // Enter 
        buyEnterBtn.disabled = candyCounter < enterCost;
        if (document.getElementById('lvl-enter')) {
            document.getElementById('lvl-enter').innerText = enterLvl;
            document.getElementById('cost-enter').innerText = enterCost;
        }

        // Leave 
        buyLeaveBtn.disabled = candyCounter < leaveCost;
        if (document.getElementById('lvl-leave')) {
            document.getElementById('lvl-leave').innerText = leaveLvl;
            document.getElementById('cost-leave').innerText = leaveCost;
        }

        // Hold 
        buyHoldBtn.disabled = candyCounter < holdCost;
        if (document.getElementById('lvl-hold')) {
            document.getElementById('lvl-hold').innerText = holdLvl;
            document.getElementById('cost-hold').innerText = holdCost;
        }

        // Wheel 
        buyWheelBtn.disabled = candyCounter < wheelCost;
        if (document.getElementById('lvl-wheel')) {
            document.getElementById('lvl-wheel').innerText = wheelLvl;
            document.getElementById('cost-wheel').innerText = wheelCost;
        }
        // Move
        buyMoveBtn.disabled = candyCounter < moveCost;
        if (document.getElementById('lvl-move')) {
            document.getElementById('lvl-move').innerText = moveLvl;
            document.getElementById('cost-move').innerText = moveCost;
        }
        // Anciens boutons (Auto)
        if (!autoUnlocked) buyAutoBtn.disabled = candyCounter < autoCost;

        localStorage.setItem('candyScore', candyCounter);
    }

    // Stop le timer du clic maintenu
    function stopperMaintien() {
        if (holdInterval) {
            clearInterval(holdInterval);
            holdInterval = null;
        }
    }

    // --- ÉVÉNEMENTS DU BOUTON PRINCIPAL ---

    // Clic Appui + Pression Prolongée
    starter.addEventListener('mousedown', function() {
        ajouterBonbons(1);

        if (holdLvl > 0 && !holdInterval) {
            holdInterval = setInterval(function() {
                ajouterBonbons(holdLvl);
            }, 150);
        }
    });

    // Relâchement
    starter.addEventListener('mouseup', function() {
        ajouterBonbons(releaseLvl);
        stopperMaintien();
    });

    // Entrée du curseur
    starter.addEventListener('mouseenter', function() {
        ajouterBonbons(enterLvl);
    });

    // Sortie du curseur
    starter.addEventListener('mouseleave', function() {
        ajouterBonbons(leaveLvl);
        stopperMaintien();
    });

    // Survol Turbo
    starter.addEventListener('mousemove', function() {
        ajouterBonbons(moveLvl);
    });

    // Action Molette (J5)
    starter.addEventListener('wheel', function(e) {
        if (wheelLvl > 0) {
            e.preventDefault();
            ajouterBonbons(wheelLvl);
        }
    });

    // Auto-Clicker Passif (Corrigé)
    setInterval(function() {
        if (autoUnlocked) ajouterBonbons(1);
    }, 1000);


    // --- ACHATS EN BOUTIQUE ---

    // Achat : Relâchement
    buyReleaseBtn.addEventListener('click', function() {
        if (candyCounter >= releaseCost) {
            candyCounter -= releaseCost;
            releaseLvl++;
            releaseCost = Math.floor(releaseCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Entrée du bouton
    buyEnterBtn.addEventListener('click', function() {
        if (candyCounter >= enterCost) {
            candyCounter -= enterCost;
            enterLvl++;
            enterCost = Math.floor(enterCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Sortie du bouton
    buyLeaveBtn.addEventListener('click', function() {
        if (candyCounter >= leaveCost) {
            candyCounter -= leaveCost;
            leaveLvl++;
            leaveCost = Math.floor(leaveCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Pression Prolongée
    buyHoldBtn.addEventListener('click', function() {
        if (candyCounter >= holdCost) {
            candyCounter -= holdCost;
            holdLvl++;
            holdCost = Math.floor(holdCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Action Molette
    buyWheelBtn.addEventListener('click', function() {
        if (candyCounter >= wheelCost) {
            candyCounter -= wheelCost;
            wheelLvl++;
            wheelCost = Math.floor(wheelCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Survol Turbo
    buyMoveBtn.addEventListener('click', function() {
        if (candyCounter >= moveCost) {
            candyCounter -= moveCost;
            moveLvl++;
            moveCost = Math.floor(moveCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Auto-Clicker Passif
    buyAutoBtn.addEventListener('click', function() {
        if (candyCounter >= autoCost && !autoUnlocked) {
            candyCounter -= autoCost;
            autoUnlocked = true;
            buyAutoBtn.innerText = 'Auto-Clicker : Activé ✔️';
            buyAutoBtn.disabled = true;
            maintienAffichage();
        }
    });
});