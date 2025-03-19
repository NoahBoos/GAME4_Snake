import {
    Strawberry
} from "./class/Food/Strawberry.js";
import {
    Banana
} from "./class/Food/Banana.js";

/**
 *
 * @param max
 * @returns {number}
 */
export function GetRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 *
 * @param arrayLength
 * @returns {number}
 */
export function GetRandomIndexFromArray(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

/**
 *
 * @returns {string}
 */
export function GetRandomColor() {
    const red = GetRandomInt(255);
    const green = GetRandomInt(255);
    const blue = GetRandomInt(255);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

/**
 *
 * @param segments
 * @param coordinateX
 * @param coordinateY
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
 *
 * @param terrainWidth
 * @param terrainHeight
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
 *
 * @param context
 * @param terrain
 * @returns {Banana}
 */
export function CreateRandomFood(context, terrain) {
    const FOODS = [Strawberry, Banana];

    let randomIndex = GetRandomIndexFromArray(FOODS.length);
    console.log(randomIndex);
    const food = FOODS[randomIndex];

    return new food(context, terrain);
}