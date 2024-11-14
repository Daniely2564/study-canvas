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
