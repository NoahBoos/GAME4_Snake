import {GetRandomCoordinates} from "../../utils.js";
import {CELL_SIZE} from "../../global.js";

export class SourFruit {
    /**
     * Le constructeur de la classe SourFruit.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @param {string} color - Couleur du fruit acide.
     * @param {number} experience - Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     * @param {number} segmentsToRemove - Nombre de segments à retirer du serpent.
     * @constructor
     */
    constructor(context, terrain, color, experience, segmentsToRemove) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.color = color;
        this.experience = experience;
        this.segmentsToRemove = segmentsToRemove;
    }
    /**
     * Dessine un fruit dans le canvas. Chaque fruit a une dimension de 20 pixels * 20 pixels.
     */
    DrawFruit() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.coordinateX, this.coordinateY, CELL_SIZE, CELL_SIZE);
    }
    /**
     * Écrit les données d'une cellule de nourriture en appelant WriteTerrainCell().
     * - isOccupied = true ;
     * - type = "sourFruit" ;
     * - object = this
     */
    WriteFruitCell() {
        this.terrain.WriteTerrainCell(this.coordinateX / CELL_SIZE, this.coordinateY / CELL_SIZE, true, "sourFruit", this);
    }
    /**
     * Définit les coordonnées d'un fruit de sorte qu'un fruit se trouve nécessairement sur une cellule libre du terrain.
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
            );
            terrainCellToCoordinates = TERRAIN.ReadTerrainCell(newCoordinates.coordinateX, newCoordinates.coordinateY);
        } while (terrainCellToCoordinates.isOccupied === true);

        this.coordinateX = newCoordinates.coordinateX * CELL_SIZE;
        this.coordinateY = newCoordinates.coordinateY * CELL_SIZE;
    }
}