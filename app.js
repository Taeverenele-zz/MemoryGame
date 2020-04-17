let animalArray = ['./images/bear.png', './images/deer.png',  './images/camel.png'];


// , './images/elephant.png', './images/croc.png', './images/fox.png', './images/hippo.png',  './images/kangaroo.png', './images/lion.png', './images/monkey.png',  './images/moose.png', './images/owl.png', './images/tiger.png',  './images/turtle.png', './images/wolf.png', './images/zebra.png'


// Duplicate array
let gameArray = animalArray.concat(animalArray);
let container = document.getElementById('container');

let memoryValues = [];
let memoryTileIds = [];
let tilesFlippedIds = [];

// Shuffle array
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
};

// Create div elements and put them inside 'container' div
function createDivs() {
    let output = '';
    for (let i = 0; i < gameArray.length; i++) {
        output += '<div id="tile_' + i +'" onclick="flipTile(this, \'' + gameArray[i] + '\')"></div>';
    }
    container.innerHTML = output;
}

// Initialise a game with 
function initGame() {
    //zero cards in tilesFlipped array
    tilesFlippedIds = [];
    // re shuffle all items in gameArray 
    shuffleArray(gameArray);
    // and put them in the container
    createDivs();
}

// Reset guesses
function resetGuesses() {
    memoryValues = [];
    memoryTileIds = [];
};


// create a flipTile function (tile = <div> element and val = gameArray item from the array)
function flipTile(tile, val) {
    // If tilesFlippedIds array already has a tile.id you have just clicked on, ignore this function
    if(tilesFlippedIds.includes(tile.id)) return;
    // otherwise, memoryValues array can never have more that two items in it
    if (memoryValues.length < 2) {
        // if there is less than two item in memoryValues array, give the tile the assigned background from the gameArray
        tile.style.background = 'url('+ val + ') no-repeat center';
        // and store the id in the tilesFlippedIds array
        tilesFlippedIds.push(tile.id);
        // 
        if (memoryValues.length === 0) {
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
        } else if (memoryValues.length === 1) {
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            if (memoryValues[0] === memoryValues[1]) {
                resetGuesses();
                if (tilesFlippedIds.length === gameArray.length) {
                        createButton();
                }
            } else {
                function flipBack() {
                    let tile_1 = document.getElementById(memoryTileIds[0]);
                    let tile_2 = document.getElementById(memoryTileIds[1]);
                    tile_1.style.background = 'url(./images/Question.jpg) no-repeat center';
                    tile_2.style.background = 'url(./images/Question.jpg) no-repeat center';
                    tilesFlippedIds = tilesFlippedIds.filter(tile => tile !== tile_1.id && tile !== tile_2.id);
                    resetGuesses();
                }
                setTimeout(flipBack, 700);
            }
        }
    }

}

function createButton() {
    setTimeout(() => {
        container.innerHTML = '<h2>Well done!</h2><br>';
        let playAgainButton = document.createElement('button');
        container.appendChild(playAgainButton);
        playAgainButton.innerHTML = 'Play again?';
        playAgainButton.addEventListener('click', initGame);
    }, 700)
};

initGame();

