import {
    ObstacleCell
} from "./ObstacleCell.js";
import {CELL_SIZE} from "../../global.js";

export function GenerateUObstacle(context, terrain) {
    const originObstacle = new ObstacleCell(context, terrain);
    const originObstacleCoordinateX = originObstacle.coordinateX;
    const originObstacleCoordinateY = originObstacle.coordinateY;
    new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + CELL_SIZE);
    new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + CELL_SIZE, originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 3), originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + (CELL_SIZE * 1));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY);
}

export function GenerateReversedUObstacle(context, terrain) {
    const originObstacle = new ObstacleCell(context, terrain);
    const originObstacleCoordinateX = originObstacle.coordinateX;
    const originObstacleCoordinateY = originObstacle.coordinateY;
    new ObstacleCell(context, terrain, originObstacleCoordinateX + CELL_SIZE, originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + CELL_SIZE);
    new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 3), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + CELL_SIZE);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + (CELL_SIZE * 2));
}

export function GenerateTObstacle(context, terrain) {
    const originObstacle = new ObstacleCell(context, terrain);
    const originObstacleCoordinateX = originObstacle.coordinateX;
    const originObstacleCoordinateY = originObstacle.coordinateY;
    new ObstacleCell(context, terrain, originObstacleCoordinateX + CELL_SIZE, originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 3), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + CELL_SIZE);
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 2));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 3));
    new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 4));
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