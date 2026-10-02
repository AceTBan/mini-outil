'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // 1. Sélection des éléments HTML
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        cpsSpan = document.querySelector('#cps'),
        buyReleaseBtn = document.querySelector('#buy-release'),
        buyEnterBtn = document.querySelector('#buy-enter'),
        buyLeaveBtn = document.querySelector('#buy-leave'),
        buyHoldBtn = document.querySelector('#buy-hold'),
        buyMoveBtn = document.querySelector('#buy-move'),
        buyAutoBtn = document.querySelector('#buy-auto'),
        buyWheelBtn = document.querySelector('#buy-wheel'),
        buyClickBtn = document.querySelector('#buy-click'),
        buyMarmiteBtn = document.querySelector('#buy-marmite');

    // 2. Variables d'état du jeu
    let candyCounter = parseInt(localStorage.getItem('candyScore')) || 0,
        derniersBonbons = candyCounter, // Sauvegarde le score d'il y a 1 seconde
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
        autoLvl = 0,
        moveCost = 400,
        autoCost = 800,
        clickLvl = 1,
        clickCost = 25,
        marmiteLvl = 0,
        marmiteCost = 1500;

    // 3. Fonction pour ajouter des bonbons + animation
    function ajouterBonbons(quantite) {
        if (quantite <= 0) return;
        candyCounter += quantite;
        // Le gain est multiplié par 5 si le boost est actif
        let gainTotal = quantite * cpsMultiplier;
        candyCounter += gainTotal;
        maintienAffichage();

        // Animation textuelle (+5 🍬 au lieu de +1 🍬)
        let pop = document.createElement('span');
        pop.innerText = ' +' + quantite + ' 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        if (cpsMultiplier > 1) pop.style.color = "gold"; // Visuel doré pendant le boost

        if (event && event.clientX) {
            pop.style.left = event.clientX + 'px';
            pop.style.top = event.clientY + 'px';
        } else if (starter) {
            let rect = starter.getBoundingClientRect();
            pop.style.left = (rect.left + rect.width / 2) + 'px';
            pop.style.top = (rect.top + rect.height / 2) + 'px';
        }

        document.body.appendChild(pop);
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
        // Auto
        buyAutoBtn.disabled = candyCounter < autoCost;
        if (document.getElementById('lvl-auto')) {
            document.getElementById('lvl-auto').innerText = autoLvl;
            document.getElementById('cost-auto').innerText = autoCost;
        }

        buyClickBtn.disabled = candyCounter < clickCost;
        if (document.getElementById('lvl-click')) {
            document.getElementById('lvl-click').innerText = clickLvl;
            document.getElementById('cost-click').innerText = clickCost;
        }

        localStorage.setItem('candyScore', candyCounter);

        // Marmite
        if (buyMarmiteBtn) buyMarmiteBtn.disabled = candyCounter < marmiteCost;
        if (document.getElementById('lvl-marmite')) {
            document.getElementById('lvl-marmite').innerText = marmiteLvl;
            document.getElementById('cost-marmite').innerText = marmiteCost;
        }
        
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

    // Action Molette 
    starter.addEventListener('wheel', function(e) {
        if (wheelLvl > 0) {
            e.preventDefault();
            ajouterBonbons(wheelLvl);
        }
    });

    starter.addEventListener('mousedown', function() {

        if (holdLvl > 0 && !holdInterval) {
            holdInterval = setInterval(function() {
                ajouterBonbons(holdLvl);
            }, 150);
        }
    });

    // Production automatique (Auto + Marmite)
    setInterval(function() {
        let valeurDeBase = 5; // <-- mettre le nombre de bonbons par niveau
        let gainPassif = (autoLvl + marmiteLvl) * valeurDeBase;
        if (gainPassif > 0) {
            ajouterBonbons(gainPassif);
        }
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
        if (candyCounter >= autoCost) {
            candyCounter -= autoCost;
            autoLvl++;
            autoCost = Math.floor(autoCost * 1.5);
            maintienAffichage();
        }
    });

    buyClickBtn.addEventListener('click', function() {
        if (candyCounter >= clickCost) {
            candyCounter -= clickCost;
            clickLvl++;
            clickCost = Math.floor(clickCost * 1.5);
            maintienAffichage();
        }
    });

    // Achat : Marmite à Bonbons
    if (buyMarmiteBtn) {
        buyMarmiteBtn.addEventListener('click', function() {
            if (candyCounter >= marmiteCost) {
                candyCounter -= marmiteCost;
                marmiteLvl++;
                marmiteCost = Math.floor(marmiteCost * 2);
                maintienAffichage();
            }
        });
    }

    // Calcul du nombre de bonbons par seconde (CPS)
    setInterval(function() {
        let bonbonsGagnes = candyCounter - derniersBonbons;
        cpsSpan.innerText = bonbonsGagnes;
        derniersBonbons = candyCounter; // Remet à jour pour la seconde suivante
    }, 1000);
    
                                        // --- SYSTÈME DU BONBON DORÉ (CORRIGÉ) ---

let goldenCandy = document.querySelector('#golden-candy'),
    cpsMultiplier = 1; // Multiplicateur (1 par défaut, 5 pendant le boost)

// 1. Apparition du Bonbon Doré
function apparaitreBonbonDore() {
    if (!goldenCandy) return;

    let x = Math.random() * (window.innerWidth - 120);
    let y = Math.random() * (window.innerHeight - 120);

    goldenCandy.style.left = Math.max(20, x) + 'px';
    goldenCandy.style.top = Math.max(20, y) + 'px';
    goldenCandy.classList.remove('hidden');

    // Disparaît au bout de 6 secondes si non cliqué
    setTimeout(() => {
        goldenCandy.classList.add('hidden');
    }, 6000);
}

// 2. Clic sur le Bonbon Doré
if (goldenCandy) {
    goldenCandy.addEventListener('click', function() {
        goldenCandy.classList.add('hidden');

        // Activation du Boost x5
        cpsMultiplier = 5;
        
        // Effet visuel immédiat sur le bouton principal
        starter.style.boxShadow = "0 0 25px gold";
        starter.style.transform = "scale(1.05)";

        // Désactivation du boost après 10 secondes
        setTimeout(() => {
            cpsMultiplier = 1;
            starter.style.boxShadow = "none";
            starter.style.transform = "scale(1)";
        }, 10000);
    });
}

// 3. Boucle d'apparition aléatoire (toutes les 45s à 90s)
function programmerBonbonDore() {
    let tempsAleatoire = Math.random() * (90000 - 45000) + 45000;
    setTimeout(() => {
        apparaitreBonbonDore();
        programmerBonbonDore();
    }, tempsAleatoire);
}
programmerBonbonDore();

});