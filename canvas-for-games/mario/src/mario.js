class Mario {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  width = 0;
  height = 0;
  img;
  imgReady = false;

  constructor(x, y, dx, dy, width, height, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "./src/mario.png";
    this.img.onload = () => {
      this.imgReady = true;
    };
  }

  draw(context) {
    this.x += this.dx;
    this.y += this.dy;
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  clear(context) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    this.dy -= 4;
  }
}
