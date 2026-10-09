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
        buyMarmiteBtn = document.querySelector('#buy-marmite'),
        buyUsineBtn = document.querySelector('#buy-usine'),
        buyLaboBtn = document.querySelector('#buy-labo'),
        buyMineBtn = document.querySelector('#buy-mine'),
        buyFuseeBtn = document.querySelector('#buy-fusee');

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
        marmiteCost = 1500,
        usineLvl = 0,
        usineCost = 10000,
        laboLvl = 0,
        laboCost = 75000,
        mineLvl = 0,
        mineCost = 500000,
        fuseeLvl = 0,
        fuseeCost = 5000000;

    // 3. Fonction pour ajouter des bonbons + animation
    function ajouterBonbons(quantite) {
        if (quantite <= 0) return;
        
        // Calcul du gain réel avec le multiplicateur
        let gainTotal = quantite * cpsMultiplier;
        candyCounter += gainTotal;
        maintienAffichage();

        // Animation textuelle avec affichage formraté avec des points (.)
        let pop = document.createElement('span');
        pop.innerText = ' +' + gainTotal.toLocaleString('de-DE') + ' 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        if (cpsMultiplier > 1) pop.style.color = "gold"; // Visuel doré pendant le boost

        if (typeof event !== 'undefined' && event && event.clientX) {
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
        output.innerHTML = 'Vous avez ' + candyCounter.toLocaleString('de-DE') + ' candy ! ';
        
        // Release 
        if (buyReleaseBtn) buyReleaseBtn.disabled = candyCounter < releaseCost;
        if (document.getElementById('lvl-release')) {
            document.getElementById('lvl-release').innerText = releaseLvl;
            document.getElementById('cost-release').innerText = releaseCost.toLocaleString('de-DE');
        }

        // Enter 
        if (buyEnterBtn) buyEnterBtn.disabled = candyCounter < enterCost;
        if (document.getElementById('lvl-enter')) {
            document.getElementById('lvl-enter').innerText = enterLvl;
            document.getElementById('cost-enter').innerText = enterCost.toLocaleString('de-DE');
        }

        // Leave 
        if (buyLeaveBtn) buyLeaveBtn.disabled = candyCounter < leaveCost;
        if (document.getElementById('lvl-leave')) {
            document.getElementById('lvl-leave').innerText = leaveLvl;
            document.getElementById('cost-leave').innerText = leaveCost.toLocaleString('de-DE');
        }

        // Hold 
        if (buyHoldBtn) buyHoldBtn.disabled = candyCounter < holdCost;
        if (document.getElementById('lvl-hold')) {
            document.getElementById('lvl-hold').innerText = holdLvl;
            document.getElementById('cost-hold').innerText = holdCost.toLocaleString('de-DE');
        }

        // Wheel 
        if (buyWheelBtn) buyWheelBtn.disabled = candyCounter < wheelCost;
        if (document.getElementById('lvl-wheel')) {
            document.getElementById('lvl-wheel').innerText = wheelLvl;
            document.getElementById('cost-wheel').innerText = wheelCost.toLocaleString('de-DE');
        }

        // Move
        if (buyMoveBtn) buyMoveBtn.disabled = candyCounter < moveCost;
        if (document.getElementById('lvl-move')) {
            document.getElementById('lvl-move').innerText = moveLvl;
            document.getElementById('cost-move').innerText = moveCost.toLocaleString('de-DE');
        }

        // Auto
        if (buyAutoBtn) buyAutoBtn.disabled = candyCounter < autoCost;
        if (document.getElementById('lvl-auto')) {
            document.getElementById('lvl-auto').innerText = autoLvl;
            document.getElementById('cost-auto').innerText = autoCost.toLocaleString('de-DE');
        }

        // Click
        if (buyClickBtn) buyClickBtn.disabled = candyCounter < clickCost;
        if (document.getElementById('lvl-click')) {
            document.getElementById('lvl-click').innerText = clickLvl;
            document.getElementById('cost-click').innerText = clickCost.toLocaleString('de-DE');
        }

        localStorage.setItem('candyScore', candyCounter);

        // Marmite
        if (buyMarmiteBtn) buyMarmiteBtn.disabled = candyCounter < marmiteCost;
        if (document.getElementById('lvl-marmite')) {
            document.getElementById('lvl-marmite').innerText = marmiteLvl;
            document.getElementById('cost-marmite').innerText = marmiteCost.toLocaleString('de-DE');
        }
        
        // Usine
        if (buyUsineBtn) buyUsineBtn.disabled = candyCounter < usineCost;
        if (document.getElementById('lvl-usine')) {
            document.getElementById('lvl-usine').innerText = usineLvl;
            document.getElementById('cost-usine').innerText = usineCost.toLocaleString('de-DE');
        }

        // Laboratoire
        if (buyLaboBtn) buyLaboBtn.disabled = candyCounter < laboCost;
        if (document.getElementById('lvl-labo')) {
            document.getElementById('lvl-labo').innerText = laboLvl;
            document.getElementById('cost-labo').innerText = laboCost.toLocaleString('de-DE');
        }

        // Mine
        if (buyMineBtn) buyMineBtn.disabled = candyCounter < mineCost;
        if (document.getElementById('lvl-mine')) {
            document.getElementById('lvl-mine').innerText = mineLvl;
            document.getElementById('cost-mine').innerText = mineCost.toLocaleString('de-DE');
        }

        // Fusée
        if (buyFuseeBtn) buyFuseeBtn.disabled = candyCounter < fuseeCost;
        if (document.getElementById('lvl-fusee')) {
            document.getElementById('lvl-fusee').innerText = fuseeLvl;
            document.getElementById('cost-fusee').innerText = fuseeCost.toLocaleString('de-DE');
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
        ajouterBonbons(clickLvl);

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

    // --- UNIQUE BOUCLE DE PRODUCTION AUTOMATIQUE ---
    setInterval(function() {
        let gainPassif = autoLvl 
                       + (marmiteLvl * 5) 
                       + (usineLvl * 30) 
                       + (laboLvl * 200) 
                       + (mineLvl * 1500) 
                       + (fuseeLvl * 12000);

        if (gainPassif > 0) {
            ajouterBonbons(gainPassif);
        }
    }, 1000);

    // --- ACHATS EN BOUTIQUE ---

    if (buyReleaseBtn) {
        buyReleaseBtn.addEventListener('click', function() {
            if (candyCounter >= releaseCost) {
                candyCounter -= releaseCost;
                releaseLvl++;
                releaseCost = Math.floor(releaseCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyEnterBtn) {
        buyEnterBtn.addEventListener('click', function() {
            if (candyCounter >= enterCost) {
                candyCounter -= enterCost;
                enterLvl++;
                enterCost = Math.floor(enterCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyLeaveBtn) {
        buyLeaveBtn.addEventListener('click', function() {
            if (candyCounter >= leaveCost) {
                candyCounter -= leaveCost;
                leaveLvl++;
                leaveCost = Math.floor(leaveCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyHoldBtn) {
        buyHoldBtn.addEventListener('click', function() {
            if (candyCounter >= holdCost) {
                candyCounter -= holdCost;
                holdLvl++;
                holdCost = Math.floor(holdCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyWheelBtn) {
        buyWheelBtn.addEventListener('click', function() {
            if (candyCounter >= wheelCost) {
                candyCounter -= wheelCost;
                wheelLvl++;
                wheelCost = Math.floor(wheelCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyMoveBtn) {
        buyMoveBtn.addEventListener('click', function() {
            if (candyCounter >= moveCost) {
                candyCounter -= moveCost;
                moveLvl++;
                moveCost = Math.floor(moveCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyAutoBtn) {
        buyAutoBtn.addEventListener('click', function() {
            if (candyCounter >= autoCost) {
                candyCounter -= autoCost;
                autoLvl++;
                autoCost = Math.floor(autoCost * 1.5);
                maintienAffichage();
            }
        });
    }

    if (buyClickBtn) {
        buyClickBtn.addEventListener('click', function() {
            if (candyCounter >= clickCost) {
                candyCounter -= clickCost;
                clickLvl++;
                clickCost = Math.floor(clickCost * 1.5);
                maintienAffichage();
            }
        });
    }

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

    if (buyUsineBtn) {
        buyUsineBtn.addEventListener('click', function() {
            if (candyCounter >= usineCost) {
                candyCounter -= usineCost;
                usineLvl++;
                usineCost = Math.floor(usineCost * 2);
                maintienAffichage();
            }
        });
    }

    if (buyLaboBtn) {
        buyLaboBtn.addEventListener('click', function() {
            if (candyCounter >= laboCost) {
                candyCounter -= laboCost;
                laboLvl++;
                laboCost = Math.floor(laboCost * 2);
                maintienAffichage();
            }
        });
    }

    if (buyMineBtn) {
        buyMineBtn.addEventListener('click', function() {
            if (candyCounter >= mineCost) {
                candyCounter -= mineCost;
                mineLvl++;
                mineCost = Math.floor(mineCost * 2);
                maintienAffichage();
            }
        });
    }

    if (buyFuseeBtn) {
        buyFuseeBtn.addEventListener('click', function() {
            if (candyCounter >= fuseeCost) {
                candyCounter -= fuseeCost;
                fuseeLvl++;
                fuseeCost = Math.floor(fuseeCost * 2);
                maintienAffichage();
            }
        });
    }

    // Calcul du nombre de bonbons par seconde (CPS)
    setInterval(function() {
        let bonbonsGagnes = candyCounter - derniersBonbons;
        if (cpsSpan) cpsSpan.innerText = bonbonsGagnes.toLocaleString('de-DE');
        derniersBonbons = candyCounter; // Remet à jour pour la seconde suivante
    }, 1000);

    // --- SYSTÈME DU BONBON DORÉ ---
    let goldenCandy = document.querySelector('#golden-candy'),
        cpsMultiplier = 1; // Multiplicateur (1 par défaut, 5 pendant le boost)

    function apparaitreBonbonDore() {
        if (!goldenCandy) return;

        let x = Math.random() * (window.innerWidth - 120);
        let y = Math.random() * (window.innerHeight - 120);

        goldenCandy.style.left = Math.max(20, x) + 'px';
        goldenCandy.style.top = Math.max(20, y) + 'px';
        goldenCandy.classList.remove('hidden');

        setTimeout(() => {
            goldenCandy.classList.add('hidden');
        }, 6000);
    }

    if (goldenCandy) {
        goldenCandy.addEventListener('click', function() {
            goldenCandy.classList.add('hidden');

            cpsMultiplier = 5;
            
            if (starter) {
                starter.style.boxShadow = "0 0 25px gold";
                starter.style.transform = "scale(1.05)";
            }

            setTimeout(() => {
                cpsMultiplier = 1;
                if (starter) {
                    starter.style.boxShadow = "none";
                    starter.style.transform = "scale(1)";
                }
            }, 10000);
        });
    }

    function programmerBonbonDore() {
        let tempsAleatoire = Math.random() * (90000 - 45000) + 45000;
        setTimeout(() => {
            apparaitreBonbonDore();
            programmerBonbonDore();
        }, tempsAleatoire);
    }
    programmerBonbonDore();

    // Initialisation du premier affichage pour verrouiller les boutons non achetables au départ
    maintienAffichage();
});