class Component {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  width = 0;
  height = 0;
  color = "";

  constructor(x, y, dx, dy, width, height, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    this.x += this.dx;
    this.y += this.dy;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  clear(context) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }
}

let context;

const main = new Component(100, 100, 0, 0, 25, 25, "green");
const obstacle = new Component(400, 0, -1, 0, 10, 200, "red");
const obstacle2 = new Component(800, 600, -2, 0, 10, 200, "red");

function startGame() {
  const canvas = document.getElementById("my-canvas");
  canvas.width = 800;
  canvas.height = 800;
  context = canvas.getContext("2d");
  render();
}

function draw() {
  main.draw(context);
  obstacle.draw(context);
  obstacle2.draw(context);
  document.getElementById(
    "box-status"
  ).textContent = `x: ${main.x}, y: ${main.y}, dx: ${main.dx}, dy: ${main.dy}`;
}

function clear() {
  main.clear(context);
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
  switch (event.key) {
    case "ArrowUp":
      main.dy -= 1;
      break;
    case "ArrowDown":
      main.dy += 1;
      break;
    case "ArrowLeft": // <-
      main.dx -= 1;
      break;
    case "ArrowRight": // ->
      main.dx += 1;
      break;
  }
});

// when screen loads, start the game
window.onload = function () {
  startGame();
};
