import { CanvasLayer } from "../utils/canvas-layer/canvas.layer";
export class SnakeNode {
    constructor(direction, size, startPosition, color, gameDirection) {
        this._direction = direction;
        this._position = startPosition;
        this._size = size;
        this._color = color;
        this._gameDirection = gameDirection;
    }
    Update() {
        this.Clear();
        this.Draw();
    }
    Awake() {
        this.Draw();
    }
    set Position(pos) {
        this._position = pos;
    }
    get Position() {
        return this._position;
    }
    get Size() {
        return this._size;
    }
    Draw() {
        CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
    Clear() {
        CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }
    get Direction() {
        return this._direction;
    }
    set Direction(direction) {
        this._direction = direction;
    }
}
