// Посилання на необхідні елементи
const gameBoard = document.querySelector('.game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const newGameBtn = document.getElementById('newGameBtn');
const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const difficultySelect = document.getElementById('difficulty');
const users = document.getElementById('users');


const images = [
    'images/gon.jpg',
    'images/killua.jpg',
    'images/feitan.jpg',
    'images/kurapika.jpg',
    'images/illumi.jpg',
    'images/hisoka.jpg',
    'images/chrollo.jpg',
    'images/meruem.jpg',
    'images/angry.jpg',
    'images/leorio.jpg',
    'images/shizuku.jpg',
    'images/silva.jpg',
    'images/hikka.jpg',
    'images/teraiden.jpg',
    'images/machi.jpg',
    'images/alluka.jpg',
    'images/ded.jpg',
    'images/butterfly.jpg'
];

let playerScore = 0;
let timerInterval = null;
let flippedCards = [];
let matchedPairs = 0;

function userCount() {
    let user = users.value;
    if(user === two){
        const userField = document.createElement('div');
        userField.classList.add('user');
        
    }
}; 

startBtn.addEventListener('click', () => {
    // Очистка ігрового поля
    gameBoard.innerHTML = '';
    if (timerInterval) clearInterval(timerInterval);
    playerScore = 0;
    flippedCards = [];
    matchedPairs = 0;

    // Оновлення рахунку
    updateScore();

    // Визначення параметрів поля
    const rows = parseInt(rowsInput.value);
    const columns = parseInt(columnsInput.value);
    const totalCards = rows * columns;

    if (totalCards % 2 !== 0) {
        alert('Кількість карток має бути парною!');
        return;
    }

    // Генерація масиву карток
    const cardImages = [...images, ...images].slice(0, totalCards / 2);
    const allCards = [...cardImages, ...cardImages];
    shuffleArray(allCards);

    // Створення карток
    allCards.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    // Встановлення розмірів поля
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    // Запуск таймера
    startTimer();
}) 

function startTimer() {
    const difficulty = difficultySelect.value;
    let timeLeft = 0;

    if (difficulty === 'easy') timeLeft = 180;
    else if (difficulty === 'normal') timeLeft = 120;
    else if (difficulty === 'hard') timeLeft = 60;

    timerDisplay.textContent = `Час: ${timeLeft}`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Час: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Час вийшов! Спробуйте ще раз.');
            gameBoard.innerHTML = '';
        }
    }, 1000);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matchedPairs++;
        playerScore++;
        updateScore();
        flippedCards = [];

        if (matchedPairs === images.length) {
            clearInterval(timerInterval);
            alert(`Ви виграли! Ваш рахунок: ${playerScore}`);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateScore() {
    scoreDisplay.textContent = `Рахунок: ${playerScore}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


newGameBtn.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    startGame();
});
