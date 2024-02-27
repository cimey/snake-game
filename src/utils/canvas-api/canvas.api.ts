import { IAwake } from "../lifecycle/lifecycle.h";
import { Vector2D } from "../vector-2d";


export class CanvasApi implements IAwake {

  private _ctx!: CanvasRenderingContext2D;
  private _canvas!: HTMLCanvasElement;
  /**
   *
   */
  constructor(private _size: Vector2D) { }

  Awake(): void {
    //Create canvas 
    let canvas = document.createElement('canvas');

    //Set attributes 
    canvas.setAttribute('width', this._size.x.toString())
    canvas.setAttribute('height', this._size.y.toString());

    //append canvas to body
    document.body.appendChild(canvas);

    this._canvas = canvas;
    this._ctx = canvas.getContext('2d')!;
  }

  public get Context(): CanvasRenderingContext2D {
    return this._ctx;

  }

  public get Canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public FillRectangle(start: Vector2D, size: Vector2D, color: string): void {
    this._ctx.beginPath();

    this._ctx.fillStyle = color;

    this._ctx.fillRect(start.x, start.y, size.x, size.y);
    this._ctx.fill();
  }

  public ClearRect(start: Vector2D, size: Vector2D): void {
    this._ctx.clearRect(start.x, start.y, size.x, size.y);
  }

  public SetStyle(style: Partial<CSSStyleDeclaration>): void {
    for (const key in style) {
      if (!Object.hasOwnProperty.call(style, key)) {
        continue
      }

      if (!style[key]) {
        continue
      }

      this._canvas.style[key] = style[key] as string
    }
  }

  public DrawLabel(text: string, position: Vector2D) {
    this._ctx.font = '20px Arial';
    this._ctx.fillStyle = '#fff';
    this._ctx.textAlign = 'left';
    this._ctx.fillText(text, position.x, position.y); // Adjust position as needed
  }
}