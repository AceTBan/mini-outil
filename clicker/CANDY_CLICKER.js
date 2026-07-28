'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        candyCounter = 0;

    starter.addEventListener('click', function() {
        candyCounter++;
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy !';
    let pop = document.createElement('span');
pop.innerText = ' +1 🍬';
pop.style.animation = 'fadeOut 0.8s forwards';
output.appendChild(pop);
setTimeout(() => pop.remove(), 800);

 if (candyCounter >= multiplierCost) {
    candyCounter -= multiplierCost;
    clickPower++;
    multiplierCost = Math.floor(multiplierCost * 1.5); // Augmente le prix
 }

        });
});
