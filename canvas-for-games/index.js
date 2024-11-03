let context;

let x = 100;
let y = 100;
let dx = 0; // speed on x-axis
let dy = 0; // speed on y-axis
let width = 25;
let height = 25;

function startGame() {
  const canvas = document.getElementById("my-canvas");
  canvas.width = 800;
  canvas.height = 800;
  context = canvas.getContext("2d");
  render();
}

function draw() {
  context.fillStyle = "green";
  x += dx;
  y += dy;
  context.fillRect(x, y, width, height);
  document.getElementById(
    "box-status"
  ).textContent = `x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}`;
}

function clear() {
  context.clearRect(x, y, width, height);
}

function render() {
  setInterval(function () {
    clear();
    draw();
  }, 20);
}

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      dy -= 1;
      break;
    case "ArrowDown":
      dy += 1;
      break;
    case "ArrowLeft": // <-
      dx -= 1;
      break;
    case "ArrowRight": // ->
      dx += 1;
      break;
  }
});

// when screen loads, start the game
window.onload = function () {
  startGame();
};
