const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height; 
const UNIT = 10;

let foodX;
let foodY;
let xVel = UNIT;
let yVel = 0;
let score = 0;
let active = true;
let started = false;
let paused = false;

let snake = [
    {x: UNIT * 3, y: 0},
    {x: UNIT * 2, y: 0},
    {x: UNIT, y: 0},
    {x: 0, y: 0}
];                                                            

window.addEventListener('keydown', keyPress);
document.getElementById('upBtn').addEventListener('click', () => changeDirection(0, -1)); 
document.getElementById('rightBtn').addEventListener('click', () => changeDirection(-1, 0));
document.getElementById('downBtn').addEventListener('click', () => changeDirection(0, 1)); 
document.getElementById('leftBtn').addEventListener('click', () =>changeDirection(1, 0)); 

startGame();

function startGame() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    nextTick();
}

function clearBoard() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
    snake.unshift(head);
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function nextTick() {
    if (active && !paused) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else if (!active) {
        clearBoard();
        context.font = "bold 30px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
    }
}

function keyPress(event) {
    if (!started) {
        started = true;
        nextTick();
    }
    if (event.keyCode === 32) {
        paused = !paused;
        if (!paused) nextTick();
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (true) {
        case (event.keyCode === LEFT && xVel !== UNIT):
            changeDirection(-1, 0);
            break;
        case (event.keyCode === RIGHT && xVel !== -UNIT):
            changeDirection(1, 0);
            break;
        case (event.keyCode === UP && yVel !== UNIT):
            changeDirection(0, -1);
            break;
        case (event.keyCode === DOWN && yVel !== -UNIT):
            changeDirection(0, 1);
            break;
    }
}

function checkGameOver() {
    if (snake[0].x < 0 || snake[0].x >= WIDTH || snake[0].y < 0 || snake[0].y >= HEIGHT) {
        active = false;
    }
}

function changeDirection(x, y) {
    if (xVel !== -x * UNIT && yVel !== -y * UNIT) {
        xVel = x * UNIT;
        yVel = y * UNIT;
    }
}
