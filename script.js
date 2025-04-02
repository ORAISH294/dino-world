const dino = document.getElementById('dino');
const game = document.getElementById('game');
const scoreElement = document.getElementById('score');
let dinoPosition = 0;
let isJumping = false;
let velocity = 0;
let gravity = 0.8;
let jumpHeight = 15;
let isGameOver = false;
let score = 0;
let obstacle = document.getElementById('obstacle');

// Event listener for spacebar to trigger jump
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

// Function to make the dino jump
function jump() {
    isJumping = true;
    velocity = jumpHeight;
}

// Game loop to apply gravity and update dino's position
function gameLoop() {
    if (isJumping) {
        dinoPosition += velocity;
        velocity -= gravity; // gravity pulling the dino down

        if (dinoPosition <= 0) {
            dinoPosition = 0;
            isJumping = false;
        }
    }

    // Update dino's position on the screen
    dino.style.bottom = dinoPosition + 'px';

    // Move the obstacle and check for collision
    moveObstacle();
    checkCollision();
    updateScore();

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Function to move the obstacle
function moveObstacle() {
    let obstaclePosition = parseInt(obstacle.style.left || 600);

    if (obstaclePosition <= -30) { // When obstacle goes off screen
        obstacle.style.left = '600px'; // Reset the obstacle position
    } else {
        obstacle.style.left = (obstaclePosition - 5) + 'px'; // Move the obstacle to the left
    }
}

// Check for collision with the obstacle
function checkCollision() {
    let dinoRect = dino.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom) {
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    isGameOver = true;
    alert("Game Over! You hit an obstacle!");
    setTimeout(() => {
        location.reload(); // Restart the game after 1 second
    }, 1000);
}

// Function to update the score
function updateScore() {
    score += 1;
    scoreElement.innerText = 'Score: ' + score;
}

// Start the game loop
gameLoop();
