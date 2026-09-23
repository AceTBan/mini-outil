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
        
        // Mise à jour de la boutique 
        buyReleaseBtn.disabled = candyCounter < releaseCost;
        if (document.getElementById('lvl-release')) {
            document.getElementById('lvl-release').innerText = releaseLvl;
            document.getElementById('cost-release').innerText = releaseCost;
        }

        buyEnterBtn.disabled = candyCounter < enterCost;
        if (document.getElementById('lvl-enter')) {
            document.getElementById('lvl-enter').innerText = enterLvl;
            document.getElementById('cost-enter').innerText = enterCost;
        }

        buyLeaveBtn.disabled = candyCounter < leaveCost;
        if (document.getElementById('lvl-leave')) {
            document.getElementById('lvl-leave').innerText = leaveLvl;
            document.getElementById('cost-leave').innerText = leaveCost;
        }

        buyHoldBtn.disabled = candyCounter < holdCost;
        if (document.getElementById('lvl-hold')) {
            document.getElementById('lvl-hold').innerText = holdLvl;
            document.getElementById('cost-hold').innerText = holdCost;
        }

                // Anciens boutons 
        
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

    // Clic Appui + Gestion de la Pression Prolongée
    starter.addEventListener('mousedown', function() {
        ajouterBonbons(1); // Le clic manuel de base donne toujours 1 bonbon

        // Si Pression Prolongée est au moins Niv. 1
        if (holdLvl > 0 && !holdInterval) {
            holdInterval = setInterval(function() {
                ajouterBonbons(holdLvl);
            }, 150);
        }
    });

    // Relâchement + Stop maintien 
    starter.addEventListener('mouseup', function() {
        ajouterBonbons(releaseLvl); // Ajoute le montant du niveau de relâchement
        stopperMaintien();
    });

    // Entrée du curseur
    starter.addEventListener('mouseenter', function() {
        ajouterBonbons(enterLvl);
    });

    // Sortie du curseur + Stop maintien
    starter.addEventListener('mouseleave', function() {
        ajouterBonbons(leaveLvl);
        stopperMaintien();
    });

    // Survol Turbo (Pixel par pixel)
    starter.addEventListener('mousemove', function() {
        if (moveUnlocked) ajouterBonbons(1);
    });

    // Auto-Clicker Passif
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
        if (wheelUnlocked) ajouterBonbons(1);
    });

    // Achat boutique Molette
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