import {
    ObstacleCell
} from "./ObstacleCell.js";
import {CELL_SIZE} from "../../global.js";
import {CanPlacePattern, GenerateObstacleFromPattern} from "./ObstacleUtils.js";

const U_OBSTACLE_PATTERN = [
    [0, 1], [0, 2], [1, 2], [2, 2],
    [3, 2], [4, 2], [4, 1], [4, 0],
];

const REVERSED_U_OBSTACLE_PATTERN = [
    [1, 0], [0, 1], [0, 2], [2, 0],
    [3, 0], [4, 0], [4, 1], [4, 2],
];

const T_OBSTACLE_PATTERN = [
    [1, 0], [2, 0], [3, 0], [4, 0],
    [2, 1], [2, 2], [2, 3], [2, 4],
];

export function GenerateUObstacle(context, terrain, originObstacle) {
    if (CanPlacePattern(terrain, originObstacle, U_OBSTACLE_PATTERN)) {
        GenerateObstacleFromPattern(context, terrain, originObstacle, U_OBSTACLE_PATTERN);
    } else {
        console.log(originObstacle);
        terrain.DrawTerrainCell(originObstacle.coordinateX, originObstacle.coordinateY);
    }
}

export function GenerateReversedUObstacle(context, terrain, originObstacle) {
    if (CanPlacePattern(terrain, originObstacle, REVERSED_U_OBSTACLE_PATTERN)) {
        GenerateObstacleFromPattern(context, terrain, originObstacle, REVERSED_U_OBSTACLE_PATTERN);
    } else {
        console.log(originObstacle);
        terrain.DrawTerrainCell(originObstacle.coordinateX, originObstacle.coordinateY);
    }
}

export function GenerateTObstacle(context, terrain, originObstacle) {
    if (CanPlacePattern(terrain, originObstacle, T_OBSTACLE_PATTERN)) {
        GenerateObstacleFromPattern(context, terrain, originObstacle, T_OBSTACLE_PATTERN);
    } else {
        console.log(originObstacle);
        terrain.DrawTerrainCell(originObstacle.coordinateX, originObstacle.coordinateY);
    }
}

export function GenerateObstacleBorder(context, terrain) {
    for (let i = 0; i < terrain.terrain.length; i++) {
        for (let j = 0; j < terrain.terrain[i].length; j++) {
            if (i === 0 || i === terrain.terrain[i].length - 1) {
                new ObstacleCell(context, terrain, i * CELL_SIZE, j * CELL_SIZE, true);
            } else if (i !== 0 && (j === 0 || j === terrain.terrain[i].length - 1)) {
                new ObstacleCell(context, terrain, i * CELL_SIZE, j * CELL_SIZE);
            }
        }
    }
}