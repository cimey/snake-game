"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasLayer = void 0;
const settings_1 = require("../../settings");
const canvas_api_1 = require("../canvas-api");
const vector_2d_1 = require("../vector-2d");
class CanvasLayer {
    constructor() { }
    static get BackgroundCanvas() {
        if (!this._backgroundCanvas) {
            this._backgroundCanvas = new canvas_api_1.CanvasApi(new vector_2d_1.Vector2D(settings_1.Settings.backGroundCanvas.width, settings_1.Settings.backGroundCanvas.height));
            this._backgroundCanvas.Awake();
            this._backgroundCanvas.SetStyle({ zIndex: '0' });
        }
        return this._backgroundCanvas;
    }
    static get ForegroundCanvas() {
        if (!this._foregroundCanvas) {
            this._foregroundCanvas = new canvas_api_1.CanvasApi(new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.width, settings_1.Settings.foreGroundCanvas.height));
            this._foregroundCanvas.Awake();
            this._foregroundCanvas.SetStyle({ zIndex: '1' });
        }
        return this._foregroundCanvas;
    }
}
exports.CanvasLayer = CanvasLayer;
