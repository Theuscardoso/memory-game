const cardsArray = [
    { name: 'img1', img: 'fotos/alexander.jpg'},
    { name: 'img2', img: 'fotos/blaidd.jpg' },
    { name: 'img3', img: 'fotos/godfrey.jpg' },
    { name: 'img4', img: 'fotos/malenia.jpg' },
    { name: 'img5', img: 'fotos/radhan.jpg' },
    { name: 'img6', img: 'fotos/ranni.jpg' },
    { name: 'img1', img: 'fotos/alexander.jpg'},
    { name: 'img2', img: 'fotos/blaidd.jpg' },
    { name: 'img3', img: 'fotos/godfrey.jpg' },
    { name: 'img4', img: 'fotos/malenia.jpg' },
    { name: 'img5', img: 'fotos/radhan.jpg' },
    { name: 'img6', img: 'fotos/ranni.jpg' }
];


let grid = document.getElementById('grid');
let timerElement = document.getElementById('timer');
let resetButton = document.getElementById('reset-button');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let seconds = 0;
let minutes = 0;
let timer;
let hasGameStarted = false;
const totalPairs = cardsArray.length / 2;

function startGame() {
    shuffleCards();
    generateGrid();
    resetTimer();
}

function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}

function generateGrid() {
    grid.innerHTML = '';
    cardsArray.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        let img = document.createElement('img');
        img.src = item.img;

        card.appendChild(img);
        grid.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    if (!hasGameStarted) {
        startTimer();
        hasGameStarted = true;
    }

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matches++;
    if (matches === totalPairs) {
        clearInterval(timer);
     
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        timerElement.textContent = `Tempo: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    hasGameStarted = false;
    seconds = 0;
    minutes = 0;
    timerElement.textContent = `Tempo: 00:00`;
}

resetButton.addEventListener('click', startGame);

startGame();