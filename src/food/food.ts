import { CanvasLayer } from "../utils/canvas-layer/canvas.layer";
import { IAwake, IUpdate } from "../utils/lifecycle/lifecycle.h";
import { Vector2D } from "../utils/vector-2d";

export class Food implements IAwake, IUpdate {


    private _position: Vector2D;

    private _size: Vector2D;

    private _color: string;

    constructor(position: Vector2D, size: Vector2D, color: string) {

        this._position = position;
        this._size = size;
        this._color = color;
        this.Awake();
    }

    Update(): void {
        this.Clear();
        this.Draw();
    }
    Awake(): void {
        this.Clear();
        this.Draw();
    }

    private Clear() {
        CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }

    private Draw() {
        CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
}