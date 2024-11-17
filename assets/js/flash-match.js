let flashTimer;
let flashScore = 0;
let flashTimeLeft = 30;
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍍', '🥝', '🍑'];
const flashGrid = document.getElementById('grid');
const flashTimerDisplay = document.getElementById('timer');
const flashScoreDisplay = document.getElementById('score');

function startFlashMatch() {
    flashScore = 0;
    flashTimeLeft = 30;
    flashScoreDisplay.textContent = flashScore;
    flashTimerDisplay.textContent = flashTimeLeft + 's';
    generateFlashGrid();
    flashTimer = setInterval(updateFlashTimer, 1000);
}

function updateFlashTimer() {
    flashTimeLeft--;
    flashTimerDisplay.textContent = flashTimeLeft + 's';
    if (flashTimeLeft <= 0) {
        clearInterval(flashTimer);
        showNotification(`Time's up! Final score: ${flashScore}`);
    }
}

function generateFlashGrid() {
    flashGrid.innerHTML = '';
    const gridSymbols = generateSymbols();
    gridSymbols.forEach(symbol => {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.textContent = symbol;
        cell.addEventListener('click', () => checkFlashMatch(symbol, cell));
        flashGrid.appendChild(cell);
    });
}

function generateSymbols() {
    let gridSymbols = [];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 0; i < 3; i++) {
        gridSymbols.push(randomSymbol);
    }
    while (gridSymbols.length < 16) {
        const random = symbols[Math.floor(Math.random() * symbols.length)];
        gridSymbols.push(random);
    }
    return shuffleArray(gridSymbols);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

let matchedSymbols = [];
function checkFlashMatch(symbol, cell) {
    if (matchedSymbols.includes(symbol)) return;
    matchedSymbols.push(symbol);
    cell.style.backgroundColor = '#ffd700'; 
    if (matchedSymbols.length === 3) {
        flashScore++;
        flashScoreDisplay.textContent = flashScore;
        matchedSymbols = [];
        generateFlashGrid();
    }
}
