// Pipe Class
class Pipe {
  x: number;
  height: number;
  width: number;
  gap: number;

  constructor(canvas: HTMLCanvasElement, gap: number, width: number) {
    this.x = canvas.width;
    this.width = width;
    this.height = Math.floor(Math.random() * (canvas.height - gap - 50)) + 50; // add guaranteed 50px top and bottom padding
    this.gap = gap;
  }
  draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
    // Top Pipe
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, 0, this.width, this.height);
    // Bottom Pipe
    ctx.fillRect(
      this.x,
      this.height + this.gap,
      this.width,
      canvasHeight - this.height - this.gap
    );
  }

  update() {
    this.x -= 2;
  }
}

export default Pipe;
