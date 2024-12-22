class Mario {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  width = 0;
  height = 0;
  img;
  imgReady = false;
  t = -1;
  frame = { width: 0, height: 0 };
  initialHeight;

  constructor(x, y, dx, dy, width, height, frame) {
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
    this.frame = frame;
    this.initialHeight = this.frame.height - this.height;
  }

  draw(context) {
    this.x += this.dx;
    this.y = this._calculateY();
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  clear(context) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    this.t = 1;
  }

  _calculateY() {
    if (this.t >= 0) {
      if (this._isOnTheGround() && this.t > 5) {
        this.t = -1;
        return this.initialHeight;
      }

      const GRAVITY = 9.45;
      const JUMP_FORCE = 80;
      const height =
        -1 * JUMP_FORCE * this.t +
        0.5 * GRAVITY * this.t * this.t +
        this.initialHeight;
      this.t++;
      return height;
    } else {
      return this.initialHeight;
    }
  }

  _isOnTheGround() {
    // initial height
    return this.y >= this.initialHeight;
  }

  // 1. Is Mario in the air?
  // 2. Is Mario on the ground after the jump
}
