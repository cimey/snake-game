import { Food } from "../food/food";
import { Settings } from "../settings";
import { Snake } from "../snake/snake";
import { CanvasLayer } from "../utils/canvas-layer/canvas.layer";
import { Directions } from "../utils/enums";
import { IUpdate } from "../utils/lifecycle/lifecycle.h";
import { NodeUtils } from "../utils/node.utils.ts/node.utils";
import { Vector2D } from "../utils/vector-2d";

export class Game implements IUpdate {

    private _snake: Snake;
    private _food: Food | null = null;
    private _foodPosition: Vector2D;
    private _level: number = Settings.level.medium;
    private _gameOver: boolean = false;
    private _score: number = 0;

    private _elementId: string;

    constructor(elementId: string) {
        this._snake = new Snake();
        this._foodPosition = this.getRandomPosition();
        this.InitFood(this._foodPosition);
        this.Update();
        this._elementId = elementId;
        CanvasLayer.ElementId = elementId;
    }

    Update(): void {
        if (this._gameOver) {
            return;
        }

        if (this.HitTheWall() || this._snake.DoesSnakeOverlaps) {
            this._gameOver = true;
            CanvasLayer.ForegroundCanvas.DrawLabel("Game Over", new Vector2D(Settings.foreGroundCanvas.width / 2, Settings.foreGroundCanvas.height / 2))
            return;
        }

        this.ClearGameScreen();
        this.DrawGameScreen();

        if (this.SnakeEatFood()) {
            this._foodPosition = this.getRandomPosition();
            this.InitFood(this._foodPosition);
            this._snake.AddNewNode();
            this._score++;
        }

        this._snake.Update();
        this._food?.Update();

        setTimeout(() => {
            this.Update()
        }, this._level);
    }

    private DrawGameScreen() {
        // CanvasLayer.BackgroundCanvas.FillRectangle(new Vector2D(Settings.backGroundCanvas.x, Settings.backGroundCanvas.y),
        //     new Vector2D(Settings.backGroundCanvas.width, Settings.backGroundCanvas.height),
        //     Settings.backGroundCanvas.color);

        CanvasLayer.ForegroundCanvas.FillRectangle(new Vector2D(Settings.foreGroundCanvas.x, Settings.foreGroundCanvas.y),
            new Vector2D(Settings.foreGroundCanvas.width, Settings.foreGroundCanvas.height),
            Settings.foreGroundCanvas.color);

        CanvasLayer.ForegroundCanvas.DrawLabel('Score: ' + this._score.toString(), new Vector2D(10, 30))
    }

    private ClearGameScreen() {
        // CanvasLayer.BackgroundCanvas.ClearRect(new Vector2D(Settings.backGroundCanvas.x, Settings.backGroundCanvas.y),
        //     new Vector2D(Settings.backGroundCanvas.width, Settings.backGroundCanvas.height));

        CanvasLayer.ForegroundCanvas.ClearRect(new Vector2D(Settings.foreGroundCanvas.x, Settings.foreGroundCanvas.y),
            new Vector2D(Settings.foreGroundCanvas.width, Settings.foreGroundCanvas.height));
    }

    private InitFood(position: Vector2D) {
        this._food = new Food(position,
            new Vector2D(Settings.food.width, Settings.food.height),
            Settings.food.color);
    }

    private SnakeEatFood(): boolean {
        if (!this._snake.Head)
            return false;

        if (this._snake.Direction == Directions.Right || this._snake.Direction == Directions.Left) {

            if (this._snake.Head.y == this._foodPosition.y &&
                ((this._snake.Head.x >= this._foodPosition.x && this._snake.Head.x <= this._foodPosition.x + Settings.food.width) ||
                    (this._snake.Head.x + Settings.food.width >= this._foodPosition.x && this._snake.Head.x + Settings.food.width <= this._foodPosition.x)
                )
            )
                return true;
        }

        if (this._snake.Direction == Directions.Up || this._snake.Direction == Directions.Down) {

            if (this._snake.Head.x == this._foodPosition.x &&
                ((this._snake.Head.y >= this._foodPosition.y && this._snake.Head.y <= this._foodPosition.y + Settings.food.height) ||
                    (this._snake.Head.y + Settings.food.height >= this._foodPosition.y && this._snake.Head.y + Settings.food.height <= this._foodPosition.y)
                )
            )
                return true;
        }

        return false;
    }

    private HitTheWall() {
        if (!this._snake.Head)
            return false;

        let snakeX = this._snake.Head.x;
        let snakeY = this._snake.Head.y;

        let wallStartX = Settings.foreGroundCanvas.x;
        let wallStartY = Settings.foreGroundCanvas.y;

        let wallEndX = wallStartX + Settings.foreGroundCanvas.width;
        let wallEndY = wallStartY + Settings.foreGroundCanvas.height;

        if (snakeX - (this._snake.Direction === Directions.Left ? Settings.node.width : 0) <= wallStartX - 1 ||
            snakeX + (this._snake.Direction === Directions.Right ? Settings.node.width : 0) >= wallEndX - 1 ||
            snakeY - (this._snake.Direction === Directions.Up ? Settings.node.height : 0) <= wallStartY - 1 ||
            snakeY + (this._snake.Direction === Directions.Down ? Settings.node.height : 0) >= wallEndY - 1) {
            return true;
        }

        return false;
    }

    private getRandomPosition(): Vector2D {
        return new Vector2D(NodeUtils.GenerateRandomInt(0, 23) * Settings.node.width, NodeUtils.GenerateRandomInt(0, 23) * Settings.node.width);
    }
}