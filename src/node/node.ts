import { CanvasLayer } from "../utils/canvas-layer/canvas.layer";
import { Directions } from "../utils/enums";
import { IAwake, IUpdate } from "../utils/lifecycle/lifecycle.h";
import { Vector2D } from "../utils/vector-2d";

export class SnakeNode implements IAwake, IUpdate {
    private _direction: Directions;
    public _gameDirection: Directions | null;
    private _position: Vector2D;
    private _size: Vector2D;
    private _color: string;

    constructor(direction: Directions, size: Vector2D, startPosition: Vector2D, color: string, gameDirection: Directions) {
        this._direction = direction;
        this._position = startPosition;
        this._size = size;
        this._color = color;
        this._gameDirection = gameDirection;
    }

    Update(): void {

        this.Clear();
        this.Draw();
    }

    Awake(): void {
        this.Draw();
    }

    public set Position(pos: Vector2D) {
        this._position = pos;
    }
    public get Position(): Vector2D {
        return this._position;
    }

    public get Size(): Vector2D {
        return this._size;
    } 

    private Draw(): void {
        CanvasLayer.ForegroundCanvas.FillRectangle(this._position, this._size, this._color);
    }
    private Clear(): void {
        CanvasLayer.ForegroundCanvas.ClearRect(this._position, this._size);
    }

    public get Direction(): Directions {
        return this._direction!;
    }

    public set Direction(direction: Directions) {
        this._direction = direction;
    }
}