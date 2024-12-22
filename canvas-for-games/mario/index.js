let context;
const frame = { width: 800, height: 800 };
const mario = new Mario(100, frame.height - 70, 0, 0, 50, 70, frame);
const obstacle = new Component(400, 0, -1, 0, 10, 200, "red");
const obstacle2 = new Component(800, 600, -2, 0, 10, 200, "red");

function startGame() {
  const canvas = document.getElementById("my-canvas");
  canvas.width = frame.width;
  canvas.height = frame.height;
  context = canvas.getContext("2d");
  render();
}

function draw() {
  mario.draw(context);
  obstacle.draw(context);
  obstacle2.draw(context);
  document.getElementById(
    "box-status"
  ).textContent = `x: ${mario.x}, y: ${mario.y}, dx: ${mario.dx}, dy: ${mario.dy}`;
}

function clear() {
  mario.clear(context);
  obstacle.clear(context);
  obstacle2.clear(context);
}

function render() {
  setInterval(function () {
    clear();
    draw();
  }, 20);
}

window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowUp":
      mario.dy -= 1;
      break;
    case "ArrowDown":
      mario.dy += 1;
      break;
    case "ArrowLeft": // <-
      mario.dx -= 1;
      break;
    case "ArrowRight": // ->
      mario.dx += 1;
      break;
    case "Space":
      mario.jump();
      break;
  }
});

// when screen loads, start the game
window.onload = function () {
  startGame();
};
