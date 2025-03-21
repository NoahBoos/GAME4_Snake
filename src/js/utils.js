import {
    Strawberry
} from "./class/SweetFruit/Strawberry.js";
import {
    Banana
} from "./class/SweetFruit/Banana.js";
import {Lemon} from "./class/SourFruit/Lemon.js";
import {GreenLemon} from "./class/SourFruit/GreenLemon.js";

/**
 * Génère un entier pseudo-aléatoire.
 * @param max - Valeur maximale du chiffre à générer.
 * @returns {number}
 */
export function GetRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
/**
 * Génère un index pseudo-aléatoire d'une array.
 * @param arrayLength - Longueur maximale de l'array.
 * @returns {number}
 */
export function GetRandomIndexFromArray(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}
/**
 * Génère une couleur pseudo-aléatoire et la retourne sous la forme d'une chaîne de caractères.
 * @returns {string}
 */
export function GetRandomColor() {
    const red = GetRandomInt(255);
    const green = GetRandomInt(255);
    const blue = GetRandomInt(255);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
/**
 * Vérifie si un segment se trouve à des coordonnées données.
 * @param segments - Array de segments.
 * @param coordinateX - Coordonnée X à vérifier.
 * @param coordinateY - Coordonnée Y à vérifier.
 * @returns {boolean}
 */
export function IsThereSegmentAt(segments, coordinateX, coordinateY) {
    if (segments.find(segment => segment.coordinateX === coordinateX && segment.coordinateY === coordinateY)) {
        return true;
    } else {
        return false;
    }
}
/**
 * Génère des coordonnées pseudo-aléatoires.
 * @param terrainWidth - Nombre de lignes du terrain.
 * @param terrainHeight - Nombre de colonnes du terrain.
 * @returns {{coordinateX: number, coordinateY: number}}
 */
export function GetRandomCoordinates(terrainWidth, terrainHeight) {
    const coordinateX = Math.floor(Math.random() * (terrainWidth + 1));
    const coordinateY = Math.floor(Math.random() * (terrainHeight + 1));
    return {
        "coordinateX": coordinateX,
        "coordinateY": coordinateY
    };
}
/**
 * Génère des coordonnées pseudo-aléatoires à partir de contraintes.
 * @param terrainWidth - Nombre de lignes du terrain.
 * @param terrainHeight - Nombre de colonnes du terrain.
 * @returns {{coordinateX: number, coordinateY: number}}
 */
export function GetRandomCoordinatesWithConstraint(minX, maxX, minY, maxY) {
    const coordinateX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const coordinateY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    console.log(coordinateY);
    return {
        "coordinateX": coordinateX,
        "coordinateY": coordinateY
    };
}
/**
 * Crée une nouvelle nourriture sur le terrain.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain.
 * @returns {object}
 */
export function CreateRandomFood(context, terrain) {
    const FOODS = [Strawberry, Banana, Lemon, GreenLemon];
    let randomIndex = GetRandomIndexFromArray(FOODS.length);
    // console.log(randomIndex);
    const food = FOODS[randomIndex];
    // console.log(food);
    return new food(context, terrain);
}