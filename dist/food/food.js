import { CanvasLayer } from "../utils/canvas-layer/canvas.layer";
export class Food {
    constructor(position, size, color) {
        this._position = position;
        this._size = size;
        this._color = color;
        this.Awake();
    }
    Update() {
        this.Clear();
        this.Draw();
    }
    Awake() {
        this.Clear();
        this.Draw();
    }
    Clear() {
        CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }
    Draw() {
        CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
}
