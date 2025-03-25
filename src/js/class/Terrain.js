import {
    CELL_SIZE
} from "../global.js";
import {
    GetRandomColor
} from "../utils.js";
import {ObstacleCell} from "./Obstacle/ObstacleCell.js";

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
                this.WriteTerrainCell([i], [j], false, "ground");
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
                // Terrain neutre
                this.context.fillStyle = "#FFFFFF";
                // Terrain désertique
                this.context.fillStyle = "#fff89e";
                this.context.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                this.context.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
    /**
     * Permet de redessiner une cellule de terrain vide.
     * On y appelle WriteTerrainCell() pour vider cette même cellule de ses données.
     * @param coordinateX - Coordonnée X de la cellule à redessiner.
     * @param coordinateY - Coordonnée Y de la cellule à redessiner.
     */
    DrawTerrainCell(coordinateX, coordinateY) {
        // Terrain neutre
        this.context.fillStyle = "#FFFFFF";
        // Terrain désertique
        this.context.fillStyle = "#fff89e";
        this.context.fillRect(coordinateX, coordinateY, CELL_SIZE, CELL_SIZE);
        this.context.strokeRect(coordinateX, coordinateY, CELL_SIZE, CELL_SIZE);
        // À vérifier
        // this.WriteTerrainCell(coordinateX / CELL_SIZE, coordinateY / CELL_SIZE, false, "ground", null);
        // console.log(this.ReadTerrainCell(coordinateX / CELL_SIZE, coordinateY / CELL_SIZE));
    }
    /**
     * Récupère les données d'une cellule.
     * @param coordinateX - La coordonnée X de la cellule dont les données doivent être récupérées.
     * @param coordinateY - La coordonnée Y de la cellule dont les données doivent être récupérées.
     * @returns {*} - Les données récupérées d'une cellule.
     */
    ReadTerrainCell(coordinateX, coordinateY) {
        return this.terrain[coordinateX][coordinateY];
    }
    /**
     * Écrit les données d'une cellule.
     * @param coordinateX - La coordonnée X de la cellule dont les données doivent être écrites.
     * @param coordinateY - La coordonnée Y de la cellule dont les données doivent être écrites.
     * @param isOccupied
     * @param type
     * @param object
     */
    WriteTerrainCell(coordinateX, coordinateY, isOccupied, type, object) {
        this.terrain[coordinateX][coordinateY] = {
            "isOccupied": isOccupied,
            "type": type,
            "object": object
        };
    }
}