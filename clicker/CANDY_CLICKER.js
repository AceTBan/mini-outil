'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        candyCounter = 0;

    function ajouterBonbon() {
        candyCounter++;
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy ! ';

        let pop = document.createElement('span');
        pop.innerText = ' +1 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        setTimeout(() => pop.remove(), 800);
    }

    // 1. Clic classique (Appui uniquement)
    starter.addEventListener('mousedown', ajouterBonbon);
});