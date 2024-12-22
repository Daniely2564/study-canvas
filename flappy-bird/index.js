// 1. Bird that flies between obstacles (pipes)
// 2. Pipe. Obstacle that bird needs to jump between

let isGameOver = false;

const bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.97,
  jump: -15,
  velocity: 0,
};

document.addEventListener("keydown", () => (bird.velocity = bird.jump));

function draw(canvas, ctx) {
  if (isGameOver) {
    return gameOver(ctx);
  }

  // remove the drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // trying to go above the top frame
  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }

  if (bird.y + bird.height > canvas.height) {
    isGameOver = true;
  }

  requestAnimationFrame(() => draw(canvas, ctx));
}

let score = 0;

function gameOver(ctx) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  // Game Over
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2 - 20);

  // Final Score: 0
  ctx.font = "20px Arial";
  ctx.fillText(
    "Final Score: " + score,
    canvas.width / 2 - 50,
    canvas.height / 2 + 20
  );
}

// 1. Pipe. If bird reaches pipes, game over.
// 2. We'd like to create an animation bird flying. (The wings move)

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  draw(canvas, ctx);
};
