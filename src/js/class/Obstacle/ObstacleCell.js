import {CELL_SIZE} from "../../global.js";
import {GetRandomCoordinates, GetRandomCoordinatesWithConstraint} from "../../utils.js";

export class ObstacleCell {
    /**
     * Le constructeur de la classe ObstacleCell.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @param {number} coordinateX - Coordonnée X de la cellule.
     * @param {number} coordinateY - Coordonnée Y de la cellule.
     */
    constructor(context, terrain, coordinateX = 0, coordinateY = 0) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        /**
         * Définit les coordonnées de la cellule d'obstacle.
         * Écrit les données de la cellule où se trouve la cellule d'obstacle.
         * Dessine l'obstacle.
         */
        if (this.coordinateX === 0 && this.coordinateY === 0) {
            this.DefineCoordinates();
        }
        this.WriteObstacleCell();
        this.DrawObstacleCell();
    }
    /**
     * Définit les coordonnées de la cellule d'obstacle.
     * Écrit les données de la cellule où se trouve la cellule d'obstacle.
     * Dessine l'obstacle.
     */
    InitializeObstacleCell(){
        this.DefineCoordinates();
        this.WriteObstacleCell();
        this.DrawObstacleCell();
    }
    /**
     * Dessine un fruit dans le canvas. Chaque fruit a une dimension de 20 pixels * 20 pixels.
     */
    DrawObstacleCell() {
        this.context.fillStyle = "#734210";
        this.context.fillRect(this.coordinateX, this.coordinateY, CELL_SIZE, CELL_SIZE);
    }
    /**
     * Écrit les données d'une cellule d'obstacle en appelant WriteTerrainCell().
     * - isOccupied = true ;
     * - type = "obstacleCell" ;
     * - object = this
     */
    WriteObstacleCell() {
        this.terrain.WriteTerrainCell(this.coordinateX / CELL_SIZE, this.coordinateY / CELL_SIZE, true, "obstacleCell", this);
    }
    /**
     * Définit les coordonnées d'un obstacle de sorte qu'un obstacle se trouve nécessairement sur une cellule libre du terrain.
     */
    DefineCoordinates() {
        const TERRAIN = this.terrain;
        /**
         * @type {object} newCoordinates
         * Entrepose les nouvelles coordonnées du fruit sous la forme d'un objet.
         */
        let newCoordinates;
        /**
         * @type {object} terrainCellToCoordinates
         * Entrepose les données d'une cellule d'une certaine position sous la forme d'un objet.
         */
        let terrainCellToCoordinates;

        do {
            newCoordinates = GetRandomCoordinatesWithConstraint(
                3, TERRAIN.terrainWidth - 6,
                4, TERRAIN.terrainHeight - 8
            );
            terrainCellToCoordinates = TERRAIN.ReadTerrainCell(newCoordinates.coordinateX, newCoordinates.coordinateY);
        } while (terrainCellToCoordinates.isOccupied === true);

        this.coordinateX = newCoordinates.coordinateX * CELL_SIZE;
        this.coordinateY = newCoordinates.coordinateY * CELL_SIZE;
    }
}