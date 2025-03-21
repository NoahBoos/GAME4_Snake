import {
    CELL_SIZE
} from "../../global.js"

export class Segment {
    /**
     * Le constructeur de la classe Segment.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {number} coordinateX - Coordonnée X du segment.
     * @param {number} coordinateY - Coordonnée Y du segment.
     * @param {string} color - Couleur utilisée pour dessiner le segment.
     * @constructor
     */
    constructor(context, coordinateX, coordinateY, color = "#71B340") {
        this.context = context;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;
    }
    /**
     * Dessine un segment du serpent dans le canvas. Chaque segment a une dimension de 20 pixels * 20 pixels.
     */
    DrawSegment() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.coordinateX, this.coordinateY, CELL_SIZE, CELL_SIZE);
    }
    /**
     * Déplace un segment à des coordonnées passées en paramètre dans le canvas.
     * @param {number} coordinateX - Coordonnée X où mouvoir le segment.
     * @param {number} coordinateY - Coordonnée Y où mouvoir le segment.
     */
    MoveSegment(coordinateX, coordinateY) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.DrawSegment();
    }
}