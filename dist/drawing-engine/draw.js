"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draw = void 0;
class Draw {
    constructor() {
    }
    get Element() {
        return this._elm;
    }
    get Context() {
        return this._ctx;
    }
    Awake() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${400}px`);
        canvas.setAttribute('height', `${400}px`);
        document.body.appendChild(canvas);
        this._elm = canvas;
        const ctx = this._elm.getContext('2d');
        if (!ctx) {
            throw new Error('Context identifier is not supported');
        }
        this._ctx = ctx;
    }
    FillRect(start, size, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.rect(start.x, start.y, size.x, size.y);
        this._ctx.fill();
    }
    ClearRect(start, size) {
        this._ctx.clearRect(start.x, start.y, size.x, size.y);
    }
}
exports.Draw = Draw;
