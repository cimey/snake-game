import { Directions } from "../enums";
import { Vector2D } from "../vector-2d";
export class NodeUtils {
    static UpdateNodePosition(pos, direction, magnitude) {
        if (direction == Directions.Up) {
            pos.y = pos.y - magnitude;
        }
        if (direction == Directions.Down) {
            pos.y = pos.y + magnitude;
        }
        if (direction == Directions.Left) {
            pos.x = pos.x - magnitude;
        }
        if (direction == Directions.Right) {
            pos.x = pos.x + magnitude;
        }
    }
    static SetPrevNodePos(pos, direction, magnitude) {
        let result = new Vector2D(pos.x, pos.y);
        if (direction == Directions.Up) {
            result.y = result.y + magnitude;
        }
        if (direction == Directions.Down) {
            result.y = result.y - magnitude;
        }
        if (direction == Directions.Left) {
            result.x = result.x + magnitude;
        }
        if (direction == Directions.Right) {
            result.x = result.x - magnitude;
        }
        return result;
    }
    static GenerateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static Does2NodeIntersect(node1, node2) {
        var node1CenterX = node1.Position.x + node1.Size.x / 2;
        var node1CenterY = node1.Position.y + node1.Size.y / 2;
        var node2CenterX = node2.Position.x + node2.Size.x / 2;
        var node2CenterY = node2.Position.y + node2.Size.y / 2;
        return (node1.Position.x + node1.Size.x < node2.Position.x ||
            node2.Position.x + node2.Size.x < node1.Position.x ||
            node1.Position.y + node1.Size.y < node2.Position.y ||
            node2.Position.y + node2.Size.y < node1.Position.y);
    }
}
