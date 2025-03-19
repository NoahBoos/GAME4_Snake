import '../css/style.css'
import {
    Terrain
} from "./class/Terrain.js";
import {
    Snake
} from "./class/Snake/Snake.js";
import {
    GetRandomColor, GetRandomCoordinates
} from "./utils.js";
import {Strawberry} from "./class/Food/Strawberry.js";
import {CELL_SIZE} from "./global.js";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const terrain = new Terrain(context, 30, 30);
terrain.DrawTerrain();

// let RandomCoordinates = GetRandomCoordinates(terrain.terrainWidth, terrain.terrainHeight);
// console.log(terrain.ReadTerrainCell(RandomCoordinates.coordinateX, RandomCoordinates.coordinateY));

const snake = new Snake(document, context, terrain, 40, 100, GetRandomColor());
snake.segments[0].DrawSegment();

const strawberry = new Strawberry(context, terrain);
