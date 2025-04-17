import {CELL_SIZE, obstaclesOrigin} from "../../global.js";
import {GetRandomInt} from "../../utils.js";
import {GenerateReversedUObstacle, GenerateTObstacle, GenerateUObstacle} from "./ObstaclePattern.js";
import {ObstacleCell} from "./ObstacleCell.js";
/**
 * Vérifie la plaçabilité d'un patron d'obstacle.
 * @param {Terrain} terrain - Une instance du terrain.
 * @param {ObstacleCell} originObstacleCell - Cellule origine de l'obstacle à placer.
 * @param {Array} pattern - Array contenant les coordonnées individuelles de chaque cellule de l'obstacle.
 * @returns {*}
 */
export function CanPlacePattern(terrain, originObstacleCell, pattern) {
    /**
     * @type {number} originObstacleCoordinateX
     * Coordonnée X de l'origine.
     * @type {number} originObstacleCoordinateY
     * Coordonnée Y de l'origine.
     */
    const originObstacleCoordinateX = originObstacleCell.coordinateX;
    const originObstacleCoordinateY = originObstacleCell.coordinateY;
    /**
     * @type {number} columns
     * Nombre de colonnes dans le terrain.
     * @type {number} rows
     * Nombre de lignes dans le terrain.
     */
    const columns = terrain.terrain.length;
    const rows = terrain.terrain[0].length;
    /**
     * @type {number} origineCellX
     * Coordonnée X "normalisée" de la cellule origine.
     * @type {number} origineCellY
     * Coordonnée Y "normalisée" de la cellule origine.
     */
    const origineCellX = originObstacleCoordinateX / CELL_SIZE;
    const origineCellY = originObstacleCoordinateY / CELL_SIZE;

    return pattern.every(([distanceX, distanceY]) => {
        const coordinateX = origineCellX + distanceX;
        const coordinateY = origineCellY + distanceY;
        return coordinateX >= 0 && coordinateX < columns && coordinateY >= 0 && coordinateY < rows;
    })
}
/**
 *
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain.
 * @param {ObstacleCell} originObstacleCell - Cellule origine de l'obstacle à placer.
 * @param {Array} pattern - Array contenant les coordonnées individuelles de chaque cellule de l'obstacle.
 */
export function GenerateObstacleFromPattern(context, terrain, originObstacleCell, pattern) {
    /**
     * @type {number} originObstacleCoordinateX
     * Coordonnée X de l'origine.
     * @type {number} originObstacleCoordinateY
     * Coordonnée Y de l'origine.
     */
    const originCoordinateX = originObstacleCell.coordinateX;
    const originCoordinateY = originObstacleCell.coordinateY;

    for (const [distanceX, distanceY] of pattern) {
        const coordinateX = originCoordinateX + distanceX * CELL_SIZE;
        const coordinateY = originCoordinateY + distanceY * CELL_SIZE;

        new ObstacleCell(context, terrain, coordinateX, coordinateY);
    }
}
/**
 * Permet de vérifier si une origine à générer possède une distance suffisante aux autres origines déjà générées.
 * @param {Array} newOrigin - Une array stockant les coordonnées de la nouvelle origine.
 * @param {number} minDistance - La distance minimale entre deux origines.
 * @returns {boolean}
 */
export function isFarEnough(newOrigin, minDistance = 120) {
    if (obstaclesOrigin.length === 0) {
        return true;
    } else {
        for (const origin of obstaclesOrigin) {
            /**
             @type {number} distanceX
              La distance sur l'axe des abscisses entre la nouvelle origine et l'origine sur laquelle on boucle.
             @type {number} distanceY
              La distance sur l'axe des ordonnées entre la nouvelle origine et l'origine sur laquelle on boucle.
             */
            const distanceX = newOrigin[0] - origin[0];
            const distanceY = newOrigin[1] - origin[1];
            if (distanceX < minDistance && distanceX > -minDistance || (distanceY < minDistance) && (distanceY > -minDistance)) {
                return false;
            }
        }
        return true;
    }
}
/**
 * Place des obstacles pseudo-aléatoirement sur le terrain en appelant isFarEnough() pour considérer les distances minimales entre les origines des obstacles à générer.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain
 */
export function PlaceObstacleRandomly(context, terrain) {
    /**
     @type {number} attempt
      Tentative de génération d'obstacle actuelle
     @type {number} maxAttempt
      Nombre maximal de tentatives de génération d'obstacle.
     */
    let attempt = 0;
    let maxAttempt = 150;

    for (let i = 0; i < obstaclesOrigin.length; i++) {
        obstaclesOrigin.splice(obstaclesOrigin.indexOf(obstaclesOrigin[i]), 1);
    }

    while (attempt < maxAttempt) {
        const originObstacle = new ObstacleCell(context, terrain, 0, 0, false, false);
        const originObstacleCoordinate = [originObstacle.coordinateX, originObstacle.coordinateY];
        if (isFarEnough(originObstacleCoordinate)) {
            obstaclesOrigin.push(originObstacleCoordinate);
            console.log(obstaclesOrigin);
            originObstacle.WriteAndDrawObstacleCell();
            ChooseObstacleTemplate(context, terrain, originObstacle);
        }
        attempt++;
    }
}
/**
 * Génère un modèle d'obstacle choisit pseudo-aléatoirement.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain
 * @param {ObstacleCell} originObstacle - Cellule origine de l'obstacle à générer
 */
export function ChooseObstacleTemplate(context, terrain, originObstacle) {
    let index = GetRandomInt(2);
    switch (index) {
        case 0:
            GenerateUObstacle(context, terrain, originObstacle);
            break;
        case 1:
            GenerateReversedUObstacle(context, terrain, originObstacle);
            break;
        case 2:
            GenerateTObstacle(context, terrain, originObstacle);
            break;
    }
}