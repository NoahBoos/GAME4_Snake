import {GetRandomCoordinates} from "../../utils.js";
import {CELL_SIZE} from "../../global.js";

export class SweetFruit {
    /**
     * Le constructeur de la classe SweetFruit.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @param {string} texture - Lien vers la texture SVG du fruit.
     * @param {number} experience - Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     * @param {number} segmentsToAdd - Nombre de segments à ajouter au serpent.
     * @constructor
     */
    constructor(context, terrain, texture, experience, segmentsToAdd) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.texture = texture;
        this.experience = experience;
        this.segmentsToAdd = segmentsToAdd;
    }
    /**
     * Dessine un fruit dans le canvas. Chaque fruit a une dimension de 20 pixels * 20 pixels.
     */
    DrawFruit() {
        let textureToDraw = new Image();
        textureToDraw.src = this.texture;
        textureToDraw.onload = () => {
            this.context.drawImage(textureToDraw, this.coordinateX - 5, this.coordinateY - 5, CELL_SIZE * 1.5, CELL_SIZE * 1.5);
        }
    }
    /**
     * Écrit les données d'une cellule de nourriture en appelant WriteTerrainCell().
     * - isOccupied = true ;
     * - type = "sweetFruit" ;
     * - object = this
     */
    WriteFruitCell() {
        this.terrain.WriteTerrainCell(this.coordinateX / CELL_SIZE, this.coordinateY / CELL_SIZE, true, "sweetFruit", this);
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