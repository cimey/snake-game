"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const food_1 = require("../food/food");
const settings_1 = require("../settings");
const snake_1 = require("../snake/snake");
const canvas_layer_1 = require("../utils/canvas-layer/canvas.layer");
const enums_1 = require("../utils/enums");
const node_utils_1 = require("../utils/node.utils.ts/node.utils");
const vector_2d_1 = require("../utils/vector-2d");
class Game {
    constructor() {
        this._food = null;
        this._level = settings_1.Settings.level.medium;
        this._gameOver = false;
        this._score = 0;
        this._snake = new snake_1.Snake();
        this._foodPosition = this.getRandomPosition();
        this.InitFood(this._foodPosition);
        this.Update();
    }
    Update() {
        var _a;
        if (this._gameOver) {
            return;
        }
        if (this.HitTheWall() || this._snake.DoesSnakeOverlaps) {
            this._gameOver = true;
            canvas_layer_1.CanvasLayer.ForegroundCanvas.DrawLabel("Game Over", new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.width / 2, settings_1.Settings.foreGroundCanvas.height / 2));
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
        (_a = this._food) === null || _a === void 0 ? void 0 : _a.Update();
        setTimeout(() => {
            this.Update();
        }, this._level);
    }
    DrawGameScreen() {
        canvas_layer_1.CanvasLayer.BackgroundCanvas.FillRectangle(new vector_2d_1.Vector2D(settings_1.Settings.backGroundCanvas.x, settings_1.Settings.backGroundCanvas.y), new vector_2d_1.Vector2D(settings_1.Settings.backGroundCanvas.width, settings_1.Settings.backGroundCanvas.height), settings_1.Settings.backGroundCanvas.color);
        canvas_layer_1.CanvasLayer.ForegroundCanvas.FillRectangle(new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.x, settings_1.Settings.foreGroundCanvas.y), new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.width, settings_1.Settings.foreGroundCanvas.height), settings_1.Settings.foreGroundCanvas.color);
        canvas_layer_1.CanvasLayer.ForegroundCanvas.DrawLabel('Score: ' + this._score.toString(), new vector_2d_1.Vector2D(10, 30));
    }
    ClearGameScreen() {
        canvas_layer_1.CanvasLayer.BackgroundCanvas.ClearRect(new vector_2d_1.Vector2D(settings_1.Settings.backGroundCanvas.x, settings_1.Settings.backGroundCanvas.y), new vector_2d_1.Vector2D(settings_1.Settings.backGroundCanvas.width, settings_1.Settings.backGroundCanvas.height));
        canvas_layer_1.CanvasLayer.ForegroundCanvas.ClearRect(new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.x, settings_1.Settings.foreGroundCanvas.y), new vector_2d_1.Vector2D(settings_1.Settings.foreGroundCanvas.width, settings_1.Settings.foreGroundCanvas.height));
    }
    InitFood(position) {
        this._food = new food_1.Food(position, new vector_2d_1.Vector2D(settings_1.Settings.food.width, settings_1.Settings.food.height), settings_1.Settings.food.color);
    }
    SnakeEatFood() {
        if (!this._snake.Head)
            return false;
        if (this._snake.Direction == enums_1.Directions.Right || this._snake.Direction == enums_1.Directions.Left) {
            if (this._snake.Head.y == this._foodPosition.y &&
                ((this._snake.Head.x >= this._foodPosition.x && this._snake.Head.x <= this._foodPosition.x + settings_1.Settings.food.width) ||
                    (this._snake.Head.x + settings_1.Settings.food.width >= this._foodPosition.x && this._snake.Head.x + settings_1.Settings.food.width <= this._foodPosition.x)))
                return true;
        }
        if (this._snake.Direction == enums_1.Directions.Up || this._snake.Direction == enums_1.Directions.Down) {
            if (this._snake.Head.x == this._foodPosition.x &&
                ((this._snake.Head.y >= this._foodPosition.y && this._snake.Head.y <= this._foodPosition.y + settings_1.Settings.food.height) ||
                    (this._snake.Head.y + settings_1.Settings.food.height >= this._foodPosition.y && this._snake.Head.y + settings_1.Settings.food.height <= this._foodPosition.y)))
                return true;
        }
        return false;
    }
    HitTheWall() {
        if (!this._snake.Head)
            return false;
        let snakeX = this._snake.Head.x;
        let snakeY = this._snake.Head.y;
        let wallStartX = settings_1.Settings.foreGroundCanvas.x;
        let wallStartY = settings_1.Settings.foreGroundCanvas.y;
        let wallEndX = wallStartX + settings_1.Settings.foreGroundCanvas.width;
        let wallEndY = wallStartY + settings_1.Settings.foreGroundCanvas.height;
        if (snakeX - (this._snake.Direction === enums_1.Directions.Left ? settings_1.Settings.node.width : 0) <= wallStartX - 1 ||
            snakeX + (this._snake.Direction === enums_1.Directions.Right ? settings_1.Settings.node.width : 0) >= wallEndX - 1 ||
            snakeY - (this._snake.Direction === enums_1.Directions.Up ? settings_1.Settings.node.height : 0) <= wallStartY - 1 ||
            snakeY + (this._snake.Direction === enums_1.Directions.Down ? settings_1.Settings.node.height : 0) >= wallEndY - 1) {
            return true;
        }
        return false;
    }
    getRandomPosition() {
        return new vector_2d_1.Vector2D(node_utils_1.NodeUtils.GenerateRandomInt(0, 23) * settings_1.Settings.node.width, node_utils_1.NodeUtils.GenerateRandomInt(0, 23) * settings_1.Settings.node.width);
    }
}
exports.Game = Game;
