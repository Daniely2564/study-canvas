import { Drawable } from "./drawable";

interface MarioProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

const GRAVITY = 9.8;

class Mario implements Drawable {
  props: MarioProps;
  context: CanvasRenderingContext2D;
  speed: { x: number; y: number } = { x: 0, y: 0 };
  img: HTMLImageElement;
  ready: boolean;
  resolution: { width: number; height: number };
  jumpIdx: number;
  jumpForce: number;

  constructor(
    props: MarioProps,
    resolution: { width: number; height: number },
    context: CanvasRenderingContext2D
  ) {
    this.props = props;
    this.context = context;
    this.ready = false;
    this.resolution = resolution;
    this.jumpIdx = -1;
    this.jumpForce = 90;

    this.img = new Image();
    this.img.src = "./src/mario.png";
    this.img.onload = () => {
      this.ready = true;
    };

    this.draw();
  }

  draw() {
    if (this.ready) {
      this.props.x += this.speed.x;
      this.props.y += this._calculateY();
      this.preventOutOfBounds();
      this.context.drawImage(
        this.img,
        this.props.x,
        this.props.y,
        this.props.width,
        this.props.height
      );
    }
  }

  setSpeed(speed: { x: number; y: number }): void {
    this.speed = {
      x: this.speed.x + speed.x,
      y: this.speed.y + speed.y,
    };
  }

  _calculateY() {
    if (this.jumpIdx < 1) {
      return 0;
    }
    if (this.isOnGround() && this.jumpIdx > 2) {
      this.jumpIdx = -1;
      return 0;
    }
    const expectedHeight =
      (this.jumpForce * this.jumpIdx) / 20 -
      (GRAVITY * 0.5 * this.jumpIdx * this.jumpIdx) / 20;
    this.jumpIdx++;
    return expectedHeight * -1;
  }

  jump() {
    if (this.jumpIdx === -1) {
      this.jumpIdx = 1;
    }
  }

  isOnGround() {
    return this.props.y + this.props.height >= this.resolution.height;
  }

  preventOutOfBounds() {
    if (this.props.x < 0) {
      this.props.x = 0;
    }
    if (this.props.y < 0) {
      this.props.y = 0;
    }
    if (this.props.x + this.props.width > 800) {
      this.props.x = 800 - this.props.width;
    }
    if (this.props.y + this.props.height > 800) {
      this.props.y = 800 - this.props.height;
    }
  }

  clear() {
    this.context.clearRect(
      this.props.x,
      this.props.y,
      this.props.width,
      this.props.height
    );
  }
}
export default Mario;
