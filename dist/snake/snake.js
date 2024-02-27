"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const node_1 = require("../node/node");
const settings_1 = require("../settings");
const enums_1 = require("../utils/enums");
const keyboard_listener_1 = require("../utils/input-system/keyboard.listener");
const node_utils_1 = require("../utils/node.utils.ts/node.utils");
const vector_2d_1 = require("../utils/vector-2d");
class Snake {
    constructor() {
        this._nodes = [];
        this._headNodePosition = null;
        this._currentDirection = settings_1.Settings.node.initialDirection;
        this.Awake();
    }
    Update() {
        this.UpdateNodes();
        this._headNodePosition = this._nodes[0].Position;
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].Update();
        }
    }
    UpdateNodes() {
        //restructure nodes
        let newNodes = [];
        //0 is the head
        var pos = new vector_2d_1.Vector2D(this._nodes[0].Position.x, this._nodes[0].Position.y);
        var size = this._nodes[0].Size;
        // update position depending on position and direction
        node_utils_1.NodeUtils.UpdateNodePosition(pos, this._currentDirection, size.x);
        var newHead = new node_1.SnakeNode(this._currentDirection, size, pos, settings_1.Settings.node.color, this._currentDirection);
        newNodes.push(newHead);
        for (let i = 0; i < this._nodes.length - 1; i++) {
            // calculate position
            var position = node_utils_1.NodeUtils.SetPrevNodePos(newNodes[i].Position, newNodes[i].Direction, newNodes[i].Size.x);
            let newNode = new node_1.SnakeNode(this._nodes[i].Direction, this._nodes[i].Size, position, settings_1.Settings.node.color, this._currentDirection);
            newNode._gameDirection = this._currentDirection;
            newNodes.push(newNode);
        }
        this._nodes = newNodes;
    }
    Awake() {
        this.SubscribeToKeyEvents();
        this.InitNodes();
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].Awake();
        }
    }
    InitNodes() {
        //initialize nodes
        for (let i = 0; i < settings_1.Settings.nodeCount; i++) {
            let node = new node_1.SnakeNode(this._currentDirection, new vector_2d_1.Vector2D(settings_1.Settings.node.width, settings_1.Settings.node.height), 
            // start from 22nd node
            new vector_2d_1.Vector2D(settings_1.Settings.node.width * (21 - i), settings_1.Settings.node.height * 21), settings_1.Settings.node.color, this._currentDirection);
            if (i == 0)
                this._headNodePosition = node.Position;
            this._nodes.push(node);
        }
    }
    get Head() {
        return this._headNodePosition;
    }
    get Direction() {
        return this._currentDirection;
    }
    get HN() {
        return this._nodes[0];
    }
    get DoesSnakeOverlaps() {
        for (let i = 1; i < this._nodes.length; i++) {
            if (this._nodes[0].Position.x == this._nodes[i].Position.x &&
                this._nodes[0].Position.y == this._nodes[i].Position.y) {
                return true;
            }
            // if (this.Direction == Directions.Right || this.Direction == Directions.Left) {
            //     if (this._nodes[0].Position.y == this._nodes[i].Position.y &&
            //         ((this._nodes[0].Position.x >= this._nodes[i].Position.x && this._nodes[0].Position.x <= this._nodes[i].Position.x + Settings.node.width) ||
            //             (this._nodes[i].Position.x >= this._nodes[0].Position.x && this._nodes[i].Position.x <= this._nodes[0].Position.x + Settings.node.width)
            //         )
            //     ) {
            //         console.log("here 1");
            //         return true;
            //     }
            // }
            // if (this.Direction == Directions.Up || this.Direction == Directions.Down) {
            //     if (this._nodes[0].Position.x == this._nodes[i].Position.x &&
            //         ((this._nodes[0].Position.y >= this._nodes[i].Position.y && this._nodes[0].Position.y <= this._nodes[i].Position.y + Settings.node.height) ||
            //             (this._nodes[i].Position.y >= this._nodes[0].Position.y && this._nodes[i].Position.y <= this._nodes[0].Position.y + Settings.node.height)
            //         )
            //     ) {
            //         console.log("here 2");
            //         return true;
            //     }
            // }
        }
        return false;
    }
    AddNewNode() {
        let tail = this._nodes[this._nodes.length - 1];
        var position = node_utils_1.NodeUtils.SetPrevNodePos(tail.Position, tail.Direction, tail.Size.x);
        let newNode = new node_1.SnakeNode(tail.Direction, tail.Size, position, settings_1.Settings.node.color, this._currentDirection);
        this._nodes.push(newNode);
    }
    SubscribeToKeyEvents() {
        keyboard_listener_1.KeyboardEvents.ListenKeyboardEvents();
        keyboard_listener_1.KeyboardEvents.SubscribeToDownKey({
            instance: this, callback: () => {
                if (this._currentDirection != enums_1.Directions.Down && this._currentDirection != enums_1.Directions.Up) {
                    this._currentDirection = enums_1.Directions.Down;
                    this.UpdateNodes();
                }
            }
        });
        keyboard_listener_1.KeyboardEvents.SubscribeToUpKey({
            instance: this, callback: () => {
                if (this._currentDirection != enums_1.Directions.Down && this._currentDirection != enums_1.Directions.Up) {
                    this._currentDirection = enums_1.Directions.Up;
                    this.UpdateNodes();
                }
            }
        });
        keyboard_listener_1.KeyboardEvents.SubscribeToLeftKey({
            instance: this, callback: () => {
                if (this._currentDirection != enums_1.Directions.Left && this._currentDirection != enums_1.Directions.Right) {
                    this._currentDirection = enums_1.Directions.Left;
                    this.UpdateNodes();
                }
            }
        });
        keyboard_listener_1.KeyboardEvents.SubscribeToRightKey({
            instance: this, callback: () => {
                if (this._currentDirection != enums_1.Directions.Left && this._currentDirection != enums_1.Directions.Right) {
                    this._currentDirection = enums_1.Directions.Right;
                    this.UpdateNodes();
                }
            }
        });
    }
}
exports.Snake = Snake;
