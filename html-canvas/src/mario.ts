import { Drawable } from "./drawable";

interface MarioProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

class Mario implements Drawable {
  props: MarioProps;
  context: CanvasRenderingContext2D;
  speed: { x: number; y: number } = { x: 0, y: 0 };
  img: HTMLImageElement;
  ready: boolean;
  resolution: { width: number; height: number };
  jumpMax = 30;
  jumpSpeed = 9;
  jumpIdx = 0;
  calculatedJumps: number[];
  jumpStarted = false;

  constructor(
    props: MarioProps,
    resolution: { width: number; height: number },
    context: CanvasRenderingContext2D
  ) {
    this.props = props;
    this.context = context;
    this.ready = false;
    this.img = new Image();
    console.log(this.img);
    this.img.src = "./src/mario.png";
    this.img.onload = () => {
      this.ready = true;
    };
    this.resolution = resolution;
    this.calculatedJumps = this.calculateJump();
    console.log(this.calculatedJumps);
    this.draw();
  }

  draw() {
    if (this.ready) {
      this.props.x += this.speed.x;
      this.props.y += this.speed.y;
      if (this.jumpStarted) {
        this.jump();
      }
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

  setJumpStarted() {
    this.jumpStarted = true;
  }

  setSpeed(speed: { x: number; y: number }): void {
    this.speed = {
      x: this.speed.x + speed.x,
      y: this.speed.y + speed.y,
    };
  }

  isOnGround() {
    return this.props.y + this.props.height >= this.resolution.height;
  }

  calculateJump() {
    const arr = [];
    for (let i = 0; i <= this.jumpSpeed; i++) {
      arr.push(1 - i / this.jumpSpeed);
    }
    for (let i = 0; i <= this.jumpSpeed; i++) {
      arr.push(0 - i / this.jumpSpeed);
    }
    return arr;
  }

  jump() {
    this.jumpIdx = (this.jumpIdx + 1) % this.calculatedJumps.length;
    if (this.jumpIdx === 0) {
      this.jumpStarted = false;
      this.speed.y = 0;
    }
    this.speed.y = this.calculatedJumps[this.jumpIdx] * this.jumpMax;
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
