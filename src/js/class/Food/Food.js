import {GetRandomCoordinates} from "../../utils.js";
import {CELL_SIZE} from "../../global.js";

export class Food {
    /**
     * Le constructeur de la classe Food.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @param {string} color - Couleur de la tête du serpent.
     * @param {number} experience - Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     * @param {number} segmentsToAdd - Nombre de segments à ajouter au serpent.
     * @constructor
     */
    constructor(context, terrain, color, experience, segmentsToAdd) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.color = color;
        this.experience = experience;
        this.segmentsToAdd = segmentsToAdd;
    }
    /**
     * Dessine un fruit dans le canvas. Chaque fruit a une dimension de 20 pixels * 20 pixels.
     */
    DrawFood() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.coordinateX, this.coordinateY, CELL_SIZE, CELL_SIZE);
    }

    /**
     * Écrit les données d'une cellule de nourriture en appelant WriteTerrainCell().
     * - isOccupied = true ;
     * - type = "food" ;
     * - object = this
     */
    WriteFoodCell() {
        this.terrain.WriteTerrainCell(this.coordinateX / CELL_SIZE, this.coordinateY / CELL_SIZE, true, "food", this);
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