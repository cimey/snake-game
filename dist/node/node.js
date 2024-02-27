"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeNode = void 0;
const canvas_layer_1 = require("../utils/canvas-layer/canvas.layer");
class SnakeNode {
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
        canvas_layer_1.CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
    Clear() {
        canvas_layer_1.CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }
    get Direction() {
        return this._direction;
    }
    set Direction(direction) {
        this._direction = direction;
    }
}
exports.SnakeNode = SnakeNode;
