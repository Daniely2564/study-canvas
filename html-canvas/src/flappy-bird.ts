import Pipe from "./pipe";
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Game Variables
let bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 1,
  lift: -15,
  velocity: 0,
};

let pipes: Pipe[] = [];
let pipeWidth = 30;
let pipeGap = 300;
let frame = 0;
let score = 0;
let isGameOver = false;

// Add event listener for jump
document.addEventListener("keydown", () => (bird.velocity = bird.lift));
document.addEventListener("mousedown", () => (bird.velocity = bird.lift));

// Game Loop
function gameLoop() {
  if (isGameOver) return gameOver();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Gravity and Movement
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Prevent bird from falling below canvas
  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    isGameOver = true;
  }
  // Prevent bird from going above canvas
  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }

  // Generate pipes
  if (frame % 100 === 0) {
    pipes.push(new Pipe(canvas, pipeGap, pipeWidth));
  }

  // Update and draw pipes
  pipes.forEach((pipe, index) => {
    pipe.update();
    pipe.draw(ctx, canvas.height);

    // Check for collisions
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)
    ) {
      isGameOver = true;
    }

    // Remove pipes that go off-screen
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(index, 1);
      score++;
    }
  });

  // Draw Score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  frame++;
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Game Over`, canvas.width / 2 - 70, canvas.height / 2 - 20);
  ctx.font = "20px Arial";
  ctx.fillText(
    `Final Score: ${score}`,
    canvas.width / 2 - 70,
    canvas.height / 2 + 20
  );
}

// Start Game
gameLoop();
