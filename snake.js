const dotSize = 20;
const gameSize = 15;
let direction = [0, 1];
let snake = [[2, 2], [2, 1]];
let apple = null;
let score = 0;
let gameSpeed = 200; // Start speed

function updateGame() {
    const head = [snake[0][0] + direction[0], snake[0][1] + direction[1]];
    if (head[0] < 0 || head[0] >= gameSize || head[1] < 0 || head[1] >= gameSize) {
        return gameOver();
    }
    for (let dot of snake) {
        if (dot[0] === head[0] && dot[1] === head[1]) {
            return gameOver();
        }
    }
    snake.unshift(head);
    if (apple && apple[0] === head[0] && apple[1] === head[1]) {
        apple = null;
        score += 10;
        gameSpeed = Math.max(50, gameSpeed - 10); // Decrease gameSpeed by 10ms to a minimum of 50ms
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, gameSpeed);
    } else {
        snake.pop();
    }
    if (!apple) {
        let emptySpaces = [];
        for (let i = 0; i < gameSize; i++) {
            for (let j = 0; j < gameSize; j++) {
                if (!snake.some(dot => dot[0] === i && dot[1] === j)) {
                    emptySpaces.push([i, j]);
                }
            }
        }
        apple = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    }
    drawGame();
    document.getElementById('score').innerText = `Score: ${score}`; // Update the score display
    drawLeaderboard();
}

function drawGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let dot of snake) {
        const dotElement = document.createElement('div');
        dotElement.style.left = `${dot[1] * dotSize}px`;
        dotElement.style.top = `${dot[0] * dotSize}px`;
        dotElement.classList.add('dot');
        gameBoard.appendChild(dotElement);
    }
    if (apple) {
        const appleElement = document.createElement('div');
        appleElement.style.left = `${apple[1] * dotSize}px`;
        appleElement.style.top = `${apple[0] * dotSize}px`;
        appleElement.classList.add('dot', 'apple');
        gameBoard.appendChild(appleElement);
    }
}

function updateLeaderboard(newScore) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(newScore);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 10); // keep only top 10 scores
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function drawLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = 'Leaderboard: <br>' + leaderboard.join('<br>');
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game over! Your final score is ' + score);
    updateLeaderboard(score);
}

window.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction[0] !== 1) direction = [-1, 0];
    else if (event.key === 'ArrowDown' && direction[0] !== -1) direction = [1, 0];
    else if (event.key === 'ArrowLeft' && direction[1] !== 1) direction = [0, -1];
    else if (event.key === 'ArrowRight' && direction[1] !== -1) direction = [0, 1];
});

let gameInterval = setInterval(updateGame, gameSpeed);