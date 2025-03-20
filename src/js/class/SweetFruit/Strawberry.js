import {
    SweetFruit
} from "./SweetFruit.js";

export class Strawberry extends SweetFruit {
    /**
     * @type {string} color
     * Couleur du fruit
     */
    static color = "#FF0000";
    /**
     * @type {number} experience
     * Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     */
    static experience = 5;
    /**
     * @type {number} segmentsToAdd
     * Nombre de segments à ajouter au serpent.
     */
    static segmentsToAdd = 1;
    /**
     * Le constructeur de la classe Strawberry.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @constructor
     */
    constructor(context, terrain) {
        /**
         * Appel au constructeur de la classe dont Strawberry hérite, c'est-à-dire "SweetFruit".
         */
        super(
            context,
            terrain,
            Strawberry.color,
            Strawberry.experience,
            Strawberry.segmentsToAdd
        );
        /**
         * Définit les coordonnées de l'aliment.
         * Écrit les données de la cellule où se trouve l'aliment.
         * Dessine l'aliment.
         */
        this.DefineCoordinates();
        this.WriteFruitCell();
        this.DrawFruit();
    }
}