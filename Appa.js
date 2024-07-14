document.addEventListener('DOMContentLoaded', () => {
    // Character Array
const characters = ['images1', 'images2', 'images3', 'images4', 'images5' , 'images6', 'images7', 'images8'];

    // DOM Elements
    const gameBoard = document.getElementById('gameBoard');
    const timerElement = document.getElementById('timer');
    const gameOverModal = document.getElementById('gameOverModal');
    const winnerModal = document.getElementById('winnerModal');
    const closeGameOverModal = document.getElementById('closeGameOverModal');
    const closeWinnerModal = document.getElementById('closeWinnerModal');
    const restartGameOver = document.getElementById('restartGameOver');
    const restartWinner = document.getElementById('restartWinner');
    const closeGameOver = document.getElementById('closeGameOver');
    const closeWinner = document.getElementById('closeWinner');

    // Check if elements exist
    if (!gameBoard || !timerElement || !gameOverModal || !winnerModal || !closeGameOverModal || !closeWinnerModal || !restartGameOver || !restartWinner || !closeGameOver || !closeWinner) {
        console.error('One or more DOM elements are missing');
        return;
    }

    // Game Variables
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let timer;
    let timeRemaining = 60;

    // Function to Create the Game Board
    function createBoard() {
        const cardArray = [...characters, ...characters];
        shuffleArray(cardArray);

        cardArray.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.character = character;

            const frontFace = document.createElement('img');
            frontFace.src = `images/${character}.jpg`; // Ruta actualizada para las imágenes
            frontFace.alt = character;
            card.appendChild(frontFace);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });

        startTimer();
    }

    // Function to Shuffle an Array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to Start the Timer
    function startTimer() {
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                showGameOverModal();
            }
        }, 1000);
    }

    // Function to Flip a Card
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    // Function to Check for a Match
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.character === card2.dataset.character) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === characters.length) {
                clearInterval(timer);
                showWinnerModal();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Function to Show the Game Over Modal
    function showGameOverModal() {
        gameOverModal.style.display = 'flex';
    }

    // Function to Show the Winner Modal
    function showWinnerModal() {
        winnerModal.style.display = 'flex';
    }

    // Event Listeners
    closeGameOverModal.onclick = () => gameOverModal.style.display = 'none';
    closeWinnerModal.onclick = () => winnerModal.style.display = 'none';

    restartGameOver.onclick = () => window.location.reload();
    restartWinner.onclick = () => window.location.reload();

    closeGameOver.onclick = () => window.close();
    closeWinner.onclick = () => window.close();

    window.onclick = (event) => {
        if (event.target === gameOverModal) {
            gameOverModal.style.display = 'none';
        }
        if (event.target === winnerModal) {
            winnerModal.style.display = 'none';
        }
    };

    // Initialize the Game
    createBoard();
});
