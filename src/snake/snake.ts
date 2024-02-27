import { SnakeNode } from "../node/node";
import { Settings } from "../settings";
import { Directions } from "../utils/enums";
import { KeyboardEvents } from "../utils/input-system/keyboard.listener";
import { IAwake, IUpdate } from "../utils/lifecycle/lifecycle.h";
import { NodeUtils } from "../utils/node.utils.ts/node.utils";
import { Vector2D } from "../utils/vector-2d";

export class Snake implements IAwake, IUpdate {

    private _nodes: SnakeNode[] = []
    private _headNodePosition: Vector2D | null = null;
    private _currentDirection: Directions;
    constructor() {
        this._currentDirection = Settings.node.initialDirection;

        this.Awake();
    }

    Update(): void {
        this.UpdateNodes();
        this._headNodePosition = this._nodes[0].Position;

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].Update();
        }
    }

    private UpdateNodes() {
        //restructure nodes
        let newNodes = [];

        //0 is the head
        var pos: Vector2D = new Vector2D(this._nodes[0].Position.x, this._nodes[0].Position.y);
        var size = this._nodes[0].Size;

        // update position depending on position and direction
        NodeUtils.UpdateNodePosition(pos, this._currentDirection, size.x);

        var newHead = new SnakeNode(this._currentDirection, size, pos, Settings.node.color, this._currentDirection);
        newNodes.push(newHead);

        for (let i = 0; i < this._nodes.length - 1; i++) {
            // calculate position
            var position = NodeUtils.SetPrevNodePos(newNodes[i].Position, newNodes[i].Direction, newNodes[i].Size.x);
            let newNode = new SnakeNode(this._nodes[i].Direction, this._nodes[i].Size, position, Settings.node.color, this._currentDirection);

            newNode._gameDirection = this._currentDirection
            newNodes.push(newNode);
        }

        this._nodes = newNodes;
    }

    Awake(): void {
        this.SubscribeToKeyEvents();
        this.InitNodes();

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].Awake();
        }
    }

    private InitNodes(): void {

        //initialize nodes
        for (let i = 0; i < Settings.nodeCount; i++) {
            let node = new SnakeNode(this._currentDirection,
                new Vector2D(Settings.node.width, Settings.node.height),
                // start from 22nd node
                new Vector2D(Settings.node.width * (21 - i), Settings.node.height * 21),
                Settings.node.color,
                this._currentDirection);
            if (i == 0)
                this._headNodePosition = node.Position;
            this._nodes.push(node);
        }
    }

    public get Head(): Vector2D | null {
        return this._headNodePosition
    }

    public get Direction(): Directions {
        return this._currentDirection;
    }

    public get HN(): SnakeNode {
        return this._nodes[0];
    }

    public get DoesSnakeOverlaps(): boolean {

        for (let i = 1; i < this._nodes.length; i++) {
                if(
                    this._nodes[0].Position.x == this._nodes[i].Position.x &&
                    this._nodes[0].Position.y == this._nodes[i].Position.y){
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

    public AddNewNode() {
        let tail = this._nodes[this._nodes.length - 1];
        var position = NodeUtils.SetPrevNodePos(tail.Position, tail.Direction, tail.Size.x);
        let newNode = new SnakeNode(tail.Direction, tail.Size, position, Settings.node.color, this._currentDirection);
        this._nodes.push(newNode);
    }

    private SubscribeToKeyEvents(): void {

        KeyboardEvents.ListenKeyboardEvents();

        KeyboardEvents.SubscribeToDownKey({
            instance: this, callback: () => {
                if (this._currentDirection != Directions.Down && this._currentDirection != Directions.Up) {
                    this._currentDirection = Directions.Down;
                    this.UpdateNodes();
                }
            }
        });

        KeyboardEvents.SubscribeToUpKey({
            instance: this, callback: () => {
                if (this._currentDirection != Directions.Down && this._currentDirection != Directions.Up) {
                    this._currentDirection = Directions.Up;
                    this.UpdateNodes();
                }
            }
        });

        KeyboardEvents.SubscribeToLeftKey({
            instance: this, callback: () => {
                if (this._currentDirection != Directions.Left && this._currentDirection != Directions.Right) {
                    this._currentDirection = Directions.Left;
                    this.UpdateNodes();
                }
            }
        });

        KeyboardEvents.SubscribeToRightKey({
            instance: this, callback: () => {
                if (this._currentDirection != Directions.Left && this._currentDirection != Directions.Right) {
                    this._currentDirection = Directions.Right;
                    this.UpdateNodes();
                }
            }
        });
    }
}