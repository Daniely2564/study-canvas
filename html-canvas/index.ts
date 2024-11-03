import Component from "./src/component";
import { Drawable } from "./src/drawable";

let context: CanvasRenderingContext2D | null = null;
let timer: number = 0;
const drawables: Drawable[] = [];

function startGame() {
  const myCanvas = document.getElementById("my-canvas") as HTMLCanvasElement;
  myCanvas.width = 800;
  myCanvas.height = 800;
  context = myCanvas.getContext("2d");
  drawables.push(
    new Component(
      {
        width: 30,
        height: 30,
        color: "green",
        x: 350,
        y: 350,
      },
      context!
    )
  );
  timer = setInterval(draw, 20);
}

function draw() {
  let text = "";
  drawables.forEach((drawable) => {
    drawable.clear();
    drawable.draw();
    text += `x: ${drawable.speed.x}, y: ${drawable.speed.y}\n`;
  });

  document.getElementById("render-text")!.textContent = text;
}

function onupclick() {
  drawables.forEach((drawable) => {
    drawable.setSpeed({ x: 0, y: -1 });
  });
}
function onDownClick() {
  drawables.forEach((drawable) => {
    drawable.setSpeed({ x: 0, y: 1 });
  });
}
function onLeftClick() {
  drawables.forEach((drawable) => {
    drawable.setSpeed({ x: -1, y: 0 });
  });
}
function onRightClick() {
  drawables.forEach((drawable) => {
    drawable.setSpeed({ x: 1, y: 0 });
  });
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      onupclick();
      break;
    case "ArrowDown":
      onDownClick();
      break;
    case "ArrowLeft":
      onLeftClick();
      break;
    case "ArrowRight":
      onRightClick();
      break;
  }
});

window.onload = function () {
  startGame();
  document.getElementById("up-btn")!.addEventListener("click", onupclick);
  document.getElementById("down-btn")!.addEventListener("click", onDownClick);
  document.getElementById("left-btn")!.addEventListener("click", onLeftClick);
  document.getElementById("right-btn")!.addEventListener("click", onRightClick);
};
