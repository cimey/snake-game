import { Settings } from "../../settings";
import { CanvasApi } from "../canvas-api";
import { Vector2D } from "../vector-2d";

export class CanvasLayer {


    private static _backgroundCanvas: CanvasApi;
    private static _foregroundCanvas: CanvasApi;

    private constructor() { }

    public static get BackgroundCanvas(): CanvasApi {

        if (!this._backgroundCanvas) {
            this._backgroundCanvas = new CanvasApi(new Vector2D(Settings.backGroundCanvas.width, Settings.backGroundCanvas.height));
            this._backgroundCanvas.Awake();
            this._backgroundCanvas.SetStyle({ zIndex: '0' })
        }

        return this._backgroundCanvas;
    }

    public static get ForegroundCanvas(): CanvasApi {

        if (!this._foregroundCanvas) {
            this._foregroundCanvas = new CanvasApi(new Vector2D(Settings.foreGroundCanvas.width, Settings.foreGroundCanvas.height));
            this._foregroundCanvas.Awake();

            this._foregroundCanvas.SetStyle({ zIndex: '1' });
        }

        return this._foregroundCanvas;
    }
}