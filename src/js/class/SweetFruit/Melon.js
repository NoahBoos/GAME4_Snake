import {SweetFruit} from "./SweetFruit.js";

export class Melon extends SweetFruit {
    /**
     * @type {string} texture
     * Lien relatif vers le svg de la texture du fruit.
     */
    static texture = './svg/Melon.svg';
    /**
     * @type {number} experience
     * Somme des points d'expériences que le joueur doit gagner s'il mange le fruit.
     */
    static experience = 125;
    /**
     * @type {number} segmentsToAdd
     * Nombre de segments à ajouter au serpent.
     */
    static segmentsToAdd = 5;
    /**
     * Le constructeur de la classe Melon.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @constructor
     */
    constructor(context, terrain) {
        super(
            context,
            terrain,
            Melon.texture,
            Melon.experience,
            Melon.segmentsToAdd
        )
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