import {CELL_SIZE} from "../../global.js";
import {GetRandomCoordinates} from "../../utils.js";

export class ObstacleCell {
    constructor(context, terrain) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0
        this.coordinateY = 0;
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
     * - type = "obstacle" ;
     * - object = this
     */
    WriteObstacleCell() {
        this.terrain.WriteTerrainCell(this.coordinateX, this.coordinateY, true, "obstacle", this);
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
            newCoordinates = GetRandomCoordinates(
                TERRAIN.terrainWidth,
                TERRAIN.terrainHeight
            )
            terrainCellToCoordinates = TERRAIN.ReadTerrainCell(newCoordinates.coordinateX, newCoordinates.coordinateY);
        } while (terrainCellToCoordinates.isOccupied === true);

        this.coordinateX = newCoordinates.coordinateX * CELL_SIZE;
        this.coordinateY = newCoordinates.coordinateY * CELL_SIZE;
    }
}