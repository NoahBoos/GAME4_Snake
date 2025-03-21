import {
    ObstacleCell
} from "./ObstacleCell.js";
import {CELL_SIZE} from "../../global.js";

export function GenerateUObstacle(context, terrain) {
    const originObstacle = new ObstacleCell(context, terrain);
    const originObstacleCoordinateX = originObstacle.coordinateX;
    const originObstacleCoordinateY = originObstacle.coordinateY;
    const obstacle1 = new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + CELL_SIZE);
    const obstacle2 = new ObstacleCell(context, terrain, originObstacleCoordinateX, originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle3 = new ObstacleCell(context, terrain, originObstacleCoordinateX + CELL_SIZE, originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle4 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle5 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 3), originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle6 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle7 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY + (CELL_SIZE * 1));
    const obstacle8 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY);
}

export function GenerateTObstacle(context, terrain) {
    const originObstacle = new ObstacleCell(context, terrain);
    const originObstacleCoordinateX = originObstacle.coordinateX;
    const originObstacleCoordinateY = originObstacle.coordinateY;
    const obstacle1 = new ObstacleCell(context, terrain, originObstacleCoordinateX + CELL_SIZE, originObstacleCoordinateY);
    const obstacle2 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY);
    const obstacle3 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 3), originObstacleCoordinateY);
    const obstacle4 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 4), originObstacleCoordinateY);
    const obstacle5 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + CELL_SIZE);
    const obstacle6 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 2));
    const obstacle7 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 3));
    const obstacle8 = new ObstacleCell(context, terrain, originObstacleCoordinateX + (CELL_SIZE * 2), originObstacleCoordinateY + (CELL_SIZE * 4));
}