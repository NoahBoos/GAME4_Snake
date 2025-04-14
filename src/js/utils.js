import {
    Strawberry
} from "./class/SweetFruit/Strawberry.js";
import {
    Banana
} from "./class/SweetFruit/Banana.js";
import {Lemon} from "./class/SourFruit/Lemon.js";
import {Lime} from "./class/SourFruit/Lime.js";
import {Grape} from "./class/SweetFruit/Grape.js";
import {Peach} from "./class/SweetFruit/Peach.js";
import {RedApple} from "./class/SweetFruit/RedApple.js";
import {Blueberry} from "./class/SourFruit/Blueberry.js";
import {GreenApple} from "./class/SourFruit/GreenApple.js";
import {Mango} from "./class/SweetFruit/Mango.js";
import {Melon} from "./class/SweetFruit/Melon.js";
import {Tangerine} from "./class/SourFruit/Tangerine.js";
import {obstaclesOrigin} from "./global.js";
import {ObstacleCell} from "./class/Obstacle/ObstacleCell.js";
import {GenerateReversedUObstacle, GenerateTObstacle, GenerateUObstacle} from "./class/Obstacle/ObstacleTemplate.js";

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
 * @param minX - Coordonnée X minimum.
 * @param maxX - Coordonnée X maximum.
 * @param minY - Coordonnée Y minimum.
 * @param maxY - Coordonnée Y maximum.
 * @returns {{coordinateX: number, coordinateY: number}}
 */
export function GetRandomCoordinatesWithConstraint(minX, maxX, minY, maxY) {
    const coordinateX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const coordinateY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    return {
        "coordinateX": coordinateX,
        "coordinateY": coordinateY
    };
}
/**
 * Crée une nouvelle nourriture sur le terrain.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {PlayerAccount} player - Une instance du joueur.
 * @param {Terrain} terrain - Une instance du terrain.
 * @returns {object}
 */
export function CreateRandomFood(context, player, terrain) {
    // const FOODS = [
    //     Strawberry, Grape, Peach, Mango, Melon, Banana, RedApple,
    //     Lemon, Blueberry, Tangerine, Lime, GreenApple
    // ];
    let randomIndex = GetRandomIndexFromArray(player.availableFruits.length);
    const food = player.availableFruits[randomIndex];
    return new food(context, terrain);
}
/**
 * Permet de vérifier si une origine à générer possède une distance suffisante aux autres origines déjà générées.
 * @param {Array} newOrigin - Une array stockant les coordonnées de la nouvelle origine.
 * @param {number} minDistance - La distance minimale entre deux origines.
 * @returns {boolean}
 */
export function isFarEnough(newOrigin, minDistance = 120) {
    if (obstaclesOrigin.length === 0) {
        return true;
    } else {
        for (const origin of obstaclesOrigin) {
            /**
             @type {number} distanceX
              La distance sur l'axe des abscisses entre la nouvelle origine et l'origine sur laquelle on boucle.
             @type {number} distanceY
              La distance sur l'axe des ordonnées entre la nouvelle origine et l'origine sur laquelle on boucle.
             */
            const distanceX = newOrigin[0] - origin[0];
            const distanceY = newOrigin[1] - origin[1];
            if (distanceX < minDistance && distanceX > -minDistance || (distanceY < minDistance) && (distanceY > -minDistance)) {
                return false;
            }
        }
        return true;
    }
}
/**
 * Place des obstacles pseudo-aléatoirement sur le terrain en appelant isFarEnough() pour considérer les distances minimales entre les origines des obstacles à générer.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain
 */
export function PlaceObstacleRandomly(context, terrain) {
    /**
     @type {number} attempt
      Tentative de génération d'obstacle actuelle
     @type {number} maxAttempt
      Nombre maximal de tentatives de génération d'obstacle.
     */
    let attempt = 0;
    let maxAttempt = 100;

    while (attempt < maxAttempt) {
        const originObstacle = new ObstacleCell(context, terrain, 0, 0, false, false);
        const originObstacleCoordinate = [originObstacle.coordinateX, originObstacle.coordinateY];
        if (isFarEnough(originObstacleCoordinate)) {
            obstaclesOrigin.push(originObstacleCoordinate);
            originObstacle.WriteAndDrawObstacleCell();
            ChooseObstacleTemplate(context, terrain, originObstacle);
        }
        attempt++;
    }
}
/**
 * Génère un modèle d'obstacle choisit pseudo-aléatoirement.
 * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
 * @param {Terrain} terrain - Une instance du terrain
 * @param {ObstacleCell} originObstacle - Cellule origine de l'obstacle à générer
 */
export function ChooseObstacleTemplate(context, terrain, originObstacle) {
    let index = GetRandomInt(2);
    switch (index) {
        case 0:
            GenerateUObstacle(context, terrain, originObstacle);
            break;
        case 1:
            GenerateReversedUObstacle(context, terrain, originObstacle);
            break;
        case 2:
            GenerateTObstacle(context, terrain, originObstacle);
            break;
    }
}