import { CanvasApi } from "canvas-drawing-engine";
import { Settings } from "../../settings";
import { Vector2D } from "../vector-2d";
export class CanvasLayer {
    constructor() { }
    static set ElementId(elementId) {
        this._elementId = elementId;
    }
    static get BackgroundCanvas() {
        if (!this._backgroundCanvas) {
            this._backgroundCanvas = new CanvasApi(new Vector2D(Settings.backGroundCanvas.width, Settings.backGroundCanvas.height), this._elementId);
            this._backgroundCanvas.Awake();
            this._backgroundCanvas.SetStyle({ zIndex: '0' });
        }
        return this._backgroundCanvas;
    }
    static get ForegroundCanvas() {
        if (!this._foregroundCanvas) {
            this._foregroundCanvas = new CanvasApi(new Vector2D(Settings.foreGroundCanvas.width, Settings.foreGroundCanvas.height), this._elementId);
            this._foregroundCanvas.Awake();
            this._foregroundCanvas.SetStyle({ zIndex: '1' });
        }
        return this._foregroundCanvas;
    }
}
CanvasLayer._elementId = "myDiv";
