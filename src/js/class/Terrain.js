import {
    GetRandomColor
} from "../utils.js";

export class Terrain {
    /**
     * Le constructeur de la classe Terrain.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {number} terrainWidth - Nombre de lignes du terrain.
     * @param {number} terrainHeight - Nombre de colonnes du terrain.
     * @constructor
     */
    constructor(context, terrainWidth, terrainHeight) {
        this.context = context;
        this.terrainWidth = terrainWidth;
        this.terrainHeight = terrainHeight;
        this.terrain = new Array(this.terrainWidth);
        this.InitializeTerrain();
    }

    /**
     * Initialise la propriété terrain[].
     * - Crée autant d'Array[] que de lignes dans terrain[].
     * - Crée autant d'Array[] que de colonnes dans chacune des lignes[].
     */
    InitializeTerrain() {
        for (let i = 0; i < this.terrain.length; i++) {
            this.terrain[i] = new Array(this.terrainHeight);
            for (let j = 0; j < this.terrain[i].length; j++) {
                this.terrain[i][j] = 1;
            }
        }
    }

    /**
     * Dessine un terrain dans le canvas. Chaque cellule a une dimension de 20 pixels * 20 pixels.
     */
    DrawTerrain() {
        for (let i = 0; i < this.terrain.length; i++) {
            this.context.fillStyle = GetRandomColor;
            for (let j = 0; j < this.terrain[i].length; j++) {
                // this.context.fillStyle = GetRandomColor();
                this.context.fillStyle = "#FFFFFF";
                this.context.fillRect(i * 20, j * 20, 20, 20);
                this.context.strokeRect(i * 20, j * 20, 20, 20);
            }
        }
    }

    /**
     * Permet de récupérer les données d'une cellule.
     * @param coordinateX - La coordonnée X de la cellule dont les données doivent être récupérées.
     * @param coordinateY - La coordonnée Y de la cellule dont les données doivent être récupérées.
     * @returns {*} - Les données récupérées d'une cellule.
     */
    ReadTerrainCell(coordinateX, coordinateY) {
        return this.Terrain[coordinateX][coordinateY];
    }

    /**
     * Permet d'écrire les données d'une cellule.
     * @param coordinateX - La coordonnée X de la cellule dont les données doivent être écrites.
     * @param coordinateY - La coordonnée Y de la cellule dont les données doivent être écrites.
     * @param value - Les données à écrire dans la cellule.
     */
    WriteTerrainCell(coordinateX, coordinateY, value) {
        this.terrain[coordinateX][coordinateY] = value;
    }
}