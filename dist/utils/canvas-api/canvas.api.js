"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasApi = void 0;
class CanvasApi {
    /**
     *
     */
    constructor(_size) {
        this._size = _size;
    }
    Awake() {
        //Create canvas 
        let canvas = document.createElement('canvas');
        //Set attributes 
        canvas.setAttribute('width', this._size.x.toString());
        canvas.setAttribute('height', this._size.y.toString());
        //append canvas to body
        document.body.appendChild(canvas);
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    }
    get Context() {
        return this._ctx;
    }
    get Canvas() {
        return this._canvas;
    }
    FillRectangle(start, size, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(start.x, start.y, size.x, size.y);
        this._ctx.fill();
    }
    ClearRect(start, size) {
        this._ctx.clearRect(start.x, start.y, size.x, size.y);
    }
    SetStyle(style) {
        for (const key in style) {
            if (!Object.hasOwnProperty.call(style, key)) {
                continue;
            }
            if (!style[key]) {
                continue;
            }
            this._canvas.style[key] = style[key];
        }
    }
    DrawLabel(text, position) {
        this._ctx.font = '20px Arial';
        this._ctx.fillStyle = '#fff';
        this._ctx.textAlign = 'left';
        this._ctx.fillText(text, position.x, position.y); // Adjust position as needed
    }
}
exports.CanvasApi = CanvasApi;
