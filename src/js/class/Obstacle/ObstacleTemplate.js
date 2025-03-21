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