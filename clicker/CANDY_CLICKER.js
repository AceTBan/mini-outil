'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let output = document.querySelector('#output'),
        starter = document.querySelector('#starter'),
        candyCounter = 0;

    starter.addEventListener('click', function() {
         candyCounter++;
         output.innerHTML = 'Vous avez ' + candyCounter + ' candy !';
    });
});