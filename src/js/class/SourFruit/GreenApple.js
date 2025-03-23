import {SourFruit} from "./SourFruit.js";

export class GreenApple extends SourFruit {
    /**
     * @type {string} texture
     * Lien relatif vers le svg de la texture du fruit.
     */
    static texture = "./svg/GreenApple.svg";
    /**
     * @type {number} experience
     * Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     */
    static experience = 100;
    /**
     * @type {number} segmentsToRemove
     * Nombre de segments à retirer du serpent.
     */
    static segmentsToRemove = 7;
    /**
     * Le constructeur de la classe GreenApple.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @constructor
     */
    constructor(context, terrain) {
        super(
            context,
            terrain,
            GreenApple.texture,
            GreenApple.experience,
            GreenApple.segmentsToRemove
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