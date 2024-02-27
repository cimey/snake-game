"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const canvas_layer_1 = require("../utils/canvas-layer/canvas.layer");
class Food {
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
        canvas_layer_1.CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }
    Draw() {
        canvas_layer_1.CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
}
exports.Food = Food;
