'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        candyCounter = 0;

    starter.addEventListener('click', function() {
        candyCounter++;
        output.innerHTML = 'Vous avez ' + candyCounter + ' candy ! ';

        // Animation du +1
        let pop = document.createElement('span');
        pop.innerText = ' +1 🍬';
        pop.className = 'pop-animation';
        output.appendChild(pop);
        
        setTimeout(() => pop.remove(), 800);
    });
});