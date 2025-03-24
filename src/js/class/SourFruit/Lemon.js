import {SourFruit} from "./SourFruit.js";

export class Lemon extends SourFruit {
    /**
     * @type {string} texture
     * Lien relatif vers le svg de la texture du fruit.
     */
    static texture = "./svg/Lemon.svg";
    /**
     * @type {number} experience
     * Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     */
    static experience = 40;
    /**
     * @type {number} segmentsToRemove
     * Nombre de segments à retirer du serpent.
     */
    static segmentsToRemove = 1;
    /**
     * Le constructeur de la classe Strawberry.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @constructor
     */
    constructor(context, terrain) {
        /**
         * Appel au constructeur de la classe dont Lemon hérite, c'est-à-dire "SourFruit".
         */
        super(
            context,
            terrain,
            Lemon.texture,
            Lemon.experience,
            Lemon.segmentsToRemove
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