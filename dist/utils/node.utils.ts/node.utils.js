"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeUtils = void 0;
const enums_1 = require("../enums");
const vector_2d_1 = require("../vector-2d");
class NodeUtils {
    static UpdateNodePosition(pos, direction, magnitude) {
        if (direction == enums_1.Directions.Up) {
            pos.y = pos.y - magnitude;
        }
        if (direction == enums_1.Directions.Down) {
            pos.y = pos.y + magnitude;
        }
        if (direction == enums_1.Directions.Left) {
            pos.x = pos.x - magnitude;
        }
        if (direction == enums_1.Directions.Right) {
            pos.x = pos.x + magnitude;
        }
    }
    static SetPrevNodePos(pos, direction, magnitude) {
        let result = new vector_2d_1.Vector2D(pos.x, pos.y);
        if (direction == enums_1.Directions.Up) {
            result.y = result.y + magnitude;
        }
        if (direction == enums_1.Directions.Down) {
            result.y = result.y - magnitude;
        }
        if (direction == enums_1.Directions.Left) {
            result.x = result.x + magnitude;
        }
        if (direction == enums_1.Directions.Right) {
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
exports.NodeUtils = NodeUtils;
