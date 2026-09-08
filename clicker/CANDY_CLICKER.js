'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        buyReleaseBtn = document.querySelector('#buy-release'),
        candyCounter = 0,
        releaseUnlocked = false,
        releaseCost = 100;

    function ajouterBonbon() {
        candyCounter++;
        maintienAffichage();

        let pop = document.createElement('span');
        pop.innerText = ' +1 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        setTimeout(() => pop.remove(), 800);
    }

    function maintienAffichage() {
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy ! ';
        if (!releaseUnlocked) {
            buyReleaseBtn.disabled = candyCounter < releaseCost;
        }
    }

    // Clic Appui
    starter.addEventListener('mousedown', ajouterBonbon);

    // Clic Relâchement
    starter.addEventListener('mouseup', function() {
        if (releaseUnlocked) ajouterBonbon();
    });

    // Achat Upgrade 1
    buyReleaseBtn.addEventListener('click', function() {
        if (candyCounter >= releaseCost && !releaseUnlocked) {
            candyCounter -= releaseCost;
            releaseUnlocked = true;
            buyReleaseBtn.innerText = 'Point au relâchement : Activé ✔️';
            buyReleaseBtn.disabled = true;
            maintienAffichage();
        }
    });
});