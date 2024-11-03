import { Drawable } from "./drawable";

interface ComponentProps {
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
}

class Component implements Drawable {
  props: ComponentProps;
  context: CanvasRenderingContext2D;
  speed: { x: number; y: number } = { x: 0, y: 0 };

  constructor(props: ComponentProps, context: CanvasRenderingContext2D) {
    this.props = props;
    this.context = context;
    this.draw();
  }

  draw() {
    this.context.fillStyle = this.props.color;
    this.props.x += this.speed.x;
    this.props.y += this.speed.y;
    this.preventOutOfBounds();
    this.context.fillRect(
      this.props.x,
      this.props.y,
      this.props.width,
      this.props.height
    );
  }

  setSpeed(speed: { x: number; y: number }): void {
    this.speed = {
      x: this.speed.x + speed.x,
      y: this.speed.y + speed.y,
    };
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
export default Component;
