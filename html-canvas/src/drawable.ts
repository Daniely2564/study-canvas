export interface Drawable {
  speed: { x: number; y: number };
  draw(): void;
  clear(): void;
  setSpeed(speed: { x: number; y: number }): void;
}
